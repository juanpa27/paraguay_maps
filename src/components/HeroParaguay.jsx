import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function HeroParaguay() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))', // Aplicar sombra directamente al SVG
          }}
        >
          <Logo className="w-full max-w-sm" size={400} />
        </motion.div>
        <motion.div
          className="text-left lg:mr-8"
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <h1 className="text-5xl font-bold text-primary">Descubre Paraguay</h1>
          <p className="py-6 max-w-md text-base-content">
            Explora los mapas de Paraguay, conoce sus distritos, ciudades y paisajes.
            Sumérgete en la riqueza geográfica y cultural que este maravilloso país tiene para ofrecer.
          </p>
          <button className="btn btn-outline btn-primary">Explorar Mapas</button>
        </motion.div>
      </div>
    </div>
  );
}
