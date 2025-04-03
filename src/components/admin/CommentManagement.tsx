
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { Trash2 } from 'lucide-react';

// Define types for our data
type BlogComment = Database['public']['Tables']['blog_comments']['Row'];
type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface CommentManagementProps {
  comments: BlogComment[];
  users: UserProfile[];
  fetchComments: () => Promise<void>;
}

const CommentManagement: React.FC<CommentManagementProps> = ({ comments, users, fetchComments }) => {
  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);
      
      if (error) throw error;
      toast.success('Comment deleted successfully');
      fetchComments();
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast.error(`Failed to delete comment: ${error.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="max-w-[200px] truncate">{comment.content}</TableCell>
                <TableCell>
                  {/* @ts-ignore - blog_posts is included via the join but TS doesn't know */}
                  {comment.blog_posts?.title || comment.post_id}
                </TableCell>
                <TableCell>{getUserById(comment.user_id || '')?.username || comment.name || 'Anonymous'}</TableCell>
                <TableCell>{new Date(comment.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteComment(comment.id)}
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

export default CommentManagement;
