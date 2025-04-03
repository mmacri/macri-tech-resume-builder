
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { Trash2, Loader2 } from 'lucide-react';
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
type BlogComment = Database['public']['Tables']['blog_comments']['Row'];
type UserProfile = Database['public']['Tables']['profiles']['Row'];

interface CommentManagementProps {
  comments: BlogComment[];
  users: UserProfile[];
  fetchComments: () => Promise<void>;
}

const CommentManagement: React.FC<CommentManagementProps> = ({ comments, users, fetchComments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  const handleDeleteComment = async (commentId: string) => {
    setIsLoading(true);
    setError(null);
    
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
      setError(`Failed to delete comment: ${error.message}`);
      toast.error(`Failed to delete comment: ${error.message}`);
    } finally {
      setIsLoading(false);
      setCommentToDelete(null);
      setIsAlertOpen(false);
    }
  };

  const openDeleteConfirmation = (commentId: string) => {
    setCommentToDelete(commentId);
    setIsAlertOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
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
              <TableHead>Content</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No comments found
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
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
                      onClick={() => openDeleteConfirmation(comment.id)}
                      className="flex items-center"
                      disabled={isLoading}
                    >
                      {isLoading && commentToDelete === comment.id ? (
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
                This action cannot be undone. This will permanently delete the comment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => commentToDelete && handleDeleteComment(commentToDelete)}
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

export default CommentManagement;
