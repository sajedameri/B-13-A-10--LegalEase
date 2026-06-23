"use client";

import { motion } from "framer-motion";

export default function BannerContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
      }}
      className="space-y-6"
    >
      <h1 className="text-5xl font-bold">
        Find & Hire Expert Legal Counsel
      </h1>

      <p className="text-lg text-gray-600">
        Connect with experienced lawyers and get
        professional legal support.
      </p>
    </motion.div>
  );
}