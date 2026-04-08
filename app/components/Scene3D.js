"use client"

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Octahedron, Dodecahedron, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function FloatingShape({ position, color, type = "sphere", size = 1, scrollProgress }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Map scroll progress to subtle transformations
  const rotationOffset = useTransform(scrollProgress, [0, 1], [0, Math.PI * 4]);
  const yOffset = useTransform(scrollProgress, [0, 1], [0, 15]);
  const xOffset = useTransform(scrollProgress, [0, 1], [0, -5]);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation - autonomous + subtle mouse reaction
      meshRef.current.rotation.x += 0.005 + (hovered ? 0.01 : 0);
      meshRef.current.rotation.z += 0.005;
      
      // Target position based on mouse (parallax) + Scroll position
      const targetPulseX = position[0] + (state.pointer.x * 2) + xOffset.get();
      const targetPulseY = position[1] + (state.pointer.y * 2) + yOffset.get();
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPulseX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPulseY, 0.05);

      // Apply scroll rotation too
      meshRef.current.rotation.y += rotationOffset.get() * 0.001;

      // Subtle tilt towards mouse
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.pointer.x * 0.5, 0.1);
      
      // Scaling reaction
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, (clicked ? 1.5 : hovered ? 1.2 : 1), 0.1));
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  const renderShape = () => {
    const commonProps = {
      ref: meshRef,
      position: position,
      onPointerEnter: () => setHover(true),
      onPointerLeave: () => setHover(false),
      onClick: handleClick,
    };

    switch (type) {
      case "octahedron":
        return (
          <Octahedron {...commonProps} args={[size, 0]}>
            <MeshWobbleMaterial color={color} speed={2} factor={0.5} />
          </Octahedron>
        );
      case "dodecahedron":
        return (
          <Dodecahedron {...commonProps} args={[size, 0]}>
            <MeshDistortMaterial color={color} speed={1} distort={0.3} radius={1} />
          </Dodecahedron>
        );
      case "torus":
        return (
          <Torus {...commonProps} args={[size, 0.4, 16, 100]}>
            <MeshWobbleMaterial color={color} speed={1.5} factor={0.6} />
          </Torus>
        );
      default:
        return (
          <Sphere {...commonProps} args={[size, 64, 64]}>
            <MeshDistortMaterial color={color} speed={2} distort={0.4} radius={1} />
          </Sphere>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {renderShape()}
    </Float>
  );
}

function Scene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      
      <FloatingShape position={[-4, 3, -5]} color="#8b5cf6" size={1.2} scrollProgress={scrollProgress} type="octahedron" />
      <FloatingShape position={[5, -2, -4]} color="#a78bfa" type="torus" size={1.1} scrollProgress={scrollProgress} />
      <FloatingShape position={[-6, -4, -6]} color="#c4b5fd" type="dodecahedron" size={0.7} scrollProgress={scrollProgress} />
      <FloatingShape position={[7, 4, -8]} color="#7c3aed" type="torus" size={1.8} scrollProgress={scrollProgress} />
      <FloatingShape position={[0, -5, -10]} color="#ddd6fe" size={2.5} scrollProgress={scrollProgress} />
    </>
  );
}

export default function Scene3D() {
  const { scrollYProgress } = useScroll();
  const [eventSource, setEventSource] = useState(undefined);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-50">
      <Canvas 
        shadows 
        eventSource={eventSource} 
        eventPrefix="client"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <Scene scrollProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
