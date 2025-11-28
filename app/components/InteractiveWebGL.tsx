"use client";

import { useEffect, useRef } from "react";

export default function InteractiveWebGL({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
    if (!gl) return;

    const vert = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // Lightweight “liquid” shader (mouse + time). No textures, no deps.
    const frag = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_intensity;

      float hash(vec2 p){
        p = fract(p*vec2(123.34, 456.21));
        p += dot(p, p+78.233);
        return fract(p.x*p.y);
      }

      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0,0.0));
        float c = hash(i + vec2(0.0,1.0));
        float d = hash(i + vec2(1.0,1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);

        // mouse is in [0..1]
        vec2 m = u_mouse * 2.0 - 1.0;
        float t = u_time * 0.55;

        // swirl distortion
        float r = length(p - m*0.25);
        float a = atan(p.y - m.y*0.25, p.x - m.x*0.25);
        float swirl = 0.25 * u_intensity / (0.35 + r);
        a += swirl * sin(t + r*6.0);
        vec2 q = vec2(cos(a), sin(a)) * r;

        // flowing bands + noise
        float n = noise(q*3.0 + t*0.75);
        float bands = sin((q.x*3.2 + q.y*2.1) * 2.0 + t*2.0) * 0.5 + 0.5;
        float f = mix(n, bands, 0.6);

        // cyberpunk-ish palette
        vec3 c1 = vec3(0.12, 0.85, 0.95); // cyan
        vec3 c2 = vec3(0.98, 0.35, 0.52); // pink
        vec3 c3 = vec3(0.75, 0.95, 0.25); // lime highlight

        float glow = smoothstep(0.85, 0.15, r) * 0.45;
        vec3 col = mix(c1, c2, f);
        col = mix(col, c3, 0.12 * sin(t + f*6.28) + 0.12);
        col += glow * (0.25 + 0.75*f);

        // transparent background (so it blends with your UI)
        float alpha = 0.22 * u_intensity;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.warn(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.warn(gl.getProgramInfoLog(program));
      return;
    }

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // fullscreen triangle strip (2 triangles)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_pos");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    let mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: clamp01((e.clientX - rect.left) / rect.width),
        y: clamp01(1 - (e.clientY - rect.top) / rect.height),
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.floor(canvas.clientWidth * ratio);
      const h = Math.floor(canvas.clientHeight * ratio);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    const start = performance.now();
    const draw = () => {
      resize();

      const now = performance.now();
      const t = (now - start) / 1000;

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIntensity, intensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove as any);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ pointerEvents: "none" }} // important: never block clicks
    />
  );
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
