import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-macri-primary to-macri-primary-dark text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-saira text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Customer Success Strategy?
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
          If you're looking for a Customer Success leader who can connect strategy, technology, and real business outcomes, let's talk.
        </p>
        <Button 
          asChild 
          size="lg"
          variant="secondary"
          className="bg-white text-macri-primary hover:bg-white/90 shadow-lg"
        >
          <Link to="/contact" className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Mike
          </Link>
        </Button>
      </div>
    </section>
  );
};
