import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Wand2, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-ai"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full mb-8 border border-border/50">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Image Tools</span>
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">NEW</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Images with{" "}
            <span className="text-gradient-ai">AI Magic</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate, enhance, and manipulate images effortlessly with our suite of AI-powered tools. 
            From text-to-image generation to background removal, unlock your creativity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="btn-ai-primary text-lg px-8 py-6 shadow-ai-glow">
              <Wand2 className="w-5 h-5 mr-2" />
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border/50 hover:border-primary/50">
              <Zap className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-ai">10K+</div>
              <div className="text-sm text-muted-foreground">Images Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-ai">5+</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-ai">2K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-ai">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;