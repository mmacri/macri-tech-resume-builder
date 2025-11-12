import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Mike blends innovation and execution. His solutions don't just meet requirements — they redefine what's possible.",
      author: "Senior Director, Solution Consulting",
      company: "ServiceNow"
    },
    {
      quote: "He took our complex multi-site deployment challenge and turned it into a 10-minute automated process. That's impact.",
      author: "Principal Architect",
      company: "VMware"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          What Leaders and Peers Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-macri-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-macri-primary/30 mb-4" />
                <blockquote className="text-lg text-muted-foreground mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
