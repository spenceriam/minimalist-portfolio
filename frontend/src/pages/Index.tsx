import Header from "@/components/Header";
import GithubSection from "@/components/GithubSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Header />
        
        <div className="space-y-16">
          <GithubSection />
          <WorkExperienceSection />
        </div>
        
        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 Spencer. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;