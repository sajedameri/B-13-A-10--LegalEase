"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TopLegalExperts() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const getExperts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/lawyers/top-experts`
        );

        const data = await res.json();

        setExperts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setExperts([]);
      }
    };

    getExperts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-20 px-5">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold">Top Legal Experts</h2>

        <p className="text-default-500 mt-3">
          Our most hired and trusted legal professionals.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {experts.map((lawyer, index) => (
          <motion.div
            key={lawyer._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <Card className="p-6 border shadow-lg rounded-2xl">
              <div className="flex flex-col items-center text-center">

                <Image
                  src={lawyer.photoURL}
                  alt={lawyer.name}
                  width={90}
                  height={90}
                  className="rounded-full object-cover border-4 border-blue-500"
                />

                <h3 className="mt-4 text-xl font-bold">
                  {lawyer.name}
                </h3>

                <p className="text-default-500">
                  {lawyer.specialization}
                </p>

                <div className="mt-4 flex gap-2 flex-wrap justify-center">

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    ⭐ {lawyer.rating}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    {lawyer.hireCount} Hires
                  </span>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
                    {lawyer.experience} Years
                  </span>

                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}