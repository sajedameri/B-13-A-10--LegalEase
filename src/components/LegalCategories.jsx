"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";

const categories = [
  {
    name: "Family",
    slug: "Family Lawyer",
    icon: "👨‍👩‍👧",
  },
  {
    name: "Criminal",
    slug: "Criminal Lawyer",
    icon: "⚖️",
  },
  {
    name: "Business",
    slug: "Business Lawyer",
    icon: "💼",
  },
  {
    name: "Corporate",
    slug: "Corporate Lawyer",
    icon: "🏢",
  },
  {
    name: "Civil",
    slug: "Civil Lawyer",
    icon: "📜",
  },
  {
    name: "Immigration",
    slug: "Immigration Lawyer",
    icon: "🌍",
  },
  {
    name: "Employment",
    slug: "Employment Lawyer",
    icon: "👔",
  },
  {
    name: "Property",
    slug: "Property Lawyer",
    icon: "🏠",
  },
];
export default function LegalCategories() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-5">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold">Legal Categories</h2>

        <p className="text-default-500 mt-3">
          Browse lawyers by their legal expertise.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.03 }}
          >
            <Link
              href={`/browse-lawyers?category=${encodeURIComponent(
                category.slug
              )}`}
            >
              <Card className="cursor-pointer border shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center">
                <div className="text-5xl mb-4">{category.icon}</div>

                <h3 className="text-xl font-semibold">
                  {category.name}
                </h3>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}