
import React from 'react';
import Home from './Home';
import { setupScrollSpy } from '../utils/scrollUtils';

const Index = () => {
  React.useEffect(() => {
    // Set up scroll spying to highlight active nav items
    const cleanup = setupScrollSpy();
    
    // Clean up the observer when the component unmounts
    return cleanup;
  }, []);

  return <Home />;
};

export default Index;
