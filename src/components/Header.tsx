import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="glass border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-ai-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gradient-ai">Imagify</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-muted-foreground hover:text-primary">
            Sign In
          </Button>
          <Button className="btn-ai-primary">
            <Zap className="w-4 h-4 mr-2" />
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;