"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Hero UI Components (v3.2.1 Compound Syntax)
import { 
  TextField, 
  Select, 
  Label, 
  ListBox, 
  Card, 
  Skeleton,
  Button
} from "@heroui/react";
// Gravity UI Icons (Updated MagnifyingGlass to Magnifier)
import { Magnifier, Funnel, ArrowUpArrowDown, Person, CircleCheck } from "@gravity-ui/icons";

export default function BrowseLawyers() {
  const router = useRouter();

  // --- STATE ---
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- FILTER & SORT STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");

  // --- FETCH LAWYERS FROM BACKEND ---
  useEffect(() => {
    async function fetchLawyers() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/lawyers");
        if (!res.ok) throw new Error("Failed to load lawyers.");
        const data = await res.json();
        setLawyers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLawyers();
  }, []);

  // --- FILTER & SORT LOGIC ---
  const filteredAndSortedLawyers = lawyers
    .filter((lawyer) => {
      // Search Match
      const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Specialization Match
      const matchesSpec = selectedSpecialization === "all" || 
                          lawyer.specialization.toLowerCase() === selectedSpecialization.toLowerCase();

      return matchesSearch && matchesSpec;
    })
    .sort((a, b) => {
      if (selectedSort === "price-low") return a.hourlyRate - b.hourlyRate;
      if (selectedSort === "price-high") return b.hourlyRate - a.hourlyRate;
      if (selectedSort === "rating") return b.rating - a.rating;
      return 0; // Default sorting
    });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      
      {/* Header Content */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore Legal Experts</h1>
        <p className="text-slate-500 text-sm md:text-base">
          Find, compare, and connect with verified legal professionals worldwide.
        </p>
      </div>

      {/* --- FILTERS & CONTROLS --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-2xl border border-slate-100">
        
        {/* Search Input */}
        <div className="md:col-span-5 flex flex-col gap-1">
          <Label className="text-xs font-semibold text-slate-600">Search</Label>
          <TextField className="w-full">
            <span className="pl-3 text-slate-400">
              {/* Updated Magnifier Icon here */}
              <Magnifier className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search by name, expertise..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-sm px-2 py-2"
            />
          </TextField>
        </div>

        {/* Specialization Select */}
        <div className="md:col-span-3 flex flex-col gap-1">
          <Label className="text-xs font-semibold text-slate-600">Specialization</Label>
          <Select
            placeholder="All Specialties"
            value={selectedSpecialization}
            onChange={(val) => setSelectedSpecialization(val || "all")}
          >
            <Select.Trigger className="w-full flex justify-between items-center bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <span className="flex items-center gap-2">
                <Funnel className="w-4 h-4 text-slate-400" />
                <Select.Value />
              </span>
            </Select.Trigger>
            <Select.Popover className="bg-white border border-slate-100 rounded-lg shadow-xl p-1 z-50">
              <ListBox>
                <ListBox.Item id="all" textValue="All Specialties">All Specialties</ListBox.Item>
                <ListBox.Item id="Business Law" textValue="Business Law">Business Law</ListBox.Item>
                <ListBox.Item id="Family Law" textValue="Family Law">Family Law</ListBox.Item>
                <ListBox.Item id="Criminal Defense" textValue="Criminal Defense">Criminal Defense</ListBox.Item>
                <ListBox.Item id="Civil Litigation" textValue="Civil Litigation">Civil Litigation</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Sort Select */}
        <div className="md:col-span-4 flex flex-col gap-1">
          <Label className="text-xs font-semibold text-slate-600">Sort By</Label>
          <Select
            placeholder="Default sorting"
            value={selectedSort}
            onChange={(val) => setSelectedSort(val || "default")}
          >
            <Select.Trigger className="w-full flex justify-between items-center bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <span className="flex items-center gap-2">
                <ArrowUpArrowDown className="w-4 h-4 text-slate-400" />
                <Select.Value />
              </span>
            </Select.Trigger>
            <Select.Popover className="bg-white border border-slate-100 rounded-lg shadow-xl p-1 z-50">
              <ListBox>
                <ListBox.Item id="default" textValue="Default">Default</ListBox.Item>
                <ListBox.Item id="price-low" textValue="Hourly Rate: Low to High">Hourly Rate: Low to High</ListBox.Item>
                <ListBox.Item id="price-high" textValue="Hourly Rate: High to Low">Hourly Rate: High to Low</ListBox.Item>
                <ListBox.Item id="rating" textValue="Top Rated">Top Rated</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

      </div>

      {/* --- MAIN GRID CONTENT --- */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="p-4 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-16 h-6 rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-3/4 h-5 rounded" />
                <Skeleton className="w-1/2 h-4 rounded" />
              </div>
              <div className="pt-2">
                <Skeleton className="w-full h-9 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-rose-50 border border-rose-100 rounded-2xl text-rose-600">
          <p className="font-semibold">{error}</p>
        </div>
      ) : filteredAndSortedLawyers.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Person className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No Legal Counsel Found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            We couldn't find any lawyers matching your exact search criteria. Try modifying your filter choices.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedLawyers.map((lawyer) => (
            <Card 
              key={lawyer._id.$oid}
              className="flex flex-col border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden p-4 group"
              onClick={() => router.push(`/dashboard/lawyer/${lawyer._id.$oid}`)}
            >
              <Card.Content className="flex flex-col justify-between h-full space-y-4">
                
                <div className="flex justify-between items-start w-full">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner">
                    <img 
                      src={lawyer.photoURL || "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150"} 
                      alt={lawyer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {lawyer.isBusy ? (
                    <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Fully Booked
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <CircleCheck className="w-3 h-3" /> Available
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                    {lawyer.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    {lawyer.specialization}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span className="text-amber-500 font-bold">★ {lawyer.rating}</span>
                    <span>({lawyer.hireCount || 0} cases)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Rate / hr</span>
                    <span className="text-base font-bold text-slate-800">${lawyer.hourlyRate}</span>
                  </div>
                  <Button size="sm" color="primary" variant="flat" className="text-xs font-medium px-4">
                    View Bio
                  </Button>
                </div>

              </Card.Content>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}