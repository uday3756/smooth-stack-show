import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  className,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  className?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  // Use the theme's foreground tone for every card so the section reads as one
  // consistent dark block instead of three slightly different blacks.
  const backgroundColors = ["var(--foreground)", "var(--foreground)", "var(--foreground)"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
    "linear-gradient(to bottom right, #8b5cf6, #22d3ee)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);

  return (
    <>
      {/* Mobile: a simple stacked list. The desktop sticky-scroll relies on a
          nested scroll container + a pinned card, which overlaps and traps
          scrolling on small screens — so on mobile we just show each offering
          as a normal card (photo on top, text below) in the page flow. */}
      <div
        className={cn("flex flex-col gap-6 rounded-2xl p-5 sm:hidden", className)}
        style={{ backgroundColor: "var(--foreground)" }}
      >
        {content.map((item, index) => (
          <motion.div
            key={item.title + index}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative h-44 w-full overflow-hidden rounded-xl"
            >
              {item.content ?? null}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
              className="mt-4 text-xl font-bold text-background"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
              className="mt-2 text-sm leading-relaxed text-background/80"
            >
              {item.description}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: the sticky-scroll reveal. */}
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        className={cn(
          "relative hidden h-[34rem] w-full justify-center gap-10 overflow-y-auto rounded-2xl p-10 no-scrollbar sm:flex sm:flex-row lg:h-[40rem] lg:gap-16",
          className,
        )}
        ref={ref}
      >
      <div className="relative flex min-w-0 flex-1 items-start px-0 sm:px-4">
        <div className="w-full max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-10 sm:my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-xl font-bold text-background sm:text-2xl"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-4 max-w-sm text-sm leading-relaxed text-background/80 sm:mt-8 sm:text-base"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-24 sm:h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 h-72 w-full shrink-0 self-start overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-[24rem] lg:h-[30rem] lg:w-[34rem]",
          contentClassName,
        )}
      >
        {/* Crossfade the active card's content as you scroll between items. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
      </motion.div>
    </>
  );
};
