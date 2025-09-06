import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Simple 3D man made of geometric shapes
const MouseFollowerMan = () => {
  console.log('MouseFollowerMan component rendering');
  
  const manRef = useRef<THREE.Group>(null!);
  const { mouse, viewport } = useThree();
  
  useFrame((state) => {
    if (manRef.current) {
      // Convert mouse position to 3D world coordinates
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      // Smooth following with lerp
      manRef.current.position.x = THREE.MathUtils.lerp(manRef.current.position.x, x * 0.5, 0.05);
      manRef.current.position.y = THREE.MathUtils.lerp(manRef.current.position.y, y * 0.5, 0.05);
      
      // Rotation based on mouse movement
      manRef.current.rotation.y = THREE.MathUtils.lerp(manRef.current.rotation.y, mouse.x * 0.5, 0.05);
      manRef.current.rotation.x = THREE.MathUtils.lerp(manRef.current.rotation.x, mouse.y * 0.3, 0.05);
      manRef.current.rotation.z = THREE.MathUtils.lerp(manRef.current.rotation.z, mouse.x * 0.2, 0.05);

      // Additional floating animation
      manRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={manRef}>
      {/* Head */}
      <Sphere position={[0, 1.5, 0]} args={[0.3, 32, 32]}>
        <meshStandardMaterial 
          color="#ffdbac" 
          emissive="#ff6b6b" 
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Eyes */}
      <Sphere position={[-0.1, 1.6, 0.25]} args={[0.05, 16, 16]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere position={[0.1, 1.6, 0.25]} args={[0.05, 16, 16]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      
      {/* Body */}
      <Cylinder position={[0, 0.5, 0]} args={[0.25, 0.35, 1.2, 8]}>
        <meshStandardMaterial 
          color="#4ecdc4" 
          emissive="#00d4ff" 
          emissiveIntensity={0.1}
        />
      </Cylinder>
      
      {/* Arms */}
      <Cylinder position={[-0.6, 0.8, 0]} args={[0.08, 0.08, 0.8, 8]} rotation={[0, 0, 0.3]}>
        <meshStandardMaterial 
          color="#ffdbac" 
          emissive="#ff6b6b" 
          emissiveIntensity={0.05}
        />
      </Cylinder>
      <Cylinder position={[0.6, 0.8, 0]} args={[0.08, 0.08, 0.8, 8]} rotation={[0, 0, -0.3]}>
        <meshStandardMaterial 
          color="#ffdbac" 
          emissive="#ff6b6b" 
          emissiveIntensity={0.05}
        />
      </Cylinder>
      
      {/* Hands */}
      <Sphere position={[-0.9, 0.4, 0]} args={[0.12, 16, 16]}>
        <meshStandardMaterial 
          color="#ffdbac" 
          emissive="#8b5cf6" 
          emissiveIntensity={0.1}
        />
      </Sphere>
      <Sphere position={[0.9, 0.4, 0]} args={[0.12, 16, 16]}>
        <meshStandardMaterial 
          color="#ffdbac" 
          emissive="#8b5cf6" 
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Legs */}
      <Cylinder position={[-0.2, -0.6, 0]} args={[0.1, 0.1, 0.8, 8]}>
        <meshStandardMaterial 
          color="#2c3e50" 
          emissive="#00d4ff" 
          emissiveIntensity={0.05}
        />
      </Cylinder>
      <Cylinder position={[0.2, -0.6, 0]} args={[0.1, 0.1, 0.8, 8]}>
        <meshStandardMaterial 
          color="#2c3e50" 
          emissive="#00d4ff" 
          emissiveIntensity={0.05}
        />
      </Cylinder>
      
      {/* Feet */}
      <Box position={[-0.2, -1.1, 0.1]} args={[0.15, 0.1, 0.3]}>
        <meshStandardMaterial 
          color="#000000" 
          emissive="#ff006e" 
          emissiveIntensity={0.1}
        />
      </Box>
      <Box position={[0.2, -1.1, 0.1]} args={[0.15, 0.1, 0.3]}>
        <meshStandardMaterial 
          color="#000000" 
          emissive="#ff006e" 
          emissiveIntensity={0.1}
        />
      </Box>
      
      {/* Floating energy rings around the character */}
      <group>
        <Torus position={[0, 0.5, 0]} args={[1.2, 0.05, 8, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.3}
            emissive="#00d4ff" 
            emissiveIntensity={0.5}
          />
        </Torus>
        <Torus position={[0, 0.5, 0]} args={[1.5, 0.03, 8, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            transparent 
            opacity={0.2}
            emissive="#8b5cf6" 
            emissiveIntensity={0.4}
          />
        </Torus>
      </group>
    </group>
  );
};

export default MouseFollowerMan;