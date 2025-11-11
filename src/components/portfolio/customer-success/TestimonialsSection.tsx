import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Mike has a rare ability to connect complex technology, governance, and customer outcomes. He makes it easier for teams to tell a clear story about value."
    },
    {
      quote: "Working with Mike, our customer conversations became more structured, more strategic, and more clearly tied to business results."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          How Colleagues and Leaders Describe My Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-card-hover transition-all">
              <CardContent className="p-8">
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-macri-primary/30" />
                </div>
                <blockquote className="text-lg text-foreground leading-relaxed italic">
                  {testimonial.quote}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
