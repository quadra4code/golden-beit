import React from "react";
import { motion, AnimatePresence } from 'framer-motion';

function Background({ backgroundImage }) {
  return (
    <div className="background">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={backgroundImage} // When this key changes, the old one exits and the new one enters
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="bg-img"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </AnimatePresence>
      {/* Overlay and Gradient Overlay remain on top */}
      <div className="overlay"></div>
      <div className="gradient-overlay"></div>
    </div>
  );
}

export default Background;