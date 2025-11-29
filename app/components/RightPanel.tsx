"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RightPanel({ onGenerate, onSelectStyle }: any) {
  const [prompt, setPrompt] = useState("");

  const styles = [
    "Watercolor painting",
    "Children crayon style",
    "Soft pastel art",
    "Pencil sketch",
    "Neon line art",
  ];

  return (
    <div className="p-5 flex flex-col gap-5 bg-white shadow-xl h-full rounded-3xl border border-gray-200">

      <h2 className="text-xl font-bold text-[#222]">AI Art Generator</h2>

      <textarea
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Describe what you want to create..."
  className="min-h-[120px] p-3 rounded-xl border bg-white text-black placeholder-gray-600 focus:outline-none"
/>


      <button
        onClick={() => onGenerate(prompt)}
        className="py-3 rounded-xl bg-[#A5D8FF] text-[#222] font-semibold shadow hover:scale-[1.02] transition"
      >
        Generate Art
      </button>

      <h3 className="font-semibold mt-2">Try a style</h3>

      <div className="grid grid-cols-1 gap-2">
        {styles.map((s) => (
          <motion.button
            whileHover={{ scale: 1.04 }}
            key={s}
            onClick={() => onSelectStyle(s)}
            className="p-2 rounded-xl bg-[#FFE685] text-[#222] shadow"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
