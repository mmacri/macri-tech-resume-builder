import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToElement } from '../utils/scrollUtils';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
  navItems: { label: string; href?: string; external?: boolean; onClick?: () => Promise<void> }[];
  profileImage: string;
  name: string;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, profileImage, name }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isNavOpen && !target.closest('#sideNav') && !target.closest('.navbar-toggler')) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  const handleNavLinkClick = (href: string) => {
    if (window.innerWidth < 992) {
      setIsNavOpen(false);
    }

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      if (document.getElementById(targetId)) {
        scrollToElement(targetId);
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const filteredNavItems = navItems.filter(item => {
    if (user && item.href === '/auth') {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <nav 
        id="sideNav"
        className={`bg-macri-primary text-white lg:fixed lg:w-64 lg:h-screen z-10 transition-all duration-300 ${isNavOpen ? 'h-screen' : 'h-16 lg:h-screen'}`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center mb-8 lg:mb-12 justify-between">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => handleNavLinkClick('/')}
            >
              <span className="text-xl font-bold lg:hidden">{name}</span>
            </Link>
            <button 
              className="lg:hidden p-2 focus:outline-none"
              onClick={toggleNav}
              aria-label="Toggle navigation"
            >
              {isNavOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          <div className={`${isNavOpen ? 'flex' : 'hidden'} lg:flex justify-center mb-6`}>
            <img 
              src={profileImage} 
              alt={`${name} Profile`} 
              className="img-profile rounded-full border-4 border-gray-200 w-40 h-40 object-cover"
            />
          </div>
          
          <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block mb-4`}>
            {user ? (
              <div className="flex flex-col items-center">
                <p className="text-center mb-2">
                  Logged in as: <br />
                  <span className="font-semibold">{user.email}</span>
                  {isAdmin && <span className="ml-1 text-amber-300">(Admin)</span>}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-white text-white hover:bg-white/20 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <p className="text-center text-white/70 text-sm">Not logged in</p>
            )}
          </div>
          
          <div className={`${isNavOpen ? 'block' : 'hidden'} lg:block`}>
            <ul className="space-y-2">
              {filteredNavItems.map((item, index) => (
                <li key={index} className="nav-item">
                  {item.external ? (
                    <a 
                      href={item.href} 
                      className="nav-link block py-2 hover:opacity-80 transition-opacity"
                      onClick={() => handleNavLinkClick(item.href || '')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : item.onClick ? (
                    <a 
                      href="#"
                      className="nav-link block py-2 hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.onClick) item.onClick();
                      }}
                    >
                      {item.label}
                    </a>
                  ) : item.href?.startsWith('#') ? (
                    <a 
                      href={item.href} 
                      className="nav-link block py-2 hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavLinkClick(item.href || '');
                      }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      to={item.href || '/'} 
                      className={`nav-link block py-2 hover:opacity-80 transition-opacity ${location.pathname === item.href ? 'font-bold' : ''}`}
                      onClick={() => handleNavLinkClick(item.href || '')}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`mt-auto ${isNavOpen ? 'block' : 'hidden'} lg:block pt-6`}>
            <div className="social-icons flex justify-center space-x-4">
              <a className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" href="https://linkedin.com/in/mikemacri" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="social-icon rounded-full border border-white p-2 hover:bg-white/20 transition-colors" href="https://github.com/mmacri/my-portfolio" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 lg:ml-64">
        <div className="container-fluid p-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
