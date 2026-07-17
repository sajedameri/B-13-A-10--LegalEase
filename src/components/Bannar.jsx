"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Chip, Card } from "@heroui/react"; // FIX: Removed the corrupted hidden space and trailing comma
import { ShieldCheck, ArrowRight, Star, Briefcase } from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  // Stagger Orchestration Matrix
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Slightly adjusted for faster, snappier reveal
      },
    },
  };

  // Individual Element Transits
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-slate-50 overflow-hidden min-h-[85vh] flex items-center">
      {/* Dynamic Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-100 blur-3xl opacity-40" />
        <div className="absolute top-52 -left-20 w-72 h-72 rounded-full bg-slate-200 blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Side: Content Roster Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show" // FIX: Replaced animate with whileInView to guarantee hydration sync
            viewport={{ once: true, margin: "-100px" }} // Triggers reliably exactly once when element enters frame
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Chip color="warning" variant="flat">
                <div className="flex items-center gap-2">
                  <ShieldCheck width={16} height={16} />
                  <span className="font-medium">Verified Legal Professionals</span>
                </div>
              </Chip>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900"
            >
              Find & Hire
              <br />
              <span className="text-amber-600">Expert Legal Counsel</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed"
            >
              Connect with trusted lawyers, explore legal services and hire
              professionals from anywhere with complete confidence.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                as={Link}
                href="/browse-lawyers"
                color="primary"
                size="lg"
                className="font-semibold"
                endContent={<ArrowRight width={18} height={18} />}
              >
                Browse Lawyers
              </Button>

              <Button
                as={Link}
                href="/signup"
                variant="bordered"
                size="lg"
                className="font-semibold"
              >
                Join as Lawyer
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex gap-10 border-t border-slate-200/60 pt-8"
            >
              <div className="flex items-center gap-3">
                <Briefcase width={26} height={26} className="text-amber-600" />
                <div>
                  <h4 className="font-bold text-slate-900">50+</h4>
                  <p className="text-sm text-slate-500">Practice Areas</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star
                      key={item}
                      width={16}
                      height={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">4.9/5</h4>
                  <p className="text-sm text-slate-500">Client Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Showcase Media Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative max-w-[460px] w-full">
              <Image
                src="/photo.webp"
                alt="Lawyer Representation Profile"
                width={460}
                height={460}
                priority
                className="rounded-2xl shadow-2xl w-full object-cover aspect-square bg-slate-200"
              />

              {/* Security Toast Badge */}
              {/* FIX: Removed duplicate wrapping <Card> layers to eliminate markup pollution */}
              <Card className="absolute -bottom-6 -left-6 bg-white shadow-xl flex flex-row items-center gap-4 px-5 py-3 border border-default-100">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <ShieldCheck width={20} height={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">100% Secure</p>
                  <p className="text-xs text-slate-500 font-medium">Stripe Protected</p>
                </div>
              </Card>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;