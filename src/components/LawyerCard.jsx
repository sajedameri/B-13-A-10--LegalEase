"use client";

import { motion } from "framer-motion";

export default function LawyerCard({
  lawyer,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="rounded-2xl border p-5 shadow"
    >
      <h2 className="text-xl font-semibold">
        {lawyer.name}
      </h2>

      <p>{lawyer.specialization}</p>
    </motion.div>
  );
}