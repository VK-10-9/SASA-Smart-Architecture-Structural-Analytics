'use client';

import { Home, Calculator, Building2, BookOpen, FileText, Info } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

const NavBarDemo = (): JSX.Element => {
  const navItems: NavItem[] = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Force Calculator', url: '/force-calculator', icon: Calculator },
    { name: 'Design Scenario', url: '/design-scenario', icon: Building2 },
    { name: 'Documentation', url: '/documentation', icon: BookOpen },
    { name: 'Blog', url: '/blog', icon: FileText },
    { name: 'About', url: '/about', icon: Info }
  ];

  return (
    <NavBar 
      items={navItems} 
      className="bg-black/30 backdrop-blur-xl border-white/10 shadow-2xl"
    />
  );
};

export default NavBarDemo;
