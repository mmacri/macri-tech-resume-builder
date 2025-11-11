import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Mike bridges governance and innovation better than anyone I've worked with. He makes compliance an accelerator, not an obstacle.",
      attribution: "Director of Risk & Assurance, Enterprise Client"
    },
    {
      quote: "He transformed our compliance reporting from static spreadsheets to a live dashboard that leadership actually uses.",
      attribution: "Senior Compliance Manager, Public Utility"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-accent/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          What Leaders Say About My Compliance Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-card-hover transition-all">
              <CardContent className="p-8">
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-macri-primary/30" />
                </div>
                <blockquote className="text-lg text-foreground leading-relaxed italic mb-4">
                  {testimonial.quote}
                </blockquote>
                <p className="text-sm text-muted-foreground font-medium">
                  — {testimonial.attribution}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
