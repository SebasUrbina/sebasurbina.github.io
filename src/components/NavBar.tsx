import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, AlignJustify } from "lucide-react";
import { motion } from "framer-motion";
import UserAvatar from "@/components/UserAvatar";

type Props = {};

function NavBarv2({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/achievements", label: "Achievements" },
    { to: "/about", label: "About Me" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Escritorio - centered navigation */}
          <div className="hidden md:flex items-center space-x-1 mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <UserAvatar />
            </motion.div>
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className={`relative ${
                    isActive(link.to)
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Link to={link.to}>
                    {link.label}
                    {isActive(link.to) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Mobile - centered avatar */}
          <div className="md:hidden flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <UserAvatar />
            </motion.div>
          </div>

          {/* Mode toggle - visible on all screens */}
          <div className="flex items-center space-x-2">
            <ModeToggle />

            {/* Mobile menu - only visible on mobile */}
            <div className="md:hidden">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Menu"
                    className="border-gray-200 dark:border-gray-700"
                  >
                    {isMenuOpen ? <X /> : <AlignJustify />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {navLinks.map((link) => (
                    <DropdownMenuItem asChild key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`${
                          isActive(link.to)
                            ? "text-blue-600 dark:text-blue-400 font-semibold"
                            : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarv2;
