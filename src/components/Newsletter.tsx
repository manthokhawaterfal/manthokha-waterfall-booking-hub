
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-waterfall-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-waterfall-100 mb-8">
            Subscribe to our newsletter for exclusive offers, travel tips, and updates about Manthokha Waterfall.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-white text-waterfall-800 hover:bg-waterfall-100 whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm text-waterfall-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
