import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Twitter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "spencerfrancisco@gmail.com",
      href: "mailto:spencerfrancisco@gmail.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Spencer Francisco",
      href: "https://www.linkedin.com/in/spencerfrancisco/",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Twitter,
      label: "Twitter/X",
      value: "@spencer_i_am",
      href: "https://x.com/spencer_i_am",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form submission logic will be added later
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl" />
          
          {/* Close button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:text-purple-300 hover:bg-white/10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="relative p-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Let's Connect
              </h2>
              <p className="text-blue-200 text-lg">
                Ready to collaborate? Choose your preferred way to reach out.
              </p>
            </div>

            {/* Contact Method Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Card className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {method.label}
                      </h3>
                      <p className="text-sm text-blue-200 group-hover:text-purple-200 transition-colors">
                        {method.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Or send me a message
                </h3>
                <p className="text-blue-200">
                  I'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-purple-400 focus:ring-purple-400/20 min-h-[120px] resize-none"
                    placeholder="Tell me about your project or just say hello..."
                    required
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;