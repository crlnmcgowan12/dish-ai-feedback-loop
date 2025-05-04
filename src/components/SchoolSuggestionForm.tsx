
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { toast } from '../hooks/use-toast';

// Form schema validation
const formSchema = z.object({
  schoolName: z.string().min(2, {
    message: "School name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  reason: z.string().min(10, {
    message: "Please provide at least 10 characters explaining why you'd like this school added.",
  }).max(500, {
    message: "Please keep your explanation under 500 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SchoolSuggestionForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "",
      location: "",
      reason: "",
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send data to a backend API
      // For now, we'll just simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo purposes
      const suggestions = JSON.parse(localStorage.getItem('schoolSuggestions') || '[]');
      suggestions.push({
        ...values,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('schoolSuggestions', JSON.stringify(suggestions));
      
      // Success message
      toast({
        title: "Suggestion submitted!",
        description: "Thank you for suggesting a new school.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your suggestion could not be submitted. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-campus-secondary mb-4">
        Suggest a School
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input placeholder="University of Example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why add this school?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us why you'd like to see this school's dining information added..." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Explain why you'd like to see this school added to our platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  We'll notify you when this school is added.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Suggestion"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SchoolSuggestionForm;
