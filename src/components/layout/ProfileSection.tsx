
import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileSectionProps {
  profileImage: string;
  user: any;
  isAdmin: boolean;
  handleLogout: () => Promise<void>;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileImage,
  user,
  isAdmin,
  handleLogout
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex justify-center mb-6">
        <img 
          src={profileImage} 
          alt="Profile" 
          className="img-profile rounded-full border-4 border-gray-200 w-40 h-40 object-cover"
        />
      </div>
      
      <div className="mb-4">
        {user ? (
          <div className="flex flex-col items-center">
            <p className="text-center mb-2">
              Logged in as: <br />
              <span className="font-semibold">{user.email}</span>
              {isAdmin && (
                <div className="mt-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => navigate('/admin')}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </div>
              )}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-white text-white hover:bg-white/20 transition-colors mt-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <p className="text-center text-white/70 text-sm">Not logged in</p>
        )}
      </div>
    </>
  );
};
