import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  vibe?: string;
}

const WorkExperienceSection = () => {
  const experiences: Experience[] = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Leading development of modern web applications while rediscovering the joy of coding. Bridging the gap between technical execution and product vision.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      vibe: "🚀 Building with purpose"
    },
    {
      title: "Product Manager / Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      description: "Wore multiple hats - from user research to code deployment. Learned that the best products come from understanding both the 'why' and the 'how'.",
      technologies: ["JavaScript", "Node.js", "React", "PostgreSQL"],
      vibe: "🎯 Product-first mindset"
    },
    {
      title: "Frontend Developer",
      company: "Startup",
      period: "2019 - 2020",
      description: "Started my journey in the fast-paced startup world. Every day was a learning opportunity, every bug was a teacher.",
      technologies: ["HTML", "CSS", "JavaScript", "Vue.js"],
      vibe: "🌱 Growth mindset"
    }
  ];

  return (
    <motion.section 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Briefcase className="h-6 w-6 text-blue-600" />
        </motion.div>
        <h2 className="text-2xl font-medium">Work Experience</h2>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <TrendingUp className="h-5 w-5 text-green-500" />
        </motion.div>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-medium gradient-text">{exp.title}</h3>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    {exp.vibe && (
                      <p className="text-sm text-purple-600 mt-1">{exp.vibe}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-purple-50 px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-xs font-normal bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 cursor-pointer"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WorkExperienceSection;