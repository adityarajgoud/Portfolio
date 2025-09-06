import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Diamond3D } from "./Diamond3D";
import { Environment } from "@react-three/drei";

export const HeroDiamond = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={canvasRef}
      className="w-full flex justify-center z-50 pointer-events-none mb-4 md:mb-6"
      style={{ minHeight: 450 }} // force height so Canvas renders immediately
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        {/* Lights */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -5, 5]} intensity={1.5} />
        <spotLight position={[0, 5, 5]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="sunset" background={false} />

        {/* Diamond */}
        <Diamond3D />

        {/* Force render on mount */}
        <ForceRender />
      </Canvas>
    </div>
  );
};

// ForceRender: invalidates canvas on next animation frames
const ForceRender = () => {
  const { invalidate, gl } = useThree();

  useEffect(() => {
    let frame: number;

    const renderLoop = () => {
      invalidate();
      frame = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Stop after 1 second
    const timeout = setTimeout(() => cancelAnimationFrame(frame), 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [invalidate]);

  return null;
};
