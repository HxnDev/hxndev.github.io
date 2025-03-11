/**
 * Utility for browser and feature detection
 */

/**
 * Detect browser type
 * @returns {Object} Browser information
 */
export const detectBrowser = () => {
  const userAgent = window.navigator.userAgent;

  // Browser detection
  const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edge') === -1;
  const isFirefox = userAgent.indexOf('Firefox') > -1;
  const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
  const isEdge = userAgent.indexOf('Edge') > -1 || userAgent.indexOf('Edg') > -1;
  const isIE = userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1;
  const isOpera = userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1;

  // Device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  // OS detection
  const isWindows = userAgent.indexOf('Windows') > -1;
  const isMac = userAgent.indexOf('Macintosh') > -1;
  const isLinux = userAgent.indexOf('Linux') > -1;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isAndroid = userAgent.indexOf('Android') > -1;

  return {
    browser: isChrome
      ? 'chrome'
      : isFirefox
        ? 'firefox'
        : isSafari
          ? 'safari'
          : isEdge
            ? 'edge'
            : isIE
              ? 'ie'
              : isOpera
                ? 'opera'
                : 'unknown',
    device: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    os: isWindows
      ? 'windows'
      : isMac
        ? 'mac'
        : isLinux
          ? 'linux'
          : isIOS
            ? 'ios'
            : isAndroid
              ? 'android'
              : 'unknown',
    isMobile,
    isTablet,
    isDesktop,
  };
};

/**
 * Detect supported features
 * @returns {Object} Feature support information
 */
export const detectFeatures = () => {
  return {
    // CSS features
    cssGrid: CSS.supports('display', 'grid'),
    flexbox: CSS.supports('display', 'flex'),
    customProperties: CSS.supports('--custom-property', 'value'),

    // JavaScript API features
    webGL: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    })(),

    webGL2: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
      } catch {
        return false;
      }
    })(),

    touchEvents: 'ontouchstart' in window || navigator.maxTouchPoints > 0,

    // Performance features
    deviceMemory: navigator.deviceMemory || 4, // Default to 4 if not available
    hardwareConcurrency: navigator.hardwareConcurrency || 4, // Default to 4 if not available

    // User preferences
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersLightTheme: window.matchMedia('(prefers-color-scheme: light)').matches,
    prefersDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
  };
};

/**
 * Apply CSS classes based on browser and feature detection
 */
export const applyDetectionClasses = () => {
  const browser = detectBrowser();
  const features = detectFeatures();

  // Apply browser classes
  document.documentElement.classList.add(`browser-${browser.browser}`);
  document.documentElement.classList.add(`device-${browser.device}`);
  document.documentElement.classList.add(`os-${browser.os}`);

  // Apply feature classes
  if (!features.webGL) document.documentElement.classList.add('no-webgl');
  if (features.prefersReducedMotion) document.documentElement.classList.add('reduced-motion');
  if (features.touchEvents) document.documentElement.classList.add('touch-enabled');

  // Apply performance classes
  const isHighPerformance = features.deviceMemory >= 4 && features.hardwareConcurrency >= 4;
  const isLowPerformance = features.deviceMemory <= 2 || features.hardwareConcurrency <= 2;

  if (isHighPerformance) document.documentElement.classList.add('high-performance');
  else if (isLowPerformance) document.documentElement.classList.add('low-performance');
  else document.documentElement.classList.add('medium-performance');
};

export default {
  detectBrowser,
  detectFeatures,
  applyDetectionClasses,
};
