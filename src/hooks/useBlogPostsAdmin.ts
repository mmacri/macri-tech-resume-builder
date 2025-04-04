
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BlogPost } from '@/types/blogPost';

export const useBlogPostsAdmin = () => {
  const queryClient = useQueryClient();

  // Fetch blog posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['adminBlogPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  // Create or update blog post
  const mutation = useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      if (post.id) {
        // Update
        const { data, error } = await supabase
          .from('blog_posts')
          .update({
            title: post.title,
            content: post.content,
            updated_at: new Date().toISOString()
          })
          .eq('id', post.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create
        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: post.title || '',
            content: post.content || '',
            user_id: (await supabase.auth.getUser()).data.user?.id || ''
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
    }
  });

  // Delete blog post
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
    }
  });

  return {
    posts,
    isLoading,
    createOrUpdatePost: mutation.mutate,
    deletePost: deleteMutation.mutate,
    isPending: mutation.isPending || deleteMutation.isPending
  };
};
