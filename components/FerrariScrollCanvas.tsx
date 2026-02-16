"use client";

import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FerrariScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function FerrariScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: FerrariScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        // Initialize loadedImages with nulls to ensure correct indexing later
        const loadedImages: HTMLImageElement[] = new Array(totalFrames).fill(null);

        // Batched Preloading
        for (let i = 0; i < totalFrames; i++) {
            setTimeout(() => {
                const img = new Image();
                const frameIndex = (i + 1).toString().padStart(3, "0");
                img.src = `${imageFolderPath}/ezgif-frame-${frameIndex}.jpg`;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalFrames) {
                        setIsLoaded(true);
                        console.log("All images loaded!");
                    }
                };
                img.onerror = (e) => console.error(`Failed to load frame ${frameIndex}`, e);
                loadedImages[i] = img; // Ensure order is preserved
            }, i * 10); // 10ms delay to ease the network burst
        }
        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    // Draw Frame
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1;

        // Set display size (css pixels).
        const rect = canvas.getBoundingClientRect();

        // Set actual size in memory (scaled to account for extra pixel density).
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
        }

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Object Fit: Cover Logic
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image -> fit by width (crop top/bottom)
            drawWidth = canvasWidth;
            drawHeight = img.height * (canvasWidth / img.width);
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            // Canvas is taller/narrower -> fit by height (crop sides)
            drawHeight = canvasHeight;
            drawWidth = img.width * (canvasHeight / img.height);
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded && images.length > 0) {
                // Re-render current frame on resize
                const currentProgress = scrollYProgress.get();
                const frameIndex = Math.min(
                    totalFrames - 1,
                    Math.floor(currentProgress * totalFrames)
                );
                requestAnimationFrame(() => renderFrame(frameIndex));
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images, totalFrames, scrollYProgress]);

    // Initial draw when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}
