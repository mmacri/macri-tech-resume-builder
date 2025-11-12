import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-macri-primary/5 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-6">
          Let's Engineer the Next Breakthrough
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          If you're looking for a Solution Engineering leader who can design scalable architectures, build teams that deliver, and connect technology to measurable business outcomes — let's connect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-macri-primary hover:bg-macri-primary-dark text-white">
            <Link to="/contact">
              Contact Mike
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/portfolio">
              Explore My Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
