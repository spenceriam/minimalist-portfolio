import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
  achievement?: string;
  vibe?: string;
}

const EducationSection = () => {
  const education: Education[] = [
    {
      degree: "Bachelor of Science - Information Technology",
      school: "University of Phoenix",
      period: "2018 - 2020",
      description: "Bachelor's degree in Science with a focus on advanced software development. Developed strong foundations in modern programming practices and system design.",
      achievement: "Nominated and accepted into The National Society of Leadership and Success in 2020",
      vibe: "🎓 Advanced development focus"
    },
    {
      degree: "Bachelor's Degree - Technical Management",
      school: "DeVry University, College of Business & Management",
      period: "2015 - 2016",
      description: "Specialized in Information Technology with Global Supply Chain coursework. Gained valuable business perspective that bridges technical and management domains. (Transferred to University of Phoenix)",
      vibe: "🌐 Business-tech bridge"
    },
    {
      degree: "Associate's Degree - Computer Science, Computer Network Systems",
      school: "ITT Technical Institute",
      period: "2008 - 2010",
      description: "Foundation in computer science principles and network systems. Built core technical skills that launched my career in technology.",
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
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <GraduationCap className="h-6 w-6 text-purple-600" />
        </motion.div>
        <h2 className="text-2xl font-medium">Education</h2>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          <Award className="h-5 w-5 text-yellow-500" />
        </motion.div>
      </div>
      
      <div className="space-y-6">
        {education.map((edu, index) => (
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
                  <div className="flex-1">
                    <h3 className="text-xl font-medium gradient-text">{edu.degree}</h3>
                    <p className="text-muted-foreground font-medium">{edu.school}</p>
                    {edu.vibe && (
                      <p className="text-sm text-purple-600 mt-2">{edu.vibe}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-purple-50 px-3 py-1 rounded-full shrink-0">
                    <Calendar className="h-4 w-4" />
                    <span>{edu.period}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {edu.description}
                </p>

                {edu.achievement && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 hover:from-yellow-200 hover:to-orange-200 transition-all duration-300"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {edu.achievement}
                    </Badge>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EducationSection;