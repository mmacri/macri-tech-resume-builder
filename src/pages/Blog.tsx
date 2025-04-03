
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Search, Edit, Trash2, Save, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  lastEdited?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  
  const correctPasscode = "admin123"; // In a real app, this would be securely stored

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Add some default blog posts if none exist
      const defaultPosts = [
        {
          id: 1,
          title: "AI and Machine Learning in the Enterprise",
          content: "Artificial Intelligence and Machine Learning are transforming how enterprises operate. From customer service to data analytics, these technologies are driving efficiency and innovation across business functions.",
          date: "May 15, 2024"
        },
        {
          id: 2,
          title: "Building Effective Customer Success Programs",
          content: "Customer Success is more than just support - it's about understanding customer goals and helping them achieve measurable outcomes. This strategic approach leads to higher retention and expansion opportunities.",
          date: "April 28, 2024"
        }
      ];
      setPosts(defaultPosts);
      localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
  }, []);

  const handleSubmit = () => {
    if (adminPasscode !== correctPasscode) {
      toast.error("Incorrect passcode!");
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    // Reset form
    setTitle('');
    setContent('');
    setAdminPasscode('');
    
    toast.success("Blog post published successfully!");
  };

  const startEditing = (post: BlogPost) => {
    if (adminPasscode !== correctPasscode) {
      toast.error("Please enter the admin passcode to edit posts");
      return;
    }
    
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const saveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedPosts = posts.map(post => 
      post.id === editingPostId 
        ? {
            ...post, 
            title: editTitle, 
            content: editContent,
            lastEdited: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          } 
        : post
    );
    
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    // Reset edit state
    setEditingPostId(null);
    setEditTitle('');
    setEditContent('');
    
    toast.success("Blog post updated successfully!");
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle('');
    setEditContent('');
  };

  const confirmDelete = (postId: number) => {
    if (adminPasscode !== correctPasscode) {
      toast.error("Please enter the admin passcode to delete posts");
      return;
    }
    
    setPostToDelete(postId);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    if (postToDelete === null) return;
    
    const updatedPosts = posts.filter(post => post.id !== postToDelete);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    setShowDeleteDialog(false);
    setPostToDelete(null);
    
    toast.success("Blog post deleted successfully!");
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
        
        {filteredPosts.length === 0 ? (
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
                        {post.date}
                        {post.lastEdited && <span> (edited: {post.lastEdited})</span>}
                      </p>
                      <p className="whitespace-pre-line">{post.content}</p>
                      <div className="flex justify-end space-x-2 mt-4">
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
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
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
          
          <div>
            <label htmlFor="admin-passcode" className="block text-sm font-medium mb-1">Admin Passcode</label>
            <Input 
              type="password" 
              id="admin-passcode" 
              value={adminPasscode}
              onChange={(e) => setAdminPasscode(e.target.value)}
              placeholder="Admin passcode" 
              required 
            />
          </div>
          
          <Button 
            type="button" 
            onClick={handleSubmit}
          >
            Post Blog
          </Button>
        </div>
      </div>

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
