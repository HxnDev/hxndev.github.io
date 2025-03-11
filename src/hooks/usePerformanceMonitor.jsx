import { useState, useEffect, useRef } from 'react';

/**
 * Hook to monitor performance and optimize animations
 * @returns {Object} - Performance metrics and optimization flags
 */
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: null,
    devicePerformance: 'high' // 'high', 'medium', 'low'
  });
  
  const frameCount = useRef(0);
  const lastFrameTime = useRef(performance.now());
  const frameInterval = useRef(null);
  
  // Track FPS
  useEffect(() => {
    // Function to calculate and update FPS
    const calculateFPS = () => {
      frameCount.current++;
    };
    
    // Set up RAF loop
    const rafCallback = () => {
      calculateFPS();
      frameInterval.current = requestAnimationFrame(rafCallback);
    };
    
    // Start animation frame loop
    frameInterval.current = requestAnimationFrame(rafCallback);
    
    // Update metrics every second
    const metricsInterval = setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastFrameTime.current;
      const currentFPS = Math.round(frameCount.current / (elapsed / 1000));
      
      // Get memory usage if available
      let memoryUsage = null;
      if (window.performance && window.performance.memory) {
        memoryUsage = {
          totalJSHeapSize: window.performance.memory.totalJSHeapSize,
          usedJSHeapSize: window.performance.memory.usedJSHeapSize,
          jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit
        };
      }
      
      // Determine device performance
      let devicePerformance = 'high';
      if (currentFPS < 40) devicePerformance = 'medium';
      if (currentFPS < 25) devicePerformance = 'low';
      
      setMetrics({
        fps: currentFPS,
        memoryUsage,
        devicePerformance
      });
      
      // Reset counters
      frameCount.current = 0;
      lastFrameTime.current = now;
    }, 1000);
    
    return () => {
      cancelAnimationFrame(frameInterval.current);
      clearInterval(metricsInterval);
    };
  }, []);
  
  // Helper functions to determine what optimizations to apply
  const shouldReduceEffects = () => {
    return metrics.devicePerformance !== 'high';
  };
  
  const shouldReduceParticles = () => {
    return metrics.devicePerformance === 'low';
  };
  
  return {
    ...metrics,
    shouldReduceEffects,
    shouldReduceParticles
  };
};

export default usePerformanceMonitor;