"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Spin as Hamburger } from "hamburger-react";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

// Animation variants for reusability
const fadeInAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.3 },
};

// NavItem component with memoization
const NavItem = React.memo(
  ({
    href,
    children,
    isActive,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
  }) => (
    <motion.div>
      <Link
        href={href}
        className={`px-4 py-2 mx-1 ${
          isActive ? "text-white" : "text-gray-400 hover:text-white"
        } transition-colors duration-300`}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  )
);

NavItem.displayName = "NavItem";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted state once after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Navigation items for reusability
  const navItems = [
    { href: "/", label: "Home." },
    { href: "/my-story", label: "My Story." },
    { href: "/experience", label: "Experience." },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="bg-black/50 text-white py-4 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div
            {...fadeInAnimation}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="flex-1 hidden lg:flex justify-center items-center">
            <motion.div
              className="flex"
              {...fadeInAnimation}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
            >
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                >
                  {item.label}
                </NavItem>
              ))}
            </motion.div>
          </div>

          {/* Contact Button (Desktop) */}
          <motion.div
            className="hidden lg:block"
            {...fadeInAnimation}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
          >
            <Link href="/contact">
              <Button text="Contact Me" bg="white" />
            </Link>
          </motion.div>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden relative z-[60]">
            <Hamburger
              toggled={isMenuOpen}
              toggle={toggleMenu}
              size={20}
              color="white"
              rounded
              hideOutline={false}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/95 pt-20 px-6 flex flex-col items-center z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Add hamburger in the mobile slider */}
            <div className="absolute top-4 right-6">
              <Hamburger
                toggled={true}
                toggle={toggleMenu}
                size={20}
                color="white"
                rounded
                hideOutline={false}
                aria-label="Close menu"
              />
            </div>

            <motion.div
              className="flex flex-col items-center space-y-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavItem>
              ))}

              <div className="mt-8">
                <Link href="/contact">
                  <Button text="Contact Me" bg="white" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default React.memo(Navbar);
