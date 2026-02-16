"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500",
                scrolled ? "glassmorphism" : "bg-transparent"
            )}
        >
            <div className="flex items-center justify-between max-w-[1920px] mx-auto">
                {/* Wordmark */}
                <div className="text-2xl font-bold tracking-widest font-orbitron text-white select-none">
                    FERRARI
                </div>

                {/* Action */}
                <button
                    className="px-6 py-2 text-sm font-semibold tracking-widest text-[#fff] border border-[#fff/30] 
                     hover:bg-ferrari-red hover:border-ferrari-red hover:text-white transition-colors duration-300 font-rajdhani"
                >
                    INQUIRE
                </button>
            </div>
        </nav>
    );
}
