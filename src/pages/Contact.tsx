import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SEOHead } from '@/components/layout/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Send, Mail, Linkedin, MapPin } from 'lucide-react';
import { profile } from '@/data/careerData';

const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  message: z.string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      contactFormSchema.parse(data);
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Thank you for your message! I will be in contact shortly.');
      form.reset();
    } catch (error) {
      toast.error('Please check your input and try again.');
    }
  };

  return (
    <>
      <SEOHead
        title="Contact - Mike Macri"
        description="Connect with Mike Macri to discuss Customer Success Engineering, DevSecOps adoption, AI governance, partner ecosystems, and enterprise technology leadership."
        url="https://mikemacri.com/contact"
      />

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-saira font-bold text-4xl text-macri-primary mb-4">
              Contact
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect to discuss Customer Success Engineering, DevSecOps adoption, AI governance, partner ecosystems, and enterprise technology leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h2 className="font-semibold text-lg text-macri-primary mb-4">Connect With Me</h2>
                
                <div className="space-y-4">
                  <a 
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-macri-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5 mr-3 text-macri-primary" />
                    <span>linkedin.com/in/mikemacri</span>
                  </a>
                  
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-macri-primary mt-0.5" />
                    <div className="text-sm">
                      <p>United States / Remote</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-macri-primary/5 rounded-lg p-6 border border-macri-primary/20">
                <p className="text-sm text-gray-700">
                  <strong className="text-macri-primary">Current focus:</strong><br />
                  Customer Success Engineering leadership, scalable technical engagement, DevSecOps adoption, AI governance, security, and enterprise platform value realization.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-macri-primary">
                    <Send className="h-5 w-5" />
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={5}
                                placeholder="Tell me about your project, challenge, or opportunity..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-macri-primary hover:bg-macri-primary-dark" 
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
