import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Diamond3D: React.FC = () => {
  const ref = useRef<any>(null);
  const { mouse } = useThree();
  const { scene } = useGLTF("/models/diamond.glb") as any;

  // Apply metallic/glass silver material
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhysicalMaterial({
        color: 0xc0c0c0, // silver color
        metalness: 1, // fully metallic
        roughness: 0, // smooth surface
        clearcoat: 1, // glossy finish
        clearcoatRoughness: 0,
        reflectivity: 1,
        transparent: false, // solid silver look
      });
    }
  });

  // Rotate + floating animation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x +=
        (mouse.y * Math.PI - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y +=
        (mouse.x * Math.PI - ref.current.rotation.y) * 0.05;
      ref.current.position.y = 0.25 * Math.sin(Date.now() / 600); // floating
    }
  });

  return <primitive ref={ref} object={scene} scale={2} />;
};

useGLTF.preload("/models/diamond.glb");
