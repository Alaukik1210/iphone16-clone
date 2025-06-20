import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { ComponentProps } from 'react';


const generateDotPositions = (count: number, seed: number = 42) => {
  const positions = [];
  let random = seed;
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  for (let i = 0; i < count; i++) {
    positions.push({
      left: seededRandom() * 100,
      top: seededRandom() * 100
    });
  }
  return positions;
};

const DOT_POSITIONS = generateDotPositions(20);

useGLTF.preload('/ip16promax.glb');

function IPhoneModel(props: Omit<ComponentProps<'primitive'>, 'object'>) {
  const { scene } = useGLTF('/ip16promax.glb');
  return <primitive object={scene} scale={1.5} {...props} />;
}
function ClientOnlyDots() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return (
    <>
      {DOT_POSITIONS.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 3 + (index * 0.1),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
          }}
        />
      ))}
    </>
  );
}

export default function IPhoneShowcase() {
  return (
    <div className="h-screen bg-black font-poppins flex flex-col items-center justify-center text-white relative overflow-hidden">
      
      <ClientOnlyDots />
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-8 z-10 relative"
      >
        Take a closer look.
      </motion.h1>

      <div className="w-full h-[500px] md:h-[600px] z-10 relative">
        <Canvas camera={{ position: [2, 2, 3.5], fov: 50 }} shadows>
          <Suspense fallback={
            <mesh>
              <boxGeometry args={[1, 2, 0.1]} />
              <meshBasicMaterial color="#333" />
            </mesh>
          }>
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <Stage environment="city" intensity={0.6}>
              <IPhoneModel />
            </Stage>
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      <p className="text-sm mt-4 text-gray-400 z-10 relative">
        6.3 iPhone 16 Pro in Desert Titanium
      </p>
    </div>
  );
}