import { motion } from "motion/react";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import img1 from "@/assets/intro/1.jpg.asset.json";
import img2 from "@/assets/intro/2.jpg.asset.json";
import img3 from "@/assets/intro/3.jpg.asset.json";
import img4 from "@/assets/intro/4.jpg.asset.json";
import img5 from "@/assets/intro/5.jpg.asset.json";
import img6 from "@/assets/intro/6.jpg.asset.json";
import { SITE } from "@/data/nav";

const images = [
  { src: img1.url, alt: "Gym 1" },
  { src: img2.url, alt: "Gym 2" },
  { src: img3.url, alt: "Gym 3" },
  { src: img4.url, alt: "Gym 4" },
  { src: img5.url, alt: "Gym 5" },
  { src: img6.url, alt: "Gym 6" },
];

export function Footer3DBanner() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden bg-foreground">
      {/* 3D looping gallery */}
      <div className="absolute inset-0">
        <InfiniteGallery
          images={images}
          speed={0.6}
          className="h-full w-full"
        />
      </div>

      {/* Radial vignette to blend with page */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-foreground/40 to-foreground" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground to-transparent" />

      {/* Attention-grabbing headline */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-primary"
        >
          Ready to move?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.02em" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mt-3 bg-gradient-to-r from-background via-primary to-background bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl"
          style={{ backgroundSize: "200% 100%" }}
        >
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="inline-block bg-gradient-to-r from-background via-primary to-background bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%" }}
          >
            Join {SITE.name}
          </motion.span>
        </motion.h2>

        <motion.a
          href="#services"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_hsl(var(--primary))]"
        >
          Book Your First Class
          <motion.span
            aria-hidden
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.a>
      </div>
    </div>
  );
}
