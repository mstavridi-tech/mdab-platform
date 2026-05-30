"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ background: '#060608' }}
    >
      {/* Beam layer — purely decorative, sits behind content */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '260px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {/* Left beam — full width to left edge */}
        <motion.div
          initial={{ opacity: 0, width: '8rem' }}
          whileInView={{ opacity: 1, width: '52vw' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            right: '50%',
            top: 0,
            height: '220px',
            backgroundImage: 'conic-gradient(from 70deg at center top, rgba(201,168,76,0.85), transparent, transparent)',
            maskImage: 'linear-gradient(to bottom, white 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 30%, transparent 100%)',
          }}
        />
        {/* Right beam — full width to right edge */}
        <motion.div
          initial={{ opacity: 0, width: '8rem' }}
          whileInView={{ opacity: 1, width: '52vw' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            height: '220px',
            backgroundImage: 'conic-gradient(from 290deg at center top, transparent, transparent, rgba(201,168,76,0.85))',
            maskImage: 'linear-gradient(to bottom, white 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 30%, transparent 100%)',
          }}
        />
        {/* Centre glow orb */}
        <motion.div
          initial={{ opacity: 0, width: '4rem' }}
          whileInView={{ opacity: 1, width: '28rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            height: '140px',
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.22)',
            filter: 'blur(48px)',
          }}
        />
        {/* Beam line — full viewport */}
        <motion.div
          initial={{ width: '4rem', opacity: 0 }}
          whileInView={{ width: '100vw', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent 0%, rgba(226,196,114,0.7) 20%, rgba(226,196,114,0.95) 50%, rgba(226,196,114,0.7) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Content sits on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
