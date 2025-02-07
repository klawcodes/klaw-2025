import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import TypewriterEffect from "../components/Typewriter";
import { motion } from "framer-motion";

export default function Scene3D() {
  const mountRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const sentences = [
    "Selamat datang di website saya! 👋",
    "Anda dipersilahkan berkeliling...",
    "Jangan lupa tinggalkan pesan ya! ✨",
  ];

  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    // Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentRef.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Global mouse movement handler
    const handleMouseMove = (event) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = (event.clientY / window.innerHeight) * 2 - 1;

      targetRotation.current.x = mousePosition.current.y * Math.PI * 0.5;
      targetRotation.current.y = -mousePosition.current.x * Math.PI * 0.5;
    };

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      "/models/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        const modelGroup = new THREE.Group();

        model.scale.set(0.05, 0.05, 0.05);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        modelGroup.add(model);
        modelGroup.position.set(37.72, -16.5, -10);
        scene.add(modelGroup);
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100,
          "%"
        );
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * 0.05;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * 0.05;

      const radius = 3;
      camera.position.x = radius * Math.sin(currentRotation.current.y);
      camera.position.z = radius * Math.cos(currentRotation.current.y);
      camera.position.y = 2 + radius * Math.sin(currentRotation.current.x);

      camera.lookAt(0, 1.85, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const { clientWidth: width, clientHeight: height } = currentRef;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  const containerVariants = {
    initial: {
      opacity: 0,
      y: 50
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <motion.div 
        ref={mountRef} 
        className="w-full h-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      ></motion.div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-lg text-xs font-bold text-center transition-all duration-300">
        <TypewriterEffect />
      </div>
    </div>
  );
}