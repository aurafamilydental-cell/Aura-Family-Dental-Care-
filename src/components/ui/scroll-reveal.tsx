"use client";

import * as React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerChildren?: number;
  delay?: number;
  once?: boolean;
  margin?: string;
}

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className,
      staggerChildren = 0.1,
      delay = 0,
      once = true,
      margin = "0px",
      ...props
    },
    ref
  ) => {
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        variants={containerVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

interface ScrollRevealItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  yOffset?: number;
  duration?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ease?: any;
}

export const ScrollRevealItem = React.forwardRef<HTMLDivElement, ScrollRevealItemProps>(
  (
    {
      children,
      className,
      yOffset = 40,
      duration = 0.8,
      ease = [0.16, 1, 0.3, 1],
      ...props
    },
    ref
  ) => {
    const itemVariants: Variants = {
      hidden: {
        opacity: 0,
        y: yOffset,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ease,
          duration,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        variants={itemVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollRevealItem.displayName = "ScrollRevealItem";
