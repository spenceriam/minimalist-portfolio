import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import EducationSection from "@/components/EducationSection";
import GithubSection from "@/components/GithubSection";
import ContactModal from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  console.log("Index component rendered, isContactModalOpen:", isContactModalOpen);

  const handleConnectClick = () => {
    console.log("Let's Connect button clicked!");
    console.log("Current state before:", isContactModalOpen);
    setIsContactModalOpen(true);
    console.log("State should now be true");
  };

  return (
    <div className="min-h-screen bg-navy-dark text-cream m-0 p-0">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        <Header />
        
        <main className="space-y-16">
          <WorkExperienceSection />
          <EducationSection />
          <GithubSection />
        </main>

        {/* Let's Connect Button */}
        <motion.div 
          className="flex justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleConnectClick}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              size="lg"
            >
              <MessageCircle className="h-5 w-5" />
              Let's Connect
            </Button>
          </motion.div>
        </motion.div>

        <motion.footer 
          className="mt-20 pt-8 border-t border-purple-200 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>Created by Spencer with Von.dev. Built with React, Tailwind CSS & good vibes ✨</p>
        </motion.footer>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => {
          console.log("Modal close requested");
          setIsContactModalOpen(false);
        }} 
      />
    </div>
  );
};

export default Index;