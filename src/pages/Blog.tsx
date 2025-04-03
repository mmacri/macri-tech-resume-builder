import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Search, Edit, Trash2, Save, X, PlusCircle, MessageCircle, Clock } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import BlogComment, { BlogComment as BlogCommentType } from '@/components/BlogComment';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  user_id: string;
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
  const [comments, setComments] = useState<Record<string, BlogCommentType[]>>({});
  const [showCommentsFor, setShowCommentsFor] = useState<Record<string, boolean>>({});
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [pendingCommentsCount, setPendingCommentsCount] = useState<number>(0);

  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchPosts();
    if (isAdmin) {
      fetchPendingCommentsCount();
    }
  }, [isAdmin]);

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

  const fetchPendingCommentsCount = async () => {
    try {
      const { count, error } = await supabase
        .from('blog_comments')
        .select('*', { count: 'exact', head: true })
        .is('approved', null);
        
      if (error) {
        throw error;
      }
      
      setPendingCommentsCount(count || 0);
    } catch (error: any) {
      console.error('Error fetching pending comments count:', error);
    }
  };

  const fetchComments = async (postId: string) => {
    if (comments[postId]) {
      setShowCommentsFor(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
      return;
    }
    
    try {
      let query = supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (!isAdmin) {
        query = query.eq('approved', true);
      }
        
      const { data, error } = await query;
        
      if (error) {
        throw error;
      }
      
      const transformedData = data?.map(comment => {
        const typedComment: BlogCommentType = {
          id: comment.id,
          content: comment.content,
          name: comment.name,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          user_id: comment.user_id,
          post_id: comment.post_id,
          approved: comment.approved
        };
        return typedComment;
      });
      
      setComments(prev => ({
        ...prev,
        [postId]: transformedData || []
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
      
      setPosts(prev => [data, ...prev]);
      
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
      
      setPosts(posts.map(post => 
        post.id === editingPostId ? data : post
      ));
      
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
      
      setPosts(posts.filter(post => post.id !== postToDelete));
      
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
        approved: null // Pending approval by default
      };
      
      if (user) {
        commentData.user_id = user.id;
        commentData.name = user.email;
        
        if (isAdmin) {
          commentData.approved = true;
        }
      } else if (commentName.trim()) {
        commentData.name = commentName;
      } else {
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
      
      const typedComment: BlogCommentType = {
        id: data.id,
        content: data.content,
        name: data.name,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user_id: data.user_id,
        post_id: data.post_id,
        approved: data.approved
      };
      
      if (isAdmin || typedComment.approved === true) {
        setComments(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), typedComment]
        }));
      } else {
        toast.success('Comment submitted for approval!');
      }
      
      setCommentContent('');
      if (!user) setCommentName('');
      
      if (typedComment.approved === true) {
        toast.success('Comment added successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error posting comment');
      console.error('Error posting comment:', error);
    }
  };

  const handleCommentApproved = async (postId: string) => {
    if (isAdmin) {
      fetchPendingCommentsCount();
    }
    
    await handleCommentDeleted(postId);
  };

  const handleCommentDeleted = async (postId: string) => {
    try {
      let query = supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (!isAdmin) {
        query = query.eq('approved', true);
      }
        
      const { data, error } = await query;
        
      if (error) {
        throw error;
      }
      
      const transformedData = data?.map(comment => {
        const typedComment: BlogCommentType = {
          id: comment.id,
          content: comment.content,
          name: comment.name,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          user_id: comment.user_id,
          post_id: comment.post_id,
          approved: comment.approved
        };
        return typedComment;
      });
      
      setComments(prev => ({
        ...prev,
        [postId]: transformedData || []
      }));
      
      if (isAdmin) {
        fetchPendingCommentsCount();
      }
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

  const getPendingCommentsCount = (postId: string) => {
    if (!comments[postId]) return 0;
    return comments[postId].filter(comment => comment.approved === null).length;
  };

  return (
    <div className="w-full px-6 py-12 md:px-12">
      <h1 className="text-4xl font-bold mb-10" id="recent-posts">Blog</h1>
      
      {isAdmin && (
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Comments
              {pendingCommentsCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingCommentsCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {/* All posts content - handled below */}
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">Comments Awaiting Approval</h2>
              {pendingCommentsCount === 0 ? (
                <p className="text-gray-500">No comments pending approval.</p>
              ) : (
                <div className="space-y-4">
                  {Object.keys(comments).map(postId => {
                    const pendingComments = comments[postId].filter(c => c.approved === null);
                    if (pendingComments.length === 0) return null;
                    
                    const post = posts.find(p => p.id === postId);
                    if (!post) return null;
                    
                    return (
                      <div key={postId} className="border rounded-lg p-4">
                        <h3 className="font-bold mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {formatDate(post.created_at)}
                        </p>
                        
                        <div className="space-y-3">
                          {pendingComments.map(comment => (
                            <BlogComment 
                              key={comment.id} 
                              comment={comment} 
                              onCommentDeleted={() => handleCommentDeleted(postId)}
                              onCommentApproved={() => handleCommentApproved(postId)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      {currentTab === 'all' && (
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
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card border rounded-lg p-6 shadow-sm">
                  <Skeleton className="h-8 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex justify-end space-x-2">
                    <Skeleton className="h-9 w-24" />
                    {isAdmin && (
                      <>
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
                            
                            {isAdmin && getPendingCommentsCount(post.id) > 0 && (
                              <Badge variant="destructive" className="ml-2">
                                {getPendingCommentsCount(post.id)}
                              </Badge>
                            )}
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
                        
                        {showCommentsFor[post.id] && (
                          <div className="mt-6 border-t pt-4">
                            <h4 className="font-bold mb-4">Comments</h4>
                            
                            {comments[post.id]?.length > 0 ? (
                              <div className="mb-4">
                                {comments[post.id].map(comment => (
                                  <BlogComment 
                                    key={comment.id} 
                                    comment={comment} 
                                    onCommentDeleted={() => handleCommentDeleted(post.id)}
                                    onCommentApproved={() => handleCommentApproved(post.id)}
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 mb-4">No comments yet.</p>
                            )}
                            
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
                              
                              {!isAdmin && (
                                <p className="mt-2 text-xs text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Comments require approval before they appear publicly
                                </p>
                              )}
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
      )}
      
      {currentTab === 'all' && isAdmin && (
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
