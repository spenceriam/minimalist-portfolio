import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";

const EducationSection = () => {
  const education = [
    {
      degree: "Bachelor of Science - Information Technology",
      school: "University of Phoenix",
      period: "2018 - 2020",
      description: "Advanced software development focus with modern programming practices and system design principles.",
      vibe: "🎓 Advanced development focus"
    },
    {
      degree: "Bachelor's Degree - Technical Management",
      school: "DeVry University, College of Business & Management",
      period: "2015 - 2016",
      description: "Information Technology specialization with Global Supply Chain coursework, bridging technical and business domains.",
      vibe: "🌐 Business-tech bridge"
    },
    {
      degree: "Associate's Degree - Computer Science, Computer Network Systems",
      school: "ITT Technical Institute",
      period: "2008 - 2010",
      description: "Foundation in computer science principles and network systems that launched my technology career.",
      achievement: "Nominated and accepted into The National Society of Leadership and Success",
      vibe: "💻 Technical foundation"
    }
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
          <GraduationCap className="h-6 w-6 text-blue-400" />
        </motion.div>
        <h2 className="text-2xl font-medium text-white">Education</h2>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          <Award className="h-5 w-5 text-yellow-400" />
        </motion.div>
      </div>
      
      <div className="space-y-4">
        {education.map((edu, index) => (
          <motion.div
            key={`${edu.school}-${edu.degree}`}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/60 hover:bg-slate-700/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-1 text-gradient">{edu.degree}</h3>
                    <p className="text-lg text-white mb-2">{edu.school}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    {edu.vibe && (
                      <p className="text-sm text-blue-400 mb-3">{edu.vibe}</p>
                    )}
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {edu.description}
                </p>
                
                {edu.achievement && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">Achievement</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-yellow-900/30 text-yellow-300 border-yellow-700/50 hover:bg-yellow-800/40 hover:text-yellow-200 transition-all duration-200"
                    >
                      {edu.achievement}
                    </Badge>
                  </motion.div>
                )}
                
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`education-bg-${edu.school}`}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EducationSection;