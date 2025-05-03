import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, AlignJustify } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
type Props = {};

function NavBarv2({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/achievements", label: "Achievements" },
    { to: "/about", label: "About Me" },
  ];
  return (
    <nav className="flex justify-between items-center py-4 w-full theme-transition shadow-sm px-4">
      {/* Escritorio - centered navigation */}
      <div className="hidden md:flex space-x-2 mx-auto">
        <UserAvatar />
        {navLinks.map((link) => (
          <Button variant="ghost" asChild key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </Button>
        ))}
      </div>

      {/* Mobile - centered avatar */}
      <div className="md:hidden flex justify-center"></div>

      {/* Mode toggle - visible on all screens */}
      <div className="flex items-center space-x-2">
        <ModeToggle />

        {/* Mobile menu - only visible on mobile */}
        <div className="md:hidden">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Menu">
                {isMenuOpen ? <X /> : <AlignJustify />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navLinks.map((link) => (
                <DropdownMenuItem asChild key={link.to}>
                  <Link to={link.to} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default NavBarv2;
