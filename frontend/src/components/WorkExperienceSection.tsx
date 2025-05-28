import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, TrendingUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  vibe?: string;
}

const WorkExperienceSection = () => {
  const experiences: Experience[] = [
    {
      title: "Senior Business Analyst",
      company: "Zebra Technologies",
      period: "Sep 2018 - Present",
      location: "Lincolnshire, IL",
      description: "Leading pre-sales quoting solutions in Salesforce as both Business Analyst and Product Owner. Specializing in requirements gathering, solution wireframing, and cross-functional collaboration with IT development teams. Translating complex business needs into actionable development solutions.",
      vibe: "🎯 Product ownership mindset"
    },
    {
      title: "Enterprise Systems Analyst II",
      company: "Zebra Technologies",
      period: "Feb 2013 - Sep 2018",
      location: "Lincolnshire, IL",
      description: "Business Systems Analyst specializing in Oracle ERP WMS and Inventory systems. Led shipping execution using Creative Logistics Solutions and Bluejay's Kewill/Parcel. Designed and implemented solutions while conducting comprehensive system testing and cross-functional collaboration.",
      vibe: "⚙️ Systems integration expert"
    },
    {
      title: "Client System Administrator II",
      company: "Zebra Technologies",
      period: "Dec 2011 - Feb 2013",
      location: "Vernon Hills, IL",
      description: "Help Desk administrator managing tickets across multiple systems including Active Directory, Exchange, Oracle Applications, and Java applications. Focused on delivering high-quality customer service and maintaining security compliance.",
      vibe: "🛠️ Problem-solving focused"
    },
    {
      title: "Regional IT Support",
      company: "Passages Hospice",
      period: "Feb 2010 - Sep 2011",
      location: "Swansea, IL",
      description: "Provided comprehensive IT support across multiple office locations, managing everything from mobile devices to networking equipment. Handled inventory management, staff training, and created marketing materials while maintaining 24/7 support availability.",
      vibe: "🌐 Multi-location support"
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
          <Briefcase className="h-6 w-6 text-blue-light" />
        </motion.div>
        <h2 className="text-2xl font-medium text-cream">Work Experience</h2>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <TrendingUp className="h-5 w-5 text-green-400" />
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
                  <div className="flex-1">
                    <h3 className="text-xl font-medium gradient-text">{exp.title}</h3>
                    <p className="text-cream font-medium">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-blue-light mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{exp.location}</span>
                    </div>
                    {exp.vibe && (
                      <p className="text-sm text-blue-light mt-2">{exp.vibe}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cream bg-blue-medium/20 px-3 py-1 rounded-full shrink-0 border border-blue-light/30">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <p className="text-blue-light leading-relaxed">
                  {exp.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WorkExperienceSection;