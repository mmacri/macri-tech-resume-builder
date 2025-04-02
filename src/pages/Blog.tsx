
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
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

  return (
    <div className="w-full px-6 py-12 md:px-12">
      <h1 className="text-4xl font-bold mb-10">Blog</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-500">No blog posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div key={post.id} className="card">
                <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-subtitle mb-3">{post.date}</p>
                  <p className="whitespace-pre-line">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="blog-title" className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text" 
              id="blog-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Title" 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="blog-content" className="block text-sm font-medium mb-1">Content</label>
            <textarea 
              id="blog-content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded min-h-[200px]"
              placeholder="Content" 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="admin-passcode" className="block text-sm font-medium mb-1">Admin Passcode</label>
            <input 
              type="password" 
              id="admin-passcode" 
              value={adminPasscode}
              onChange={(e) => setAdminPasscode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Admin Passcode" 
              required 
            />
          </div>
          
          <Button 
            type="button" 
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Post Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
