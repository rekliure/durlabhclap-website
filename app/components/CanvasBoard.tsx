"use client";

import { useRef, useState, useEffect } from "react";
import { pastelColors } from "../utils/pastel";

export default function CanvasBoard({ sendToStylize }: any) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState(pastelColors.peach);
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  const startDraw = (e: any) => {
    setDrawing(true);
    draw(e);
  };

  const endDraw = () => {
    setDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
  };

  const draw = (e: any) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    sendToStylize(url);
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      {/* TOOLBAR */}
      <div className="flex items-center justify-between bg-white shadow p-3 rounded-xl">
        <div className="flex gap-3 items-center">
          {/* Color Picker */}
          {Object.values(pastelColors).map((c) =>
            c !== pastelColors.white && c !== pastelColors.dark ? (
              <div
                key={c}
                onClick={() => setBrushColor(c)}
                className="w-6 h-6 rounded-full cursor-pointer border"
                style={{ backgroundColor: c }}
              />
            ) : null
          )}

          {/* Brush size */}
          <input
            type="range"
            min={2}
            max={20}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-300 rounded-lg"
          >
            Clear
          </button>
          <button
            onClick={exportImage}
            className="px-4 py-2 bg-green-300 rounded-lg"
          >
            Send to Stylize
          </button>
        </div>
      </div>

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
        onTouchStart={startDraw}
        onTouchEnd={endDraw}
        onTouchMove={draw}
        className="w-full h-full rounded-xl bg-white shadow-inner"
      />
    </div>
  );
}
