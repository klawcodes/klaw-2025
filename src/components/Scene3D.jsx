import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import TypewriterEffect from "../components/Typewriter";
import { motion } from "framer-motion";

export default function Scene3D() {
  const mountRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const [hoverSection, setHoverSection] = useState(null);
  
  // Default sentences when not hovering any specific section
const defaultSentences = [
  "Welcome to my website! 👋",
  "Feel free to look around...",
];

// Section-specific sentences
const sectionSentences = {
  profile: [
    "This is my profile section 🧑‍💻",
    "I'm a web developer and visual designer",
    "Check out more about my skills and experience",
  ],
  skills: [
    "These are the skills I've mastered ⚙️",
    "Some technologies I often use",
    "Recent techonologies i use: Laravel, Astro JS, and Next JS",
  ],
  blog: [
    "Read my latest writings 📝",
  ],
  projects: [
    "These are my latest projects 🚀",
    "Selected portfolio pieces with modern tech",
    "Click to see project details",
  ],
  contact: [
    "Let's connect and collaborate! 🤝",
    "Feel free to leave me a message",
    "I'm always excited to hear new ideas",
  ],
};
  
  // Get the current sentences based on hover section
  const getCurrentSentences = () => {
    return hoverSection ? sectionSentences[hoverSection] : defaultSentences;
  };

  // Setup global mouse tracker to detect section hovers
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      // Get all grid sections
      const profileSection = document.querySelector('[class*="order-2"]');
      const skillsSection = document.querySelector('[class*="order-3"]');
      const blogSection = document.querySelector('[class*="order-4"]');
      const projectsSection = document.querySelector('[class*="order-5"]');
      const contactSection = document.querySelector('[class*="order-6"]');
      
      // Check which section the mouse is over
      if (profileSection && profileSection.contains(e.target)) {
        setHoverSection('profile');
      } else if (skillsSection && skillsSection.contains(e.target)) {
        setHoverSection('skills');
      } else if (blogSection && blogSection.contains(e.target)) {
        setHoverSection('blog');
      } else if (projectsSection && projectsSection.contains(e.target)) {
        setHoverSection('projects');
      } else if (contactSection && contactSection.contains(e.target)) {
        setHoverSection('contact');
      } else {
        setHoverSection(null);
      }
    };
    
    window.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

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

  const subtitleVariants = {
    initial: {
      opacity: 0,
      y: 10,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
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
      <motion.div
        className={`absolute bottom-20 left-0 right-0 mx-auto w-fit bg-black/50 text-white px-3 py-1 rounded-lg text-xs font-bold text-center transition-all duration-300 ${
          hoverSection ? 'bg-black/70' : 'bg-black/50'
        }`}
        variants={subtitleVariants}
        initial="initial"
        animate="animate"
        key={hoverSection || 'default'}
      >
        <TypewriterEffect sentences={getCurrentSentences()} />
      </motion.div>
    </div>
  );
}