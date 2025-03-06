
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-futuristic-black text-white">
      <Header />
      <main className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contact <span className="text-futuristic-yellow">Us</span></h1>
          
          <div className="glass-panel p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                <p className="mb-8 text-white/70">
                  Have questions, feedback, or need assistance with our platform? Our team is here to help! Fill out the form, and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="text-futuristic-yellow mt-1" size={20} />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-white/70">support@pixelforgeai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="text-futuristic-yellow mt-1" size={20} />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-white/70">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="text-futuristic-yellow mt-1" size={20} />
                    <div>
                      <h3 className="font-medium">Visit Us</h3>
                      <p className="text-white/70">
                        PixelForge AI Headquarters<br />
                        123 Tech Innovation Way<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-futuristic-darkgray border border-futuristic-gray rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-futuristic-yellow"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-futuristic-darkgray border border-futuristic-gray rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-futuristic-yellow"
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full bg-futuristic-darkgray border border-futuristic-gray rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-futuristic-yellow"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-futuristic-darkgray border border-futuristic-gray rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-futuristic-yellow"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="button-primary w-full flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
