
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck } from 'lucide-react';

const AdminButtons = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <div className="flex justify-end my-4">
      <Button 
        variant="outline" 
        onClick={() => navigate('/admin')}
        className="flex items-center"
      >
        <ShieldCheck className="mr-2 h-4 w-4" />
        Admin Panel
      </Button>
    </div>
  );
};

export default AdminButtons;
