
import React from 'react';
import Home from './Home';
import { setupScrollSpy } from '../utils/scrollUtils';

const Index = () => {
  React.useEffect(() => {
    // Set up scroll spying to highlight active nav items
    setupScrollSpy();
  }, []);

  return <Home />;
};

export default Index;
