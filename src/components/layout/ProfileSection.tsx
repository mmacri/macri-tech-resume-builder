
import React from 'react';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileSectionProps {
  profileImage: string;
  name: string;
  handleLogout: () => Promise<void>;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileImage,
  name,
  handleLogout
}) => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  // Add special handling for known admin emails
  const isKnownAdmin = user?.email === 'mike@mikemacri.com' || user?.email === 'mike@gmail.com';
  const effectiveIsAdmin = isAdmin || isKnownAdmin;
  
  // Add console logs for debugging
  React.useEffect(() => {
    if (user) {
      console.log('ProfileSection - User email:', user.email);
      console.log('ProfileSection - Is admin from context:', isAdmin);
      console.log('ProfileSection - Is known admin:', isKnownAdmin);
      console.log('ProfileSection - Effective is admin:', effectiveIsAdmin);
    }
  }, [user, isAdmin, isKnownAdmin, effectiveIsAdmin]);
  
  const goToAdmin = () => {
    navigate('/admin-dashboard');
  };
  
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
            <p className="text-center mb-2 text-white">
              Logged in as: <br />
              <span className="font-semibold">{user.email}</span>
              {effectiveIsAdmin && (
                <span className="mt-1 block text-amber-300 text-xs font-semibold">
                  Administrator Account
                </span>
              )}
            </p>
            
            {effectiveIsAdmin && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={goToAdmin}
                className="bg-amber-600 hover:bg-amber-700 text-white w-full flex items-center justify-center gap-2 mb-2 mt-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Button>
            )}
            
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
