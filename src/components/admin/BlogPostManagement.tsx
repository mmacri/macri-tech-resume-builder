
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define types for our data
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface BlogPostManagementProps {
  posts: BlogPost[];
  users: UserProfile[];
  fetchPosts: () => Promise<void>;
}

const BlogPostManagement: React.FC<BlogPostManagementProps> = ({ posts, users, fetchPosts }) => {
  const navigate = useNavigate();

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      // First delete all comments associated with this post
      const { error: commentsError } = await supabase
        .from('blog_comments')
        .delete()
        .eq('post_id', postId);
      
      if (commentsError) throw commentsError;
      
      // Then delete the post
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      toast.success('Post and associated comments deleted successfully');
      fetchPosts();
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast.error(`Failed to delete post: ${error.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{getUserById(post.user_id)?.username || post.user_id}</TableCell>
                <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(`/blog/edit/${post.id}`)}
                    className="flex items-center"
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeletePost(post.id)}
                    className="flex items-center"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BlogPostManagement;
