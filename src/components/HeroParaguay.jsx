import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function HeroParaguay() {
  const handleScrollToMaps = () => {
    const mapsLinksElement = document.getElementById("mapslinks");
    if (mapsLinksElement) {
      mapsLinksElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero min-h-screen bg-gradient-to-br from-base-200 to-base-300 mb-20 mt-10">
      <div className="hero-content flex-col lg:flex-row-reverse items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative"
        >
          <motion.div
            whileHover={{
              boxShadow: "0 0 0 3px rgba(var(--p), 0.5)",
              transition: { duration: 0.3 },
            }}
            className="rounded-full overflow-hidden"
          >
            <Logo className="w-full max-w-sm lg:max-w-md" size={400} />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-primary opacity-10 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
        <motion.div
          className="text-left lg:mr-8 max-w-md lg:max-w-lg"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Descubre Paraguay
          </h1>
          <p className="py-4 lg:py-6 text-base-content text-lg text-pretty">
            Explora una amplia variedad de mapas de Paraguay que incluyen datos
            sobre economía, deportes, infraestructura, cultura, geografía y
            mucho más. Sumérgete en el conocimiento y descubre los aspectos más
            representativos del país en cada una de sus regiones y categorías.
          </p>
          <motion.button
            className="btn btn-primary relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToMaps}
            aria-label="Explorar mapas de Paraguay"
          >
            <span className="relative z-10">Explorar Mapas</span>
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-20 pointer-events-none"
              style={{ mixBlendMode: "overlay" }}
            />
            <div
              className="absolute inset-0 bg-white opacity-10 top-0 left-0 w-full h-1/2"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%)",
              }}
            />
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        {/* Fondo decorativo */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="smallGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </motion.div>
    </section>
  );
}
