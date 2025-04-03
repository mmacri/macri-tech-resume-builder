
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { Trash2, Edit, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  const handleDeletePost = async (postId: string) => {
    setIsLoading(true);
    setError(null);
    
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
      setError(`Failed to delete post: ${error.message}`);
      toast.error(`Failed to delete post: ${error.message}`);
    } finally {
      setIsLoading(false);
      setPostToDelete(null);
      setIsAlertOpen(false);
    }
  };

  const openDeleteConfirmation = (postId: string) => {
    setPostToDelete(postId);
    setIsAlertOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
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
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No blog posts found
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
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
                      disabled={isLoading}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => openDeleteConfirmation(post.id)}
                      className="flex items-center"
                      disabled={isLoading}
                    >
                      {isLoading && postToDelete === post.id ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="mr-1 h-3 w-3" />
                      )}
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the post and all associated comments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => postToDelete && handleDeletePost(postToDelete)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default BlogPostManagement;
