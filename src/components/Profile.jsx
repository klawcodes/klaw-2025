import React from 'react';
import { motion } from 'framer-motion';

export default function Profile() {
  const containerVariants = {
    initial: {
      y: 50,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: {
      y: 20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const flickerVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0, 1, 0, 1],
      transition: {
        duration: 0.2,
        times: [0, 0.2, 0.4, 0.6, 1],
        repeat: 2,
        delay: 0 // Mulai bersamaan dengan animasi container
      }
    }
  };

  return (
    <motion.div
      className="h-full flex flex-col justify-start"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1
        className="text-xl font-bold mb-2"
        variants={itemVariants}
      >
        <motion.span
          variants={flickerVariants}
          initial="initial"
          animate="animate"
        >
          Muhammad Dimas
        </motion.span>
      </motion.h1>
      <motion.h2
        className="text-sm text-gray-600 mb-4"
        variants={itemVariants}
      >
        Web Developer & Visual Designer
      </motion.h2>
      <motion.p
        className="text-gray-500 mb-4 text-xs"
        variants={itemVariants}
      >
        a Junior Programmer and Digital Artist who's all about design,
      </motion.p>
      <motion.div
        className="flex gap-4 text-xs"
        variants={itemVariants}
      >
        {[
          { href: "https://github.com/klawcodes", text: "Github" },
          { href: "https://x.com/RIOTREVENGER", text: "X / Twitter" },
          { href: "https://instagram.com/riotrevenger", text: "Instagram" }
        ].map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="text-gray-900 hover:text-gray-500"
            variants={flickerVariants}
            initial="initial"
            animate="animate"
          >
            {link.text}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}