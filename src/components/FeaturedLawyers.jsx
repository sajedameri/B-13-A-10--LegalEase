"use client";

import React, { useState, useEffect } from "react";
import { Card, Button, Chip, Skeleton } from "@heroui/react"; 
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { StarFill, Briefcase, Eye } from "@gravity-ui/icons";

// Framer Motion Animation Variants Matrix
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function FeaturedLawyers() {
  const router = useRouter(); 
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic featured roster from database endpoint
  useEffect(() => {
    const fetchFeaturedLawyers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/lawyers/featured");
        if (!response.ok) {
          throw new Error("Failed to capture legal profile data arrays.");
        }
        const data = await response.json();
        
        // Ensure data is always treated as an array
        setLawyers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedLawyers();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-12 overflow-hidden bg-background">
      
      {/* Animated Hero Header Setup */}
      <motion.div 
        className="text-center space-y-3 max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <Chip variant="flat" color="primary" size="sm" className="font-semibold uppercase tracking-wider px-3">
          Top Rated Advisors
        </Chip>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Featured Legal Practitioners
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Connect instantly with vetted specialized attorneys randomly selected or assigned to support your structural legal actions today.
        </p>
      </motion.div>

      {/* Loading Skeletal Grid Framework */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <Card key={idx} className="w-full h-[380px] p-5 space-y-4 border border-divider/60">
              <div className="flex items-center gap-3">
                <Skeleton className="w-14 h-14 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-3 w-1/2 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-24 w-full rounded-xl" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-1/3 rounded-lg" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Backend API Runtime Error Catch State */}
      {!loading && error && (
        <div className="text-center py-12 border border-dashed border-danger/30 rounded-2xl bg-danger-50/10">
          <p className="text-sm text-danger font-medium">Error loading grid: {error}</p>
          <Button size="sm" variant="flat" color="danger" className="mt-4 font-semibold" onPress={() => window.location.reload()}>
            Retry Core Handshake
          </Button>
        </div>
      )}

      {/* Complete Data Driven Animated Rendering Matrix */}
      {!loading && !error && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {lawyers.map((lawyer) => {
            // Defensive Data Normalization Checklist
            const secureId = lawyer?._id?.$oid || lawyer?._id || Math.random().toString();
            const fallbackImage = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150";
            const currentRating = typeof lawyer?.rating === "number" ? lawyer.rating : parseFloat(lawyer?.rating || 0);

            return (
              <motion.div
                key={secureId}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2, ease: "easeInOut" } }}
                className="h-full"
              >
                <Card className="h-full border border-divider/60 hover:border-primary/40 bg-content1 shadow-xs hover:shadow-md transition-shadow duration-3xl flex flex-col justify-between p-5 overflow-visible">
                  
                  {/* Content Body Container */}
                  <div className="p-0 space-y-4 min-w-0 flex-grow">
                    
                    {/* Upper Identity Panel Section */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* FIX: Reverted back to a safe standard <img> to avoid Next.js domain authorization issues */}
                        <img
                          src={lawyer?.photoURL || fallbackImage}
                          alt={lawyer?.name || "Practitioner"}
                          className="w-14 h-14 rounded-xl object-cover border border-divider/60 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImage;
                          }}
                        />
                        <div className="flex flex-col min-w-0">
                          <h3 className="font-bold text-base text-foreground tracking-tight truncate">
                            {lawyer?.name || "Anonymous Lawyer"}
                          </h3>
                          <span className="text-xs font-semibold text-primary truncate mt-0.5">
                            {lawyer?.category || "General Practice"}
                          </span>
                        </div>
                      </div>

                      <Chip 
                        size="sm" 
                        variant="flat" 
                        color={lawyer?.status === "available" ? "success" : "warning"}
                        className="capitalize font-bold text-[10px] tracking-wide border-none h-5 shrink-0"
                      >
                        {lawyer?.status || "unavailable"}
                      </Chip>
                    </div>

                    {/* Meta Qualifications Row Segment */}
                    <div className="flex items-center gap-4 text-xs font-medium text-default-600 bg-default-50 py-1.5 px-3 rounded-lg border border-default-100">
                      <div className="flex items-center gap-1">
                        <StarFill width={13} height={13} className="text-warning" />
                        {/* FIX: Protected parsing protects against application properties breakage */}
                        <span className="font-mono font-bold text-foreground">{currentRating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-[10px]">({lawyer?.hireCount || 0})</span>
                      </div>
                      <div className="w-px h-3 bg-divider" />
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase width={13} height={13} className="text-default-400" />
                        <span className="text-foreground font-semibold">{lawyer?.experience || 0} Yrs</span> Exp
                      </div>
                    </div>

                    {/* Biography Abstract Layer */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {lawyer?.bio || "No professional overview summary listed for this advisor."}
                    </p>
                  </div>

                  {/* Pricing Matrix & Call-to-Action Footer Panel */}
                  <div className="mt-6 pt-4 border-t border-divider/60 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-0.5">
                        <span className="font-mono text-base font-black text-foreground">${lawyer?.hourlyRate || 0}</span>
                        <span className="text-[10px] text-muted-foreground">/hr</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">Consultation Fee: ${lawyer?.consultationFee || 0}</span>
                    </div>

                    <Button
                      size="sm"
                      variant="solid"
                      color="primary"
                      className="font-semibold text-xs flex items-center gap-1.5 px-4 shadow-xs"
                      onPress={() => router.push(`/lawyers/${secureId}`)}
                    >
                      <Eye width={14} height={14} />
                      View Profile
                    </Button>
                  </div>

                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}