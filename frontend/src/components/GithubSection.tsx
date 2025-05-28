import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Star, GitFork, Zap } from "lucide-react";
import { motion } from "framer-motion";

const GithubSection = () => {
  return (
    <motion.section 
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Github className="h-6 w-6 text-purple-600" />
        </motion.div>
        <h2 className="text-2xl font-medium">GitHub</h2>
      </div>
      
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-medium mb-2 gradient-text">@spenceriam</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Building modern web applications with clean, maintainable code. 
                  Learning in public and shipping with passion.
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-600">
                  <Zap className="h-4 w-4" />
                  <span>Currently exploring React & TypeScript</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a 
                  href="https://github.com/spenceriam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Profile
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-sm">
              <motion.div 
                className="flex items-center gap-2 text-muted-foreground hover:text-purple-600 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-4 w-4" />
                <span>Featured repositories</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <GitFork className="h-4 w-4" />
                <span>Open source contributions</span>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default GithubSection;