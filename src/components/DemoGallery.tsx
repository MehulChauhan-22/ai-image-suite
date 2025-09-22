import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Grid3X3, 
  Download, 
  Eye,
  Calendar,
  Wand2,
  Sparkles,
  Scissors
} from "lucide-react";
import demoGenerated from "@/assets/demo-generated.jpg";
import demoEnhanced from "@/assets/demo-enhanced.jpg";
import demoNoBg from "@/assets/demo-no-bg.png";

const DemoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const demoImages = [
    {
      id: 1,
      title: "Futuristic Cityscape",
      type: "generation",
      category: "AI Generation",
      image: demoGenerated,
      date: "2 hours ago",
      size: "1024x576",
      downloads: 42
    },
    {
      id: 2,
      title: "Enhanced Portrait",
      type: "enhancement", 
      category: "Enhancement",
      image: demoEnhanced,
      date: "5 hours ago",
      size: "1024x1024",
      downloads: 38
    },
    {
      id: 3,
      title: "Product with No BG",
      type: "background-removal",
      category: "Background Removal", 
      image: demoNoBg,
      date: "1 day ago",
      size: "512x512",
      downloads: 67
    },
    {
      id: 4,
      title: "Artistic Landscape",
      type: "generation",
      category: "AI Generation",
      image: demoGenerated,
      date: "2 days ago", 
      size: "1024x576",
      downloads: 29
    },
    {
      id: 5,
      title: "Clear Face Enhancement",
      type: "enhancement",
      category: "Enhancement",
      image: demoEnhanced,
      date: "3 days ago",
      size: "2048x2048", 
      downloads: 51
    },
    {
      id: 6,
      title: "Transparent Object",
      type: "background-removal",
      category: "Background Removal",
      image: demoNoBg,
      date: "4 days ago",
      size: "512x512",
      downloads: 73
    }
  ];

  const categories = [
    { value: "all", label: "All Projects", count: demoImages.length },
    { value: "generation", label: "AI Generated", count: demoImages.filter(img => img.type === "generation").length },
    { value: "enhancement", label: "Enhanced", count: demoImages.filter(img => img.type === "enhancement").length },
    { value: "background-removal", label: "Background Removed", count: demoImages.filter(img => img.type === "background-removal").length }
  ];

  const filteredImages = selectedCategory === "all" 
    ? demoImages 
    : demoImages.filter(img => img.type === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "generation": return <Wand2 className="w-4 h-4" />;
      case "enhancement": return <Sparkles className="w-4 h-4" />;
      case "background-removal": return <Scissors className="w-4 h-4" />;
      default: return <Grid3X3 className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "generation": return "from-purple-500 to-pink-500";
      case "enhancement": return "from-blue-500 to-cyan-500"; 
      case "background-removal": return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gradient-ai">Project Gallery</h2>
          <p className="text-muted-foreground">Your AI-created masterpieces</p>
        </div>
        <Badge className="bg-primary/10 text-primary">
          {filteredImages.length} projects
        </Badge>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
            className={selectedCategory === category.value ? "btn-ai-primary" : ""}
          >
            {category.label}
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="card-ai group overflow-hidden">
            <div className="relative overflow-hidden">
              <img 
                src={image.image} 
                alt={image.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button size="sm" variant="secondary">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="secondary">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r ${getTypeColor(image.type)} text-white text-xs font-medium`}>
                  {getTypeIcon(image.type)}
                  <span>{image.category}</span>
                </div>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-1">{image.title}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{image.date}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {image.size}
                </Badge>
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <Download className="w-4 h-4 inline mr-1" />
                  {image.downloads} downloads
                </div>
                <Button size="sm" variant="ghost" className="h-8 text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <Card className="card-ai">
          <CardContent className="p-12 text-center">
            <Grid3X3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No projects in this category</h3>
            <p className="text-muted-foreground mb-6">
              Create your first {selectedCategory === "all" ? "" : selectedCategory.replace("-", " ")} project to see it here.
            </p>
            <Button className="btn-ai-primary">
              <Wand2 className="w-4 h-4 mr-2" />
              Start Creating
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DemoGallery;