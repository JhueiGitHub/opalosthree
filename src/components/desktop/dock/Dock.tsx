"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { openWindow } from "@/redux/slices/windows";
import { v4 as uuidv4 } from "uuid";
import FolderDuotone from "@/components/icons/folder-duotone";
import { cn } from "@/lib/utils";

// Enhanced dock item with better animations
const DockItem = ({
  id,
  name,
  isOpen,
  mouseX,
}: {
  id: string;
  name: string;
  icon?: string;
  isOpen: boolean;
  mouseX: any;
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate the distance between mouse and this dock item
  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  // Enhanced dock magnification effect
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const scaleTransform = useTransform(
    distance,
    [-150, 0, 150],
    [0.8, 1.2, 0.8]
  );

  // Apply spring physics for smoother animation
  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleClick = () => {
    // Open a new window for this app
    dispatch(
      openWindow({
        id: `${id}-${uuidv4()}`, // Generate a unique ID for this window instance
        appId: id,
        title: name,
      })
    );
  };

  return (
    <motion.div
      ref={ref}
      className="relative mx-1 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{ width, height }}
    >
      {/* App icon with enhanced styling */}
      <motion.div
        className={cn(
          "w-full h-full rounded-xl flex items-center justify-center backdrop-blur-md border transition-all duration-200",
          isOpen
            ? "bg-black/40 border-purple-500/40"
            : "bg-black/20 border-white/10 hover:border-white/20"
        )}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{ scale }}
      >
        <motion.div
          className="w-3/4 h-3/4 flex items-center justify-center"
          animate={{ rotate: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <FolderDuotone />
        </motion.div>

        {/* Indicator dot for open apps with animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-purple-400"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced tooltip with backdrop blur */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute -top-8 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs text-white whitespace-nowrap border border-white/10"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Enhanced dock with better animation and glass effect
const Dock = () => {
  const dockApps = useAppSelector((state) => state.dock.apps);
  const openAppIds = useAppSelector((state) => state.dock.openAppIds);
  const mouseX = useMotionValue(Infinity);

  const dockRef = useRef<HTMLDivElement>(null);

  // Hide dock when no interaction for a while (can be disabled for persistent dock)
  const [isVisible, setIsVisible] = useState(true);
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    setIsVisible(true);

    // Hide dock after inactivity
    // Uncomment to enable auto-hide
    /*
    inactivityTimeout.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5 seconds
    */
  };

  useEffect(() => {
    resetInactivityTimer();

    // Show dock when mouse moves to bottom of screen
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 100) {
        setIsVisible(true);
        resetInactivityTimer();
      }

      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        const isOverDock =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isOverDock) {
          mouseX.set(e.clientX);
        } else {
          mouseX.set(Infinity);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, [mouseX]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div
            ref={dockRef}
            className="flex items-center bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10 shadow-lg"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            // Add subtle floating animation
            animate={{
              y: [0, -5, 0],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  repeatType: "mirror",
                },
              },
            }}
          >
            {/* Glass effect layers */}
            <div className="absolute inset-0 rounded-2xl backdrop-blur-[16px] -z-10" />
            <div
              className="absolute inset-0 rounded-2xl -z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.15) 100%)",
                opacity: 0.7,
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl -z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.07) 50%, transparent 100%)",
              }}
            />

            {/* Dock items */}
            {dockApps.map((app) => (
              <DockItem
                key={app.id}
                id={app.id}
                name={app.name}
                isOpen={openAppIds.includes(app.id)}
                mouseX={mouseX}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dock;
