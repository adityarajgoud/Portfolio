import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

const FloatingElement = ({ position, color, type = 'sphere' }: { 
  position: [number, number, number], 
  color: string, 
  type?: 'sphere' | 'torus' | 'box' 
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group position={position}>
        {type === 'sphere' && (
          <Sphere ref={meshRef} args={[0.5, 32, 32]}>
            <meshStandardMaterial color={color} transparent opacity={0.8} emissive={color} emissiveIntensity={0.2} />
          </Sphere>
        )}
        {type === 'torus' && (
          <Torus ref={meshRef} args={[0.4, 0.15, 16, 100]}>
            <meshStandardMaterial color={color} transparent opacity={0.7} emissive={color} emissiveIntensity={0.3} />
          </Torus>
        )}
        {type === 'box' && (
          <Box ref={meshRef} args={[0.6, 0.6, 0.6]}>
            <meshStandardMaterial color={color} transparent opacity={0.6} emissive={color} emissiveIntensity={0.1} />
          </Box>
        )}
      </group>
    </Float>
  );
};

export const Section3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00d4ff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#8b5cf6" />
        
        <FloatingElement position={[-3, 2, -2]} color="#00d4ff" type="sphere" />
        <FloatingElement position={[3, -1, -1]} color="#8b5cf6" type="torus" />
        <FloatingElement position={[0, 3, -3]} color="#ff006e" type="box" />
        <FloatingElement position={[-2, -2, -2]} color="#00ff88" type="torus" />
        <FloatingElement position={[4, 2, -4]} color="#ffaa00" type="sphere" />
      </Canvas>
    </div>
  );
};