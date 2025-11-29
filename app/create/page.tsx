"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// YOUR EXISTING COMPONENTS
import SiteHeader from "../components/SiteHeader";       // ✔ Navbar
//import Footer from "../components/Footer";               // ✔ Contact/Footer Section
import CanvasBoard from "../components/CanvasBoard";     // ✔ Drawing Canvas
import RightPanel from "../components/RightPanel";       // ✔ Prompt + Style Panel


export default function CreatePage() {
  const [activeTab, setActiveTab] = useState("generate");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stylizeSource, setStylizeSource] = useState<string | null>(null);

  /** -------------------------------------------------
   *  AI GENERATE (FREE — Pollinations API)
   * ------------------------------------------------- */
  const generateArt = async (prompt: string) => {
    if (!prompt) return;
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setGeneratedImage(data.image);
    } catch (err) {
      console.error("Generation error:", err);
    }

    setLoading(false);
  };


  /** -------------------------------------------------
   *  STYLIZE (REGENERATE USING STYLE DESCRIPTION)
   * ------------------------------------------------- */
  const stylizeWithAI = async (style: string) => {
    setLoading(true);

    try {
      // V2 STYLIZE — now ALWAYS works (with or without drawing)
      const prompt = `${style}, children-friendly illustration, pastel kid-art style, soft colors, cute shapes, clean outlines`;

      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setGeneratedImage(data.image);
      setActiveTab("generate");

    } catch (err) {
      console.error("Stylize error:", err);
    }

    setLoading(false);
  };


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FFF6F2] via-[#FFFFFF] to-[#FFF2DC]">

      {/* ⭐ NAVBAR / HEADER */}
      <SiteHeader variant="journey" />


      {/* ⭐ PAGE CONTAINER (Same as Journey / Why We Exist) */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-32 pb-24 flex gap-6">

        {/* ---------------- LEFT TOOLBAR ---------------- */}
        <div className="w-20 bg-white shadow-xl rounded-3xl h-[82vh] flex flex-col justify-between items-center py-6">
          
          <div className="flex flex-col gap-6 mt-5">

            {/* Generate */}
            <div
              onClick={() => setActiveTab("generate")}
              className={`cursor-pointer p-3 text-2xl rounded-2xl transition ${
                activeTab === "generate" ? "bg-[#FFD4C8] shadow-lg" : "bg-gray-100"
              }`}
            >
              🎨
            </div>

            {/* Draw */}
            <div
              onClick={() => setActiveTab("draw")}
              className={`cursor-pointer p-3 text-2xl rounded-2xl transition ${
                activeTab === "draw" ? "bg-[#FFE685] shadow-lg" : "bg-gray-100"
              }`}
            >
              ✏️
            </div>

            {/* Stylize */}
            <div
              onClick={() => setActiveTab("stylize")}
              className={`cursor-pointer p-3 text-2xl rounded-2xl transition ${
                activeTab === "stylize" ? "bg-[#A5D8FF] shadow-lg" : "bg-gray-100"
              }`}
            >
              ✨
            </div>

          </div>

        </div>


        {/* ---------------- CENTER WORKSPACE ---------------- */}
        <div className="flex-1 p-4 flex items-center justify-center relative h-[82vh]">

          {/* DRAW TAB */}
          {activeTab === "draw" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full"
            >
              <CanvasBoard
                sendToStylize={(img: string) => {
                  setStylizeSource(img);
                  setActiveTab("stylize");
                }}
              />
            </motion.div>
          )}

          {/* GENERATE TAB */}
          {activeTab === "generate" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              {loading && (
                <div className="text-lg font-semibold text-gray-600">
                  Magic is happening… ✨
                </div>
              )}

              {!loading && generatedImage && (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={generatedImage}
                    className="max-h-[60vh] rounded-3xl shadow-2xl"
                  />

                  {/* ⭐ Download Button — fixed color */}
                  <a
                    href={generatedImage}
                    download="durlabhclap-creation.png"
                    className="px-6 py-3 bg-[#FFB7A5] text-[#222] font-semibold rounded-xl shadow-lg hover:scale-105 transition"
                  >
                    Download Art
                  </a>
                </div>
              )}

              {!generatedImage && !loading && (
                <div className="text-gray-600 text-xl">
                  Generate something magical 🎨
                </div>
              )}
            </motion.div>
          )}

          {/* STYLIZE TAB */}
          {activeTab === "stylize" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              {!stylizeSource && (
                <div className="text-gray-600">
                  Choose a style on the right →  
                </div>
              )}

              {stylizeSource && (
                <>
                  <img
                    src={stylizeSource}
                    className="max-h-[50vh] rounded-3xl shadow-xl"
                  />
                  <p className="text-gray-600 mt-4">
                    Now choose style from the right →
                  </p>
                </>
              )}
            </motion.div>
          )}

        </div>


        {/* ---------------- RIGHT PANEL ---------------- */}
        <div className="w-[320px]">

          {activeTab === "generate" && (
            <RightPanel
              onGenerate={generateArt}
              onSelectStyle={(style: string) => generateArt(style)}
            />
          )}

          {activeTab === "stylize" && (
            <RightPanel
              onGenerate={() => {}}
              onSelectStyle={stylizeWithAI}
            />
          )}

        </div>
      </main>


      {/* ⭐ FOOTER / CONTACT SECTION */}
      {/* INLINE FOOTER (No import needed) */}
<footer className="w-full bg-[#FAFAFA] border-t border-gray-200 mt-12">
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* LEFT SECTION */}
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        Durlabhclap Foundation
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Protecting creativity & making learning joyful through 
        an arts-based approach aligned with NEP 2020.
      </p>
    </div>

    {/* MIDDLE SECTION */}
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Contact</h3>
      <p className="text-gray-600">📍 Himachal Pradesh, India</p>
      <p className="text-gray-600">📧 contact@durlabhclapfoundation.org</p>
      <p className="text-gray-600">📞 +91-9876543210</p>
    </div>

    {/* RIGHT SECTION */}
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Social</h3>
      <div className="flex gap-4 text-gray-600">
        <a href="#" className="hover:text-black transition">Instagram</a>
        <a href="#" className="hover:text-black transition">YouTube</a>
        <a href="#" className="hover:text-black transition">Facebook</a>
      </div>
    </div>

  </div>

  <div className="border-t border-gray-300 py-4 text-center text-gray-500">
    © {new Date().getFullYear()} Durlabhclap Foundation — All Rights Reserved.
  </div>
</footer>


    </div>
  );
}
