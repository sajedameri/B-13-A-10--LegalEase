"use client";

import { motion } from "framer-motion";

export default function SectionTitle() {

  return (

    <motion.div
      initial={{opacity:0,y:30}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:.7}}
      className="text-center"
    >

      <h2 className="text-4xl font-bold">
        Featured Lawyers
      </h2>

      <p className="mt-4 text-default-500 max-w-2xl mx-auto">

        Discover trusted and experienced lawyers from different legal
        categories to solve your legal problems.

      </p>

    </motion.div>

  );

}