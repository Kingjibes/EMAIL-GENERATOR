import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Support', path: '/support', icon: ShieldCheck },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NavLink = ({ to, children, Icon, onClick }) => {
    const isActive = location.pathname === to;
    return (
      <SheetClose asChild>
        <Link
          to={to}
          onClick={onClick}
          className={cn(
            'flex items-center p-3 rounded-lg text-lg transition-colors duration-200 ease-in-out',
            isActive
              ? 'bg-primary/20 text-primary font-semibold shadow-inner'
              : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
          )}
        >
          <Icon className="mr-3 h-5 w-5" />
          {children}
        </Link>
      </SheetClose>
    );
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img  src="/mail_icon.svg" alt="CipherTech Logo" className="h-10 w-10" src="https://images.unsplash.com/photo-1686140386811-099f53c0dd54" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">CIPHERTECH</span>
              <span className="text-xs font-light -mt-1">EMAIL GENERATOR</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm font-medium mr-4 border-r border-white/30 pr-4">Made by HACKERPRO</span>
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className={cn(
                  "text-white hover:bg-white/20 hover:text-white",
                  location.pathname === item.path && "bg-white/20 font-semibold"
                )}
              >
                <Link to={item.path} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-background text-foreground p-0 pt-8 shadow-xl glassmorphism">
                <SheetHeader className="p-4 border-b border-border">
                  <SheetTitle className="text-center text-xl font-bold text-primary">
                    CIPHERTECH NAVIGATOR
                  </SheetTitle>
                </SheetHeader>
                <div className="p-4 space-y-2">
                  {navItems.map((item) => (
                    <NavLink key={item.name} to={item.path} Icon={item.icon} onClick={() => setIsOpen(false)}>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
                   <p className="text-center text-xs text-muted-foreground">Made by HACKERPRO</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Helper cn function if not globally available in this file's context
// Usually imported from '@/lib/utils'
function cn(...inputs) {
  // Simplified version for brevity; prefer importing the actual 'cn' from 'tailwind-merge' and 'clsx'
  return inputs.filter(Boolean).join(' ');
}


export default Navbar;