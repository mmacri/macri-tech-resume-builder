
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Search, Edit, Trash2, Save, X, PlusCircle, MessageCircle } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import BlogComment from '@/components/BlogComment';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  user_id: string;
}

interface BlogComment {
  id: string;
  post_id: string;
  user_id: string | null;
  name: string | null;
  content: string;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [activePostForComments, setActivePostForComments] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, BlogComment[]>>({});
  const [showCommentsFor, setShowCommentsFor] = useState<Record<string, boolean>>({});
  
  const { user, isAdmin } = useAuth();

  // Load posts from Supabase on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setPosts(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Error loading posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchComments = async (postId: string) => {
    if (comments[postId]) {
      // Comments already loaded, just toggle visibility
      setShowCommentsFor(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      setComments(prev => ({
        ...prev,
        [postId]: data || []
      }));
      
      setShowCommentsFor(prev => ({
        ...prev,
        [postId]: true
      }));
    } catch (error: any) {
      toast.error(error.message || 'Error loading comments');
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to create a post');
      return;
    }

    if (!isAdmin) {
      toast.error('Only administrators can create posts');
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: title,
            content: content,
            user_id: user.id
          }
        ])
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      // Add new post to state
      setPosts(prev => [data, ...prev]);
      
      // Reset form
      setTitle('');
      setContent('');
      
      toast.success('Blog post published successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error creating post');
      console.error('Error creating post:', error);
    }
  };

  const startEditing = (post: BlogPost) => {
    if (!isAdmin) {
      toast.error('Only administrators can edit posts');
      return;
    }
    
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const saveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          title: editTitle,
          content: editContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingPostId)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      // Update post in state
      setPosts(posts.map(post => 
        post.id === editingPostId ? data : post
      ));
      
      // Reset edit state
      setEditingPostId(null);
      setEditTitle('');
      setEditContent('');
      
      toast.success('Blog post updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error updating post');
      console.error('Error updating post:', error);
    }
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle('');
    setEditContent('');
  };

  const confirmDelete = (postId: string) => {
    if (!isAdmin) {
      toast.error('Only administrators can delete posts');
      return;
    }
    
    setPostToDelete(postId);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (postToDelete === null) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postToDelete);
        
      if (error) {
        throw error;
      }
      
      // Remove post from state
      setPosts(posts.filter(post => post.id !== postToDelete));
      
      // Clean up
      setShowDeleteDialog(false);
      setPostToDelete(null);
      
      toast.success('Blog post deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error deleting post');
      console.error('Error deleting post:', error);
    }
  };

  const submitComment = async (postId: string) => {
    if (!commentContent.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    try {
      const commentData: any = {
        post_id: postId,
        content: commentContent,
      };
      
      // If user is logged in, use their ID
      if (user) {
        commentData.user_id = user.id;
        commentData.name = user.email; // Or get from profile if available
      } else if (commentName.trim()) {
        // If not logged in but name provided
        commentData.name = commentName;
      } else {
        // Default anonymous
        commentData.name = 'Anonymous';
      }
      
      const { data, error } = await supabase
        .from('blog_comments')
        .insert([commentData])
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      // Add new comment to state
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data]
      }));
      
      // Reset form
      setCommentContent('');
      if (!user) setCommentName('');
      
      toast.success('Comment added successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error posting comment');
      console.error('Error posting comment:', error);
    }
  };

  const handleCommentDeleted = async (postId: string) => {
    // Refetch comments for this post
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      setComments(prev => ({
        ...prev,
        [postId]: data || []
      }));
    } catch (error: any) {
      console.error('Error refreshing comments:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-12 md:px-12">
      <h1 className="text-4xl font-bold mb-10" id="recent-posts">Blog</h1>
      
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <div className="relative mt-4 md:mt-0 w-full md:w-64">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {loadingPosts ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-gray-500">{searchTerm ? "No matching posts found." : "No blog posts yet."}</p>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body">
                  {editingPostId === post.id ? (
                    <div className="space-y-4">
                      <Input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-lg font-bold"
                        placeholder="Post title"
                      />
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full min-h-[200px]"
                        placeholder="Post content"
                      />
                      <div className="flex space-x-2 justify-end">
                        <Button variant="outline" onClick={cancelEdit}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button onClick={saveEdit}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="card-title text-xl font-bold">{post.title}</h3>
                      <p className="card-subtitle text-sm text-gray-500 mb-3">
                        {formatDate(post.created_at)}
                        {post.updated_at && post.created_at !== post.updated_at && 
                          <span> (edited: {formatDate(post.updated_at)})</span>
                        }
                      </p>
                      <p className="whitespace-pre-line">{post.content}</p>
                      
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => fetchComments(post.id)}
                          className="text-blue-500 border-blue-500 hover:bg-blue-50"
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          {comments[post.id]?.length || 0} Comments
                        </Button>
                        
                        {isAdmin && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => startEditing(post)}
                              className="text-blue-500 border-blue-500 hover:bg-blue-50"
                            >
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => confirmDelete(post.id)}
                              className="text-red-500 border-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                      
                      {/* Comments section */}
                      {showCommentsFor[post.id] && (
                        <div className="mt-6 border-t pt-4">
                          <h4 className="font-bold mb-4">Comments</h4>
                          
                          {/* Comments list */}
                          {comments[post.id]?.length > 0 ? (
                            <div className="mb-4">
                              {comments[post.id].map(comment => (
                                <BlogComment 
                                  key={comment.id} 
                                  comment={comment} 
                                  onCommentDeleted={() => handleCommentDeleted(post.id)}
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 mb-4">No comments yet.</p>
                          )}
                          
                          {/* Add comment form */}
                          <div className="border rounded-lg p-4">
                            <h5 className="font-semibold mb-3">Add a Comment</h5>
                            {!user && (
                              <div className="mb-3">
                                <Input
                                  type="text"
                                  placeholder="Your Name (optional)"
                                  value={commentName}
                                  onChange={(e) => setCommentName(e.target.value)}
                                  className="mb-3"
                                />
                              </div>
                            )}
                            <Textarea
                              placeholder="Write your comment here..."
                              value={commentContent}
                              onChange={(e) => setCommentContent(e.target.value)}
                              className="mb-3"
                            />
                            <Button 
                              onClick={() => submitComment(post.id)}
                              className="w-full md:w-auto"
                            >
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isAdmin && (
        <div className="mt-12" id="create-post">
          <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>
          <div className="space-y-4 p-6 border rounded-lg shadow-sm">
            <div>
              <label htmlFor="blog-title" className="block text-sm font-medium mb-1">Title</label>
              <Input 
                type="text" 
                id="blog-title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="blog-content" className="block text-sm font-medium mb-1">Content</label>
              <Textarea 
                id="blog-content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
                placeholder="Post content" 
                required 
              />
            </div>
            
            <Button 
              type="button" 
              onClick={handleSubmit}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Post Blog
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
