
import React from 'react';
import { BlogPost } from '@/types/blogPost';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface BlogPostDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentPost: Partial<BlogPost> | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<Partial<BlogPost> | null>>;
  onSubmit: (post: Partial<BlogPost>) => void;
  isPending: boolean;
}

export const BlogPostDialog: React.FC<BlogPostDialogProps> = ({
  isOpen,
  onOpenChange,
  currentPost,
  setCurrentPost,
  onSubmit,
  isPending
}) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPost && currentPost.title && currentPost.content) {
      onSubmit(currentPost);
    } else {
      toast.error('Title and content are required');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentPost?.id ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={currentPost?.title || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                placeholder="Post title"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="content">Content</label>
              <Textarea
                id="content"
                value={currentPost?.content || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                placeholder="Post content"
                required
                rows={10}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
