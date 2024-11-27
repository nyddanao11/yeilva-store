import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop ()  {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Since this is just a utility component, it doesn't render anything
};

