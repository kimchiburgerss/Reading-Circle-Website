import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CartButton } from '@/components/Cart';
import logo from '@/assets/reading_circle_logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Store', path: '/store' },
    { name: 'Photo Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const additionalInfoItems = [
    { name: 'Blog', path: '/blog' },
    { name: 'Mission Statement', path: '/mission' },
    { name: 'Schedule', path: '/schedule' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-elegant border-b border-border' 
        : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105"
          >
            <img 
              src={logo} 
              alt="Pickering Reading Circle" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
              Pickering Reading Circle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home, Programs, Volunteer */}
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:animate-nav-hover ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  location.pathname === item.path ? 'after:scale-x-100' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Additional Information Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAdditionalInfoOpen(true)}
              onMouseLeave={() => setIsAdditionalInfoOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-200 hover:animate-nav-hover ${
                  additionalInfoItems.some(item => location.pathname === item.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <span>Additional Information</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  isAdditionalInfoOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {isAdditionalInfoOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg z-50"
                  onMouseEnter={() => setIsAdditionalInfoOpen(true)}
                  onMouseLeave={() => setIsAdditionalInfoOpen(false)}
                >
                  {additionalInfoItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-3 text-sm font-medium transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        location.pathname === item.path
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Store, Photo Gallery, Contact */}
            {navItems.slice(3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:animate-nav-hover ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  location.pathname === item.path ? 'after:scale-x-100' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Cart Button */}
            <CartButton />
            
            {/* Donate Button */}
            <a href="https://www.paypal.com/donate?token=AUJ9CUrtWhpwmQQRta7Hc3zh91kMChLmiyV49ltB1QQAYPpyyVJPTv5pk3eqEDi8-vLgxKj_wz328C-2" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="neu-glow"
                className="font-semibold"
              >
                Donate
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Additional Information Items for Mobile */}
              {additionalInfoItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="px-4 py-2">
                <a href="https://www.paypal.com/donate?token=AUJ9CUrtWhpwmQQRta7Hc3zh91kMChLmiyV49ltB1QQAYPpyyVJPTv5pk3eqEDi8-vLgxKj_wz328C-2" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant="neu-glow"
                    className="w-full font-semibold"
                  >
                    Donate
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;