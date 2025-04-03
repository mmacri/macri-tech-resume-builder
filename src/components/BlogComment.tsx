
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface BlogComment {
  id: string;
  content: string;
  name: string | null;
  created_at: string;
  user_id: string | null;
  updated_at: string;
  approved: boolean | null;
}

interface BlogCommentProps {
  comment: BlogComment;
  onCommentDeleted: () => void;
  onCommentApproved?: () => void;
}

const BlogComment = ({ comment, onCommentDeleted, onCommentApproved }: BlogCommentProps) => {
  const { isAdmin } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = async () => {
    if (!isAdmin) return;
    
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', comment.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Comment deleted successfully');
      onCommentDeleted();
    } catch (error: any) {
      toast.error(error.message || 'Error deleting comment');
      console.error('Error deleting comment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleApprove = async () => {
    if (!isAdmin) return;
    
    try {
      setIsApproving(true);
      const { error } = await supabase
        .from('blog_comments')
        .update({ approved: true })
        .eq('id', comment.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Comment approved');
      if (onCommentApproved) onCommentApproved();
    } catch (error: any) {
      toast.error(error.message || 'Error approving comment');
      console.error('Error approving comment:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!isAdmin) return;
    
    try {
      setIsRejecting(true);
      const { error } = await supabase
        .from('blog_comments')
        .update({ approved: false })
        .eq('id', comment.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Comment rejected');
      if (onCommentApproved) onCommentApproved();
    } catch (error: any) {
      toast.error(error.message || 'Error rejecting comment');
      console.error('Error rejecting comment:', error);
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className={`p-4 border rounded-lg mb-3 ${
      comment.approved === null 
        ? 'bg-yellow-50 border-yellow-200' 
        : comment.approved 
          ? 'bg-white border-gray-200' 
          : 'bg-gray-50 border-gray-200 opacity-60'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{comment.name || 'Anonymous'}</p>
          <p className="text-xs text-gray-500">{formatDate(comment.created_at)}</p>
        </div>
        
        {isAdmin && (
          <div className="flex space-x-1">
            {comment.approved === null && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="text-green-500 border-green-500 hover:bg-green-50 p-1 h-7 w-7"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReject}
                  disabled={isRejecting}
                  className="text-red-500 border-red-500 hover:bg-red-50 p-1 h-7 w-7"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 border-red-500 hover:bg-red-50 p-1 h-7 w-7"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <p className="whitespace-pre-line">{comment.content}</p>
      </div>
      
      {comment.approved === null && isAdmin && (
        <div className="mt-2 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
          Pending approval
        </div>
      )}
      
      {comment.approved === false && isAdmin && (
        <div className="mt-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
          Rejected
        </div>
      )}
    </div>
  );
};

export default BlogComment;
