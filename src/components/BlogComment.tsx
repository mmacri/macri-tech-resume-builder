
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { Edit, Trash2, Save, X } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BlogCommentProps {
  comment: {
    id: string;
    content: string;
    created_at: string;
    user_id: string | null;
    name: string | null;
  };
  onCommentDeleted: () => void;
}

const BlogComment: React.FC<BlogCommentProps> = ({ comment, onCommentDeleted }) => {
  const { user, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  
  const canEditOrDelete = user?.id === comment.user_id || isAdmin;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ content: editContent })
        .eq('id', comment.id);
        
      if (error) throw error;
      
      toast.success('Comment updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Error updating comment');
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', comment.id);
        
      if (error) throw error;
      
      toast.success('Comment deleted successfully');
      onCommentDeleted();
    } catch (error: any) {
      toast.error(error.message || 'Error deleting comment');
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold">{comment.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
        </div>
        {canEditOrDelete && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(false)}
                >
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveEdit}
                >
                  <Save className="mr-1 h-4 w-4" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      
      {isEditing ? (
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full p-2"
        />
      ) : (
        <p className="text-gray-700">{comment.content}</p>
      )}
    </div>
  );
};

export default BlogComment;
