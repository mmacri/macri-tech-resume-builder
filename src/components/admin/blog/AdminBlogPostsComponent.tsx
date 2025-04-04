
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BlogPostsTable } from './BlogPostsTable';
import { BlogPostDialog } from './BlogPostDialog';
import { useBlogPostsAdmin } from '@/hooks/useBlogPostsAdmin';
import { BlogPost } from '@/types/blogPost';

const AdminBlogPostsComponent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const { posts, isLoading, createOrUpdatePost, deletePost, isPending } = useBlogPostsAdmin();

  const handleNewPost = () => {
    setCurrentPost({ title: '', content: '' });
    setIsDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  const handleSubmit = (post: Partial<BlogPost>) => {
    createOrUpdatePost(post, {
      onSuccess: () => {
        toast.success(post.id ? 'Post updated successfully' : 'Post created successfully');
        setIsDialogOpen(false);
        setCurrentPost(null);
      },
      onError: (error: Error) => {
        toast.error(`Error: ${error.message}`);
      }
    });
  };

  const handleDeletePost = (id: string) => {
    deletePost(id, {
      onSuccess: () => {
        toast.success('Post deleted successfully');
      },
      onError: (error: Error) => {
        toast.error(`Error: ${error.message}`);
      }
    });
  };

  if (isLoading) return <div>Loading blog posts...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <Button onClick={handleNewPost} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <BlogPostsTable 
        posts={posts} 
        onEdit={handleEditPost} 
        onDelete={handleDeletePost} 
      />

      <BlogPostDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        currentPost={currentPost} 
        setCurrentPost={setCurrentPost} 
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
};

export default AdminBlogPostsComponent;
