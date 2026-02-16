"use client";

import { MotionValue, useTransform, motion } from "framer-motion";
import { carSpecs } from "@/data/carData";

interface FerrariExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function FerrariExperience({
    scrollYProgress,
}: FerrariExperienceProps) {
    // Phase 1: Hero (0 - 0.2)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const heroDisplay = useTransform(heroOpacity, (v) => (v <= 0 ? "none" : "flex"));

    // Phase 2: Design (0.4 - 0.6)
    const designOpacity = useTransform(
        scrollYProgress,
        [0.35, 0.4, 0.6, 0.65],
        [0, 1, 1, 0]
    );
    const designScale = useTransform(scrollYProgress, [0.4, 0.6], [0.95, 1.05]);
    const designDisplay = useTransform(designOpacity, (v) => (v <= 0 ? "none" : "flex"));

    // Phase 3: Engine (0.8 - 1.0)
    const engineOpacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);
    const engineX = useTransform(scrollYProgress, [0.8, 1], [50, 0]);
    const engineDisplay = useTransform(engineOpacity, (v) => (v <= 0 ? "none" : "flex"));

    return (
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full overflow-hidden">

            {/* PHASE 1: HERO */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY, display: heroDisplay }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
            >
                <h1 className="text-6xl md:text-9xl font-black font-orbitron tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                    FERRARI LAFERRARI
                </h1>
                <p className="mt-4 text-ferrari-red font-rajdhani text-2xl md:text-3xl tracking-wide font-bold">
                    ROSSO CORSA
                </p>
                <div className="mt-12 flex flex-col items-center gap-4">
                    <span className="text-xl font-rajdhani tracking-widest text-gray-300">
                        PRICE: <span className="text-white">{carSpecs.price}</span>
                    </span>
                    <button className="pointer-events-auto px-8 py-3 bg-ferrari-red text-white font-rajdhani font-bold tracking-widest hover:bg-red-700 transition-colors">
                        INQUIRE NOW
                    </button>
                </div>
            </motion.div>

            {/* PHASE 2: DESIGN */}
            <motion.div
                style={{ opacity: designOpacity, scale: designScale, display: designDisplay }}
                className="absolute inset-0 flex flex-col items-start justify-center px-12 md:px-32 max-w-7xl mx-auto"
            >
                <div className="border-l-4 border-ferrari-yellow pl-8">
                    <h2 className="text-5xl md:text-7xl font-orbitron font-bold mb-4">
                        DESIGN
                    </h2>
                    <p className="text-xl md:text-2xl font-rajdhani text-gray-300 max-w-xl">
                        Carbon fiber monocoque structure inspired by F1, delivering
                        unparalleled rigidity and weight distribution.
                    </p>
                    <div className="mt-8 flex gap-4 text-sm font-orbiron tracking-widest text-ferrari-red">
                        <span>ACTIVE AERO</span> {"//"} <span>SCULPTED AIRFLOW</span>
                    </div>
                </div>
            </motion.div>

            {/* PHASE 3: ENGINE */}
            <motion.div
                style={{ opacity: engineOpacity, x: engineX, display: engineDisplay }}
                className="absolute inset-0 flex flex-col items-end justify-center px-12 md:px-32 max-w-7xl mx-auto ml-auto"
            >
                <div className="text-right border-r-4 border-ferrari-red pr-8">
                    <h2 className="text-5xl md:text-7xl font-orbitron font-bold mb-4">
                        ENGINE
                    </h2>
                    <ul className="space-y-4 font-rajdhani text-xl md:text-3xl">
                        <li className="flex items-center justify-end gap-4">
                            <span className="text-gray-400 text-sm tracking-widest">DISPLACEMENT</span>
                            <span>{carSpecs.engine}</span>
                        </li>
                        <li className="flex items-center justify-end gap-4">
                            <span className="text-gray-400 text-sm tracking-widest">POWER</span>
                            <span className="text-ferrari-yellow font-bold">{carSpecs.hp}</span>
                        </li>
                        <li className="flex items-center justify-end gap-4">
                            <span className="text-gray-400 text-sm tracking-widest">SYSTEM</span>
                            <span>{carSpecs.hybrid}</span>
                        </li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}
