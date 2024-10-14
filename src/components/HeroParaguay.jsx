import React from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

export default function HeroParaguay() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <motion.img
          src="/images/paraguay-map.png"
          alt="Mapa de Paraguay"
          className="w-full max-w-sm rounded-lg shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <motion.div
          className="text-left"
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <h1 className="text-5xl font-bold text-primary">Descubre Paraguay</h1>
          <p className="py-6 max-w-md text-base-content">
            Explora los mapas de Paraguay, conoce sus distritos, ciudades y paisajes.
            Sumérgete en la riqueza geográfica y cultural que este maravilloso país tiene para ofrecer.
          </p>
          <button className="btn btn-primary">Explorar Mapas</button>
        </motion.div>
      </div>
    </div>
  );
}