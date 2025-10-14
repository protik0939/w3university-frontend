'use client'
import React, { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/LocaleContext";

interface DropdownItem {
  name: string;
  link: string;
}

interface NavItem {
  name: string;
  link?: string;
  dropdown?: DropdownItem[];
}

export default function TopNavBar() {
  // 💡 Configurable options
  const navOptions: NavItem[] = [
    { name: "Home", link: "/" },
    {
      name: "Docs",
      dropdown: [
        { name: "Getting Started", link: "/docs/start" },
        { name: "Components", link: "/docs/components" },
        { name: "API Reference", link: "/docs/api" },
      ],
    },
    {
      name: "Community",
      dropdown: [
        { name: "Discord", link: "https://discord.com" },
        { name: "GitHub", link: "https://github.com" },
      ],
    },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { locale, setLocale } = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'bn' : 'en';
    setLocale(newLocale);
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%]
      backdrop-blur-xl bg-white/10 border border-white/20 text-white
      flex items-center justify-between px-6 py-3 rounded-full
      shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/20 z-50"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-1 cursor-pointer">
        <Image
          src="/W3uni.svg"
          alt="logo"
          className="w-9 h-6"
          width={60}
          height={30}
        />
        <span className="font-semibold text-white text-lg">University</span>
      </div>

      {/* Right: Navigation Links + Language Switcher */}
      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-6">
          {navOptions.map((item) => (
            <li
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.link || "#"}
                className="flex items-center gap-1 font-medium hover:text-green-300 transition-colors duration-300"
              >
                {item.name}
                {item.dropdown && <ChevronDown size={16} />}
              </Link>

              {/* Dropdown */}
              {item.dropdown && activeDropdown === item.name && (
                <ul
                  className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl border border-white/20
                  rounded-lg shadow-lg py-2 transition-all duration-300"
                >
                  {item.dropdown.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.link}
                        className="block px-4 py-2 text-sm hover:bg-white/20 transition-colors duration-300"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
          border border-white/20 rounded-full transition-all duration-300 font-medium"
          aria-label="Switch language"
        >
          <Globe size={18} />
          <span className="text-sm">{locale === 'en' ? 'EN' : 'বাং'}</span>
        </button>
      </div>
    </nav>
  );
}
