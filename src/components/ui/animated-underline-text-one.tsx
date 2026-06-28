/* eslint-disable */
"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text: React.ReactNode;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
  as?: React.ElementType;
  align?: "left" | "center" | "right";
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      as: Tag = "h2",
      align = "center",
      ...props
    },
    ref
  ) => {
    const MotionComponent = motion.create ? motion.create(Tag as any) : (motion as any)(Tag);

    const preserveAspectRatio = 
      align === "left" ? "xMinYMid meet" : 
      align === "right" ? "xMaxYMid meet" : 
      "xMidYMid meet";

    const pathVariants: Variants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2", props.className)}
      >
        <div className="relative w-full">
          <MotionComponent
            className={textClassName || "text-4xl font-bold text-center"}
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            {text}
          </MotionComponent>

          <motion.svg
            width="100%"
            height="20"
            viewBox="0 0 300 20"
            preserveAspectRatio={preserveAspectRatio}
            className={cn(
              "absolute -bottom-4 w-2/3 max-w-[180px] sm:max-w-[220px] md:max-w-[280px]",
              align === "center" && "left-1/2 -translate-x-1/2",
              align === "right" && "right-0",
              align === "left" && "left-0",
              underlineClassName
            )}
          >
            <motion.path
              d={underlinePath}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                d: underlineHoverPath,
                transition: { duration: 0.8 },
              }}
            />
          </motion.svg>
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
