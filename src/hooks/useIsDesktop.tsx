import { useState, useEffect } from 'react';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (i.e., code is running in the browser)
    if (typeof window !== 'undefined') {
      // Function to handle resize events
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };

      // Set initial value
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Clean up event listener
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return isDesktop;
};

export default useIsDesktop;
