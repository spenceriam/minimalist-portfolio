import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Download, Sparkles, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="text-center space-y-8 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight gradient-text mb-4">
            Spencer
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-blue-light/20 navy-dark hover:bg-blue-light/30 transition-colors border-blue-medium/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Vibe Coder
            </Badge>
            <Badge variant="secondary" className="bg-navy-medium/10 navy-dark hover:bg-navy-medium/20 transition-colors border-navy-medium/30">
              <Code2 className="h-3 w-3 mr-1" />
              Product Manager
            </Badge>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-xl text-blue-medium max-w-2xl mx-auto text-balance leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Relearning the art of software development while building products that matter. 
          I code with intuition and manage with empathy.
        </motion.p>
      </div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button 
          className="bg-navy-dark hover:bg-navy-medium text-cream shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <Mail className="h-4 w-4 mr-2" />
          Let's Connect
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="border-blue-medium/30 navy-dark hover:bg-blue-light/20 hover:border-blue-medium transition-all duration-300 transform hover:scale-105"
        >
          <Download className="h-4 w-4 mr-2" />
          Download CV
        </Button>
      </motion.div>
    </motion.header>
  );
};

export default Header;