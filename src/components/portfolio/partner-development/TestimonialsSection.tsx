import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Mike's strategic approach to partner development helped us move from reactive reselling to proactive co-selling.",
      attribution: "Partner Sales Director, Global SI"
    },
    {
      quote: "He knows how to build ecosystems that work — structured, data-driven, and outcome-focused.",
      attribution: "VP of Partner Strategy, SaaS Company"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-saira text-3xl md:text-4xl font-bold text-macri-primary mb-12 text-center">
          What Partners and Leaders Say
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
