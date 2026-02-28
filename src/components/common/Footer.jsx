"use client"

import { Facebook, Twitter } from "lucide-react";
import  Image  from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#e9ecef] text-[#003b4a]">

            {/* Top Info Section */}
            <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-300">
                <div className="flex items-start gap-6">

                    {/* Logo */}
                    <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="w-10 h-10 bg-[#0f7c82] rounded-full"></div>
                        <span className="text-2xl font-semibold text-[#003b4a]">
                            MSD
                        </span>
                    </div>

                    {/* Text */}
                    <p className="text-sm text-[#333] leading-relaxed max-w-4xl">
                        Brought to you by Merck & Co., Inc., Rahway, NJ, USA (known as MSD
                        outside the US and Canada) — dedicated to using leading-edge
                        science to save and improve lives around the world. Learn more
                        about the MSD Manuals and our commitment to{" "}
                        <span className="text-red-600 hover:underline cursor-pointer">
                            Global Medical Knowledge.
                        </span>
                    </p>
                </div>
            </div>

            {/* Links Section */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-3 gap-8">

                {/* Left Links */}
                <div className="space-y-3 text-sm font-medium text-[#003b4a]">
                    <p className="hover:underline cursor-pointer">ABOUT US</p>
                    <p className="hover:underline cursor-pointer">DISCLAIMER</p>
                    <p className="hover:underline cursor-pointer">PERMISSIONS</p>
                    <p className="hover:underline cursor-pointer">PRIVACY</p>
                    <p className="hover:underline cursor-pointer">COOKIE PREFERENCES</p>
                    <p className="hover:underline cursor-pointer">TERMS OF USE</p>
                </div>

                {/* Middle Links */}
                <div className="space-y-3 text-sm font-medium text-[#003b4a]">
                    <p className="hover:underline cursor-pointer">PARTNERSHIPS</p>
                    <p className="hover:underline cursor-pointer">CONTACT US</p>
                    <p className="hover:underline cursor-pointer">GLOBAL MEDICAL KNOWLEDGE</p>
                    <p className="hover:underline cursor-pointer">VETERINARY MANUAL</p>
                    <p className="hover:underline cursor-pointer">MOBILE APP</p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-between items-center gap-6">

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-[#3b5998] rounded-full flex items-center justify-center text-white">
                            <Facebook size={18} />
                        </div>
                        <div className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white">
                            <Twitter size={18} />
                        </div>
                    </div>

                    {/* Accessibility Icons */}
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/f-logo.png"
                            alt="MSD Logo"
                            width={70}
                            height={40}
                            priority
                        />
                    </div>
                </div>
            </div>


            {/* Bottom Copyright */}
            <div className="border-t border-gray-300">
                <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-[#333] text-center">
                    Copyright © 2026 Merck & Co., Inc., Rahway, NJ, USA and its affiliates.
                    All rights reserved.
                </div>
            </div>
        </footer>
    );
}