import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, Ring, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';
import MouseFollowerMan from './MouseFollowerMan';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <Sphere 
        ref={meshRef} 
        args={[1, 100, 200]} 
        scale={2.5}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#ff006e" : "#00d4ff"}
          attach="material"
          distort={hovered ? 0.6 : 0.3}
          speed={hovered ? 4 : 2}
          roughness={0.1}
          metalness={0.9}
          emissive={hovered ? "#ff006e" : "#00d4ff"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Sphere>
    </Float>
  );
};

const FloatingGeometry = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position}>
        <Torus ref={meshRef} args={[0.5, 0.2, 16, 100]}>
          <meshStandardMaterial color={color} transparent opacity={0.7} emissive={color} emissiveIntensity={0.2} />
        </Torus>
      </group>
    </Float>
  );
};

const InteractiveRings = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <Ring key={i} args={[2 + i * 0.5, 2.1 + i * 0.5, 64]}>
          <meshStandardMaterial 
            color={i === 0 ? "#00d4ff" : i === 1 ? "#8b5cf6" : "#ff006e"} 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </Ring>
      ))}
    </group>
  );
};

const ParticleField = () => {
  const points = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Mouse interaction
      points.current.rotation.x += mouse.y * 0.01;
      points.current.rotation.y += mouse.x * 0.01;
    }
  });

  const particlesPosition = new Float32Array(3000 * 3);
  const particlesColor = new Float32Array(3000 * 3);
  
  for (let i = 0; i < 3000; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 15;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 15;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 15;
    
    // Random colors
    const colors = [[0, 0.83, 1], [0.55, 0.36, 0.96], [1, 0, 0.43]];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particlesColor[i * 3] = color[0];
    particlesColor[i * 3 + 1] = color[1];
    particlesColor[i * 3 + 2] = color[2];
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesColor.length / 3}
          array={particlesColor}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors />
    </points>
  );
};

const FloatingCubes = () => {
  const cubes = [...Array(8)].map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ] as [number, number, number],
    speed: 0.5 + Math.random() * 0.5,
    color: i % 2 === 0 ? "#00d4ff" : "#8b5cf6"
  }));

  return (
    <>
      {cubes.map((cube, i) => (
        <FloatingCube key={i} {...cube} />
      ))}
    </>
  );
};

const FloatingCube = ({ position, speed, color }: { position: [number, number, number], speed: number, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 2;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.3, 0.3, 0.3]}>
      <meshStandardMaterial color={color} transparent opacity={0.6} emissive={color} emissiveIntensity={0.1} />
    </Box>
  );
};

export const Hero3D = () => {
  console.log('Hero3D component rendering');
  
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
        onCreated={() => console.log('3D Canvas created successfully')}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00d4ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ff006e" />
        
        <ParticleField />
        <AnimatedSphere />
        <InteractiveRings />
        <MouseFollowerMan />
        <FloatingGeometry position={[-5, 2, -3]} color="#00d4ff" speed={0.8} />
        <FloatingGeometry position={[5, -2, -2]} color="#8b5cf6" speed={1.2} />
        <FloatingGeometry position={[3, 3, -4]} color="#ff006e" speed={0.6} />
        <FloatingCubes />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};