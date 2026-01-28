import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, AlignJustify } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {};

function NavBar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { to: "/", labelKey: "nav.home" },
    { to: "/blog", labelKey: "nav.blog" },
    { to: "/achievements", labelKey: "nav.achievements" },
    { to: "/about", labelKey: "nav.about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-terminal backdrop-blur-md border-b border-helix-cyan/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Name */}
          <Link 
            to="/" 
            className="font-mono text-lg font-semibold text-text-bright hover:text-helix-cyan transition-colors"
          >
            Sebastián Urbina
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-mono text-sm transition-all duration-200 ${
                  isActive(link.to)
                    ? "text-helix-cyan"
                    : "text-text-primary hover:text-helix-cyan"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Right side - Language toggle and Mode toggle */}
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <LanguageToggle />

            {/* Mobile menu */}
            <div className="md:hidden">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Menu"
                    className="border-helix-cyan/30 bg-transparent hover:bg-helix-cyan/10 text-text-bright"
                  >
                    {isMenuOpen ? <X size={20} /> : <AlignJustify size={20} />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-space-darker border-helix-cyan/30 font-mono"
                >
                  {navLinks.map((link) => (
                    <DropdownMenuItem asChild key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`${
                          isActive(link.to)
                            ? "text-helix-cyan font-semibold"
                            : "text-text-primary"
                        }`}
                      >
                        {t(link.labelKey)}
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

export default NavBar;
