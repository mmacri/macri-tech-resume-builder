import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const professionalFocusItems = [
    { label: 'Customer Success', href: '/portfolio/customer-success' },
    { label: 'Partner Development', href: '/portfolio/partner-development' },
    { label: 'Compliance & Risk Leadership', href: '/portfolio/compliance' },
    { label: 'Solution Engineering & Leadership', href: '/portfolio/solution-engineering' },
  ];

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Resume', href: '/resume' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'My Websites', href: '/my-websites' },
    { label: 'Let\'s Connect', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link 
            to="/" 
            className="font-saira font-bold text-xl text-macri-primary hover:text-macri-primary-dark transition-colors"
          >
            Mike Macri
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-macri-primary ${
                isActive('/')
                  ? 'text-macri-primary border-b-2 border-macri-primary'
                  : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors hover:text-macri-primary ${
                isActive('/about')
                  ? 'text-macri-primary border-b-2 border-macri-primary'
                  : 'text-gray-700'
              }`}
            >
              About
            </Link>
            <Link
              to="/resume"
              className={`font-medium transition-colors hover:text-macri-primary ${
                isActive('/resume')
                  ? 'text-macri-primary border-b-2 border-macri-primary'
                  : 'text-gray-700'
              }`}
            >
              Resume
            </Link>
            
            {/* Professional Focus Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Professional Focus
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-white">
                      {professionalFocusItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="font-medium leading-none">{item.label}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/portfolio"
              className={`font-medium transition-colors hover:text-macri-primary ${
                isActive('/portfolio')
                  ? 'text-macri-primary border-b-2 border-macri-primary'
                  : 'text-gray-700'
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/my-websites"
              className={`font-medium transition-colors hover:text-macri-primary ${
                isActive('/my-websites')
                  ? 'text-macri-primary border-b-2 border-macri-primary'
                  : 'text-gray-700'
              }`}
            >
              My Websites
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors hover:text-macri-primary ${
                isActive('/contact')
                  ? 'text-macri-primary border-b-2 border-macri-primary'
                  : 'text-gray-700'
              }`}
            >
              Let's Connect
            </Link>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 ml-6 border-l border-gray-300 pl-6">
              <a
                href="https://linkedin.com/in/mikemacri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-macri-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-macri-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Professional Focus Items */}
              <div className="px-3 py-2 text-sm font-semibold text-gray-500">Professional Focus</div>
              {professionalFocusItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-macri-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {navItems.slice(3).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-macri-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200 mt-4">
                <a
                  href="https://linkedin.com/in/mikemacri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-macri-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};