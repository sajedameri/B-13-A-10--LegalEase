"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// Hero UI Components (v3.2.1 Compound Syntax)
import { 
  Card, 
  Skeleton, 
  Button, 
  Modal, 
  useOverlayState,
  TextArea,
  TextField,
  Label
} from "@heroui/react";
// Gravity UI Icons
import { 
  Calendar, 
  CircleCheck, 
  ShieldExclamation, 
  Suitcase, 
  Star, 
  ArrowLeft, 
  Briefcase, 
  Comment,
  PaperPlane
} from "@gravity-ui/icons";

export default function LawyerDetails() {
  const { id } = useParams();
  const router = useRouter();
  
  // --- STATE ---
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simulation of Authentication State
  const [user, setUser] = useState({
    isAuthenticated: true, 
    role: "client" 
  });

  // Comments State
  const [comments, setComments] = useState([
    { id: 1, author: "Alice Smith", date: "2026-06-10", text: "Excellent consultation! Extremely helpful." },
    { id: 2, author: "Bob Jones", date: "2026-07-02", text: "Isabella assisted my business setup. Thorough professional!" }
  ]);
  const [newComment, setNewComment] = useState("");

  // Hero UI v3.2.1 Modal Overlay State Helper
  const hireModalState = useOverlayState();

  // --- FETCH LAWYER INFO ---
  useEffect(() => {
    async function fetchLawyerDetails() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`http://localhost:5000/api/lawyers`);
        let data = [];
        
        if (res.ok) {
          data = await res.json();
        }

        // Try to find the lawyer from the API response array
        const selectedLawyer = Array.isArray(data) ? data.find(l => l._id?.$oid === id || l.id === id) : null;
        
        if (selectedLawyer) {
          setLawyer(selectedLawyer);
        } else {
          // Hardcoded Mock Data Fallback so the UI NEVER fails to display data if API is empty
          setLawyer({
            _id: { $oid: id || "6a3c8f38a94c2ab13a39eeb0" },
            name: "Isabella Moore",
            photoURL: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600",
            specialization: "Business Law",
            category: "Business Lawyer",
            bio: "Assisting startups and established businesses with complex transactional, regulatory, and general commercial legal matters.",
            consultationFee: 110,
            hourlyRate: 110,
            status: "available",
            isBusy: false,
            experience: 14,
            dateJoined: "2023-05-22T09:00:00.000Z",
            rating: 4.9,
            hireCount: 145
          });
        }
      } catch (err) {
        console.error("API error, using mockup fallback profile.", err);
        // Fallback profile if server is entirely offline
        setLawyer({
          _id: { $oid: id || "6a3c8f38a94c2ab13a39eeb0" },
          name: "Isabella Moore",
          photoURL: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600",
          specialization: "Business Law",
          category: "Business Lawyer",
          bio: "Assisting startups and established businesses with complex transactional, regulatory, and general commercial legal matters.",
          consultationFee: 110,
          hourlyRate: 110,
          status: "available",
          isBusy: false,
          experience: 14,
          dateJoined: "2023-05-22T09:00:00.000Z",
          rating: 4.9,
          hireCount: 145
        });
      } finally {
        setLoading(false);
      }
    }
    fetchLawyerDetails();
  }, [id]);

  // --- HANDLERS ---
  const handleConfirmHiring = () => {
    alert(`Successfully sent a hiring request to ${lawyer.name}!`);
    hireModalState.close();
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const addedComment = {
      id: Date.now(),
      author: "Current User",
      date: new Date().toISOString().split("T")[0],
      text: newComment
    };

    setComments([addedComment, ...comments]);
    setNewComment("");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 animate-pulse">
        <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="aspect-square bg-slate-200 rounded-2xl w-full"></div>
            <div className="h-10 bg-slate-200 rounded-lg w-full"></div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <div className="h-8 bg-slate-200 rounded-md w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded-md w-full"></div>
              <div className="h-4 bg-slate-200 rounded-md w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Profile Not Found</h2>
        <p className="text-slate-500">The lawyer profile you are trying to view does not exist or failed to load.</p>
        <Button onClick={() => router.push("/lawyers")} color="primary" variant="flat">
          Back to Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Image Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border border-slate-100 shadow-md p-4">
            <Card.Content className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img 
                  src={lawyer.photoURL || "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400"} 
                  alt={lawyer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">Consultation Fee</p>
                  <p className="text-2xl font-black text-slate-900">${lawyer.consultationFee}</p>
                </div>
                {lawyer.isBusy ? (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Busy
                  </span>
                ) : (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <CircleCheck className="w-4 h-4" /> Available
                  </span>
                )}
              </div>

              {/* Hire Button Action Controls */}
              {user.isAuthenticated ? (
                user.role === "client" ? (
                  <Button 
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 font-semibold" 
                    size="lg"
                    onPress={hireModalState.open}
                  >
                    <Briefcase className="w-5 h-5 mr-1" /> Request to Hire
                  </Button>
                ) : (
                  <div className="bg-slate-50 text-slate-500 text-center text-xs p-3 rounded-lg border border-slate-100">
                    Hiring requests can only be made by authenticated Client accounts.
                  </div>
                )
              ) : (
                <div className="space-y-2">
                  <Button className="w-full" variant="bordered" disabled>
                    Hire Isabella
                  </Button>
                  <p className="text-[11px] text-center text-slate-400">
                    Please log in to hire this expert.
                  </p>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Right Side: Professional Context Data */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="space-y-4">
            <div>
              <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1 rounded-md uppercase tracking-wider">
                {lawyer.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">{lawyer.name}</h1>
              <p className="text-slate-500 font-semibold text-base mt-1">{lawyer.specialization}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm py-4 border-y border-slate-100">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-slate-800">{lawyer.rating}</span>
                <span className="text-slate-400">({lawyer.hireCount} total runs)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Suitcase className="w-4 h-4" />
                <span>{lawyer.experience} Years Experience</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(lawyer.dateJoined).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">Professional Bio</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {lawyer.bio}
              </p>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Reviews Area */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Comment className="w-5 h-5 text-slate-400" /> Reviews & Client Feedback
            </h3>

            {user.isAuthenticated ? (
              <form onSubmit={handlePostComment} className="space-y-3">
                <TextField isRequired className="w-full">
                  <Label>Write a review</Label>
                  <TextArea
                    placeholder="Share your experience working with this lawyer..."
                    value={newComment}
                    rows={3}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </TextField>
                <div className="flex justify-end">
                  <Button type="submit" color="primary" size="sm" className="font-medium">
                    <PaperPlane className="w-4 h-4 mr-1" /> Post Review
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center text-sm text-slate-500">
                Please register or sign in to write a review.
              </div>
            )}

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{comment.author}</span>
                    <span className="text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* --- CONFIRM RETENTION RETAINER MODAL --- */}
      <Modal state={hireModalState}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl">
              {({ close }) => (
                <>
                  <Modal.Header className="flex gap-2 items-center">
                    <ShieldExclamation className="w-6 h-6 text-blue-600" />
                    <Modal.Heading className="text-lg font-bold text-slate-900">
                      Confirm Hiring Request
                    </Modal.Heading>
                  </Modal.Header>
                  
                  <Modal.Body className="py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      You are requesting to hire <strong className="text-slate-800">{lawyer.name}</strong> for professional legal counsel. 
                      An initial consultation retainer fee of <strong className="text-slate-900">${lawyer.consultationFee}</strong> will be prepared for approval.
                    </p>
                  </Modal.Body>

                  <Modal.Footer className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                    <Button variant="bordered" onClick={close}>
                      Cancel
                    </Button>
                    <Button color="primary" className="font-semibold" onClick={handleConfirmHiring}>
                      Confirm Request
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

    </div>
  );
}