
import React from 'react';
import AboutForm from './AboutForm';

/**
 * AboutWrapper component that provides the container layout for the About section form
 */
const AboutWrapper = () => {
  return (
    <div className="rounded-lg border p-4 bg-background shadow-sm">
      <AboutForm />
    </div>
  );
};

export default AboutWrapper;
