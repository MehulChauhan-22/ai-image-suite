import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wand2, 
  Sparkles, 
  Scissors, 
  Layers3, 
  Zap, 
  ArrowRight,
  Image,
  Palette
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Image Generation",
    description: "Create stunning images from text descriptions using advanced AI models.",
    status: "Available",
    color: "from-purple-500 to-pink-500",
    features: ["Text-to-image", "Style variations", "High resolution", "Batch generation"]
  },
  {
    icon: Sparkles,
    title: "Image Enhancement",
    description: "Upscale and enhance your images with AI-powered quality improvements.",
    status: "Available", 
    color: "from-blue-500 to-cyan-500",
    features: ["AI upscaling", "Quality boost", "Noise reduction", "Detail enhancement"]
  },
  {
    icon: Scissors,
    title: "Background Removal",
    description: "Remove backgrounds instantly with precise AI-powered cutting.",
    status: "Available",
    color: "from-green-500 to-emerald-500", 
    features: ["One-click removal", "Edge detection", "Transparent PNG", "Batch processing"]
  },
  {
    icon: Layers3,
    title: "Image Segmentation",
    description: "Split images into editable fragments for precise manipulation.",
    status: "Coming Soon",
    color: "from-orange-500 to-red-500",
    features: ["Smart fragments", "Individual editing", "Object isolation", "Layer management"]
  },
  {
    icon: Image,
    title: "Image Cleanup",
    description: "Remove unwanted objects and text from your images seamlessly.",
    status: "Coming Soon", 
    color: "from-indigo-500 to-purple-500",
    features: ["Object removal", "Text erasure", "Smart inpainting", "Seamless fill"]
  },
  {
    icon: Palette,
    title: "Style Transfer",
    description: "Apply artistic styles and reimagine your images with AI creativity.",
    status: "Coming Soon",
    color: "from-pink-500 to-rose-500",
    features: ["Style variations", "Artistic filters", "Creative reimagining", "Custom styles"]
  }
];

const FeatureCards = () => {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Powerful <span className="text-gradient-ai">AI Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, edit, and enhance images with the power of artificial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-ai-feature group">
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge 
                    variant={feature.status === "Available" ? "default" : "secondary"}
                    className={feature.status === "Available" ? "bg-accent text-accent-foreground" : ""}
                  >
                    {feature.status}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Zap className="w-3 h-3 mr-2 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={feature.status === "Available" ? "default" : "secondary"}
                  disabled={feature.status !== "Available"}
                >
                  {feature.status === "Available" ? (
                    <>
                      Try Now <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "Coming Soon"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;