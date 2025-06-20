'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { MdMenu } from 'react-icons/md';
import { SlEarphones } from 'react-icons/sl';
import { UpdateFollower } from 'react-mouse-follower';

const NavbarMenu = [
  { id: 1, title: 'Home', link: '#' },
  { id: 2, title: 'About', link: '#' },
  { id: 3, title: 'Services', link: '#' },
  { id: 4, title: 'Contact', link: '#' },
];

const Navbar = () => {
  return (
    <div className="relative bg-gray-900 text-white font-varela overflow-hidden">
      {/* Dot Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:50px_50px]" />
      </div>

      {/* Nav Content */}
      <motion.nav
        className="relative z-10 container mx-auto flex justify-between items-center py-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <div>
          <a href="#" className="text-xl font-bold uppercase">
            Playing <span className="font-extralight text-white/70">Market</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: 'white',
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: 'difference',
                  }}
                >
                  <a
                    href={item.link}
                    className="inline-block text-sm py-2 px-3 uppercase"
                  >
                    {item.title}
                  </a>
                </UpdateFollower>
              </li>
            ))}

            {/* Earphones Button */}
            <UpdateFollower
              mouseOptions={{
                backgroundColor: 'white',
                zIndex: 999,
                followSpeed: 1.5,
                scale: 5,
                mixBlendMode: 'difference',
              }}
            >
              <button className="text-xl ps-14">
                <SlEarphones />
              </button>
            </UpdateFollower>
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl">
          <MdMenu />
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
