import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const TransitionLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 flex items-center justify-center bg-base-100 z-50"
    >
      <Logo size={200} circle={true} />
    </motion.div>
  );
};

export default TransitionLogo;