import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Twitter, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (submissionState.error) {
      setSubmissionState(prev => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      error: null
    });

    try {
      const response = await axios.post('http://localhost:3001/api/send-email', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000 // 10 second timeout
      });

      if (response.data.success) {
        setSubmissionState({
          isSubmitting: false,
          isSuccess: true,
          error: null
        });
        
        // Clear form
        setFormData({
          name: "",
          email: "",
          message: ""
        });

        // Auto-close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmissionState({
            isSubmitting: false,
            isSuccess: false,
            error: null
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Email submission error:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          errorMessage = 'Unable to connect to server. Please try again later.';
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = 'Request timed out. Please try again.';
        }
      }
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: errorMessage
      });
    }
  };

  const resetModal = () => {
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      error: null
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy-dark/90 backdrop-blur-md" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden bg-navy-dark/95 backdrop-blur-xl border border-blue-light/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              onClick={handleClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-cream hover:text-blue-light hover:bg-navy-medium/50 rounded-full transition-all duration-200"
              disabled={submissionState.isSubmitting}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="relative p-8 space-y-8">
              {/* Success State */}
              {submissionState.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-cream">Message Sent!</h2>
                  <p className="text-blue-light">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              )}

              {/* Form State */}
              {!submissionState.isSuccess && (
                <>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <Card className="border-0 bg-navy-medium/80 backdrop-blur-sm hover:bg-navy-medium/90 transition-all duration-300 cursor-pointer h-full">
                          <CardContent className="p-6 text-center space-y-3 h-full flex flex-col justify-center">
                            <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                              <method.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-cream group-hover:text-blue-light transition-colors">
                              {method.label}
                            </h3>
                          </CardContent>
                        </Card>
                      </motion.a>
                    ))}
                  </div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-cream mb-2">
                        Or send me a message
                      </h3>
                      <p className="text-blue-light">
                        I'll get back to you as soon as possible
                      </p>
                    </div>

                    {/* Error Message */}
                    {submissionState.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                      >
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{submissionState.error}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-cream font-medium">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-navy-medium/50 border-blue-light/30 text-cream placeholder:text-blue-light/70 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                            placeholder="Your name"
                            required
                            disabled={submissionState.isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-cream font-medium">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-navy-medium/50 border-blue-light/30 text-cream placeholder:text-blue-light/70 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                            placeholder="your@email.com"
                            required
                            disabled={submissionState.isSubmitting}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-cream font-medium">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="bg-navy-medium/50 border-blue-light/30 text-cream placeholder:text-blue-light/70 focus:border-purple-400 focus:ring-purple-400/20 min-h-[120px] resize-none transition-all duration-200"
                          placeholder="Tell me about your project or just say hello..."
                          required
                          disabled={submissionState.isSubmitting}
                        />
                      </div>
                      <motion.div
                        whileHover={!submissionState.isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!submissionState.isSubmitting ? { scale: 0.98 } : {}}
                      >
                        <Button
                          type="submit"
                          disabled={submissionState.isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submissionState.isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </div>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;