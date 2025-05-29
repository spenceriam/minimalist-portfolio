import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Zap } from "lucide-react";
import { motion } from "framer-motion";

const GithubSection = () => {
  const featuredProjects = [
    { name: "HEICscape", url: "https://github.com/spenceriam/HEICscape" },
    { name: "InkFrame", url: "https://github.com/spenceriam/InkFrame" },
    { name: "type-B", url: "https://github.com/spenceriam/type-B" },
    { name: "meowgenda", url: "https://github.com/spenceriam/meowgenda" },
    { name: "StorFlo", url: "https://github.com/spenceriam/StorFlo" },
    { name: "OnboardEase", url: "https://github.com/spenceriam/OnboardEase" }
  ];

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
          <Github className="h-6 w-6 text-blue-light" />
        </motion.div>
        <h2 className="text-2xl font-medium text-cream">GitHub</h2>
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
                <p className="text-blue-light mb-4 leading-relaxed">
                  Building modern web applications with clean, maintainable code. 
                  Learning in public and shipping with passion.
                </p>
                <div className="flex items-center gap-2 text-sm text-cream">
                  <Zap className="h-4 w-4" />
                  <span>Currently exploring React & TypeScript</span>
                </div>
              </div>
              <Button 
                className="bg-navy-medium hover:bg-navy-dark text-cream border-2 border-blue-light hover:border-cream shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="sm"
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
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-cream">Featured Projects</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {featuredProjects.map((project, index) => (
                  <motion.a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-lg bg-navy-medium/50 border border-blue-light/20 hover:border-blue-light/60 transition-all duration-300 hover:bg-navy-medium/80"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-cream group-hover:text-blue-light transition-colors">
                        {project.name}
                      </span>
                      <ExternalLink className="h-3 w-3 text-blue-light/60 group-hover:text-blue-light transition-colors" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId={`project-bg-${project.name}`}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default GithubSection;