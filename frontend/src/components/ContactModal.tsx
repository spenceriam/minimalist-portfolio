import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Twitter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:spencerfrancisco@gmail.com",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/spencerfrancisco/",
      color: "from-blue-400 to-purple-400"
    },
    {
      icon: Twitter,
      label: "Twitter/X",
      href: "https://x.com/spencer_i_am",
      color: "from-purple-400 to-indigo-400"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy-dark/90 backdrop-blur-md" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden bg-navy-dark/95 backdrop-blur-xl border border-blue-light/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-cream hover:text-blue-light hover:bg-navy-medium/50 rounded-full transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="relative p-8 space-y-8">
              <div className="text-center space-y-4">
                <motion.h2 
                  className="text-3xl font-bold gradient-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Let's Connect
                </motion.h2>
                <motion.p 
                  className="text-blue-light text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Ready to collaborate? Choose your preferred way to reach out.
                </motion.p>
              </div>

              {/* Contact Method Cards */}
              <div className="grid grid-cols-1 gap-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Card className="border-0 bg-navy-medium/80 backdrop-blur-sm hover:bg-navy-medium/90 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6 flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <method.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-cream group-hover:text-blue-light transition-colors text-lg">
                            {method.label}
                          </h3>
                          <p className="text-blue-light text-sm">
                            {method.label === 'Email' && 'spencerfrancisco@gmail.com'}
                            {method.label === 'LinkedIn' && 'Connect professionally'}
                            {method.label === 'Twitter/X' && '@spencer_i_am'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;