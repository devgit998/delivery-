import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpeedexLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Package delivery route points
  const routePoints = [
    { x: -100, y: 0 },
    { x: -50, y: -40 },
    { x: 0, y: -20 },
    { x: 50, y: -50 },
    { x: 100, y: -10 },
  ];

  return (
    <div className="loader-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght:700;900&family=Rajdhani:wght:400;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .loader-container {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
        }

        /* Animated background grid */
        .loader-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridScroll 20s linear infinite;
          opacity: 0.5;
        }

        @keyframes gridScroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        /* Glowing orbs */
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 8s ease-in-out infinite;
        }

        .bg-orb:nth-child(1) {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #ff6b35, transparent);
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }

        .bg-orb:nth-child(2) {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #f7931e, transparent);
          bottom: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        .bg-orb:nth-child(3) {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #ff385c, transparent);
          top: 50%;
          left: 50%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
        }

        /* Delivery route visualization */
        .route-container {
          position: relative;
          width: 500px;
          height: 200px;
        }

        .route-path {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(255, 107, 53, 0.2) 0%, 
            rgba(255, 107, 53, 0.6) 50%, 
            rgba(255, 107, 53, 0.2) 100%
          );
          border-radius: 2px;
          overflow: visible;
        }

        .route-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #ff6b35;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
        }

        .package {
          position: absolute;
          width: 40px;
          height: 40px;
          top: 50%;
        }

        .package-box {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border-radius: 4px;
          position: relative;
          box-shadow: 
            0 10px 30px rgba(255, 107, 53, 0.4),
            inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        .package-box::before,
        .package-box::after {
          content: '';
          position: absolute;
          background: rgba(0, 0, 0, 0.2);
        }

        .package-box::before {
          top: 50%;
          left: 0;
          right: 0;
          height: 3px;
          transform: translateY(-50%);
        }

        .package-box::after {
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          transform: translateX(-50%);
        }

        .speed-lines {
          position: absolute;
          left: -30px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 4px;
        }

        .speed-line {
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff6b35);
          border-radius: 1px;
        }

        /* Logo section */
        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .logo-text {
          font-family: 'Orbitron', monospace;
          font-size: 72px;
          font-weight: 900;
          letter-spacing: 4px;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff385c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          position: relative;
          filter: drop-shadow(0 0 30px rgba(255, 107, 53, 0.5));
        }

        .logo-tagline {
          font-size: 18px;
          letter-spacing: 8px;
          color: #ff6b35;
          text-transform: uppercase;
          font-weight: 600;
          opacity: 0.8;
        }

        /* Progress bar */
        .progress-container {
          width: 400px;
          height: 6px;
          background: rgba(255, 107, 53, 0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 107, 53, 0.2);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ff6b35, #f7931e, #ff385c);
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
          position: relative;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.4) 50%, 
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progress-text {
          margin-top: 12px;
          font-size: 14px;
          color: #ff6b35;
          font-weight: 600;
          letter-spacing: 2px;
        }

        /* Particle system */
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ff6b35;
          border-radius: 50%;
          opacity: 0.6;
          box-shadow: 0 0 10px rgba(255, 107, 53, 0.8);
        }
      `}</style>

      {/* Background orbs */}
      <div className="bg-orb"></div>
      <div className="bg-orb"></div>
      <div className="bg-orb"></div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="content-wrapper">
        {/* Delivery route animation */}
        <div className="route-container">
          <div className="route-path">
            {/* Route dots */}
            {routePoints.map((point, i) => (
              <motion.div
                key={i}
                className="route-dot"
                style={{ left: `${(i / (routePoints.length - 1)) * 100}%` }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Animated packages */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="package"
              initial={{ x: -100, y: 0, rotate: 0 }}
              animate={{
                x: [
                  -100,
                  routePoints[1].x,
                  routePoints[2].x,
                  routePoints[3].x,
                  600
                ],
                y: [
                  0,
                  routePoints[1].y,
                  routePoints[2].y,
                  routePoints[3].y,
                  0
                ],
                rotate: [0, 10, -10, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="package-box"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="speed-lines">
                {[0, 1, 2].map((j) => (
                  <motion.div
                    key={j}
                    className="speed-line"
                    animate={{
                      scaleX: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: j * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo section */}
        <div className="logo-section">
          <motion.div
            className="logo-text"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            {['S', 'P', 'E', 'E', 'D', 'E', 'X'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="logo-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
          >
            Lightning Fast Delivery
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="progress-container">
            <motion.div
              className="progress-bar"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.div
            className="progress-text"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {progress < 100 ? 'PREPARING YOUR DELIVERY...' : 'READY TO GO!'}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}