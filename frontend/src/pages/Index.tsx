import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import EducationSection from "@/components/EducationSection";
import GithubSection from "@/components/GithubSection";
import ContactModal from "@/components/ContactModal";

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
        <Header onConnectClick={handleConnectClick} />
        
        <main className="space-y-16">
          <WorkExperienceSection />
          <EducationSection />
          <GithubSection />
        </main>

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