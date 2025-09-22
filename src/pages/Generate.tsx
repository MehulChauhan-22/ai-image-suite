import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Download, Sparkles, Shuffle, Settings2 } from "lucide-react";
import Header from "@/components/Header";
import demoGenerated from "@/assets/demo-generated.jpg";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API call with demo response
    setTimeout(() => {
      setGeneratedImage(demoGenerated);
      setIsGenerating(false);
    }, 3000);
  };

  const styles = [
    { value: "realistic", label: "Realistic" },
    { value: "artistic", label: "Artistic" },
    { value: "cartoon", label: "Cartoon" },
    { value: "abstract", label: "Abstract" },
    { value: "cyberpunk", label: "Cyberpunk" },
    { value: "fantasy", label: "Fantasy" }
  ];

  const ratios = [
    { value: "1:1", label: "Square (1:1)" },
    { value: "16:9", label: "Landscape (16:9)" },
    { value: "9:16", label: "Portrait (9:16)" },
    { value: "4:3", label: "Standard (4:3)" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-ai">AI Image Generation</h1>
          </div>
          <p className="text-muted-foreground">Create stunning images from text descriptions</p>
          <Badge className="mt-2 bg-primary/10 text-primary">
            8/10 generations used today
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  Create Your Image
                </CardTitle>
                <CardDescription>
                  Describe what you want to see and let AI bring it to life
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div>
                  <Label htmlFor="prompt">Prompt *</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A futuristic city at sunset with flying cars and neon lights"
                    className="min-h-20"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific for better results
                  </p>
                </div>

                {/* Style Selection */}
                <div>
                  <Label htmlFor="style">Art Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <Label htmlFor="ratio">Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ratios.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full btn-ai-primary"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Settings2 className="w-5 h-5 mr-2" />
                  Advanced Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="negative">Negative Prompt</Label>
                  <Input 
                    id="negative"
                    placeholder="e.g., blurry, low quality, distorted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    What you don't want in the image
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="seed">Seed (Optional)</Label>
                  <Input 
                    id="seed"
                    type="number"
                    placeholder="Leave empty for random"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  Your AI-created masterpiece will appear here
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {!generatedImage && !isGenerating && (
                  <div className="aspect-square bg-muted/30 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a prompt and click generate to create your image</p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="aspect-square bg-muted/30 rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <p className="text-primary font-medium">Creating your image...</p>
                      <p className="text-sm text-muted-foreground mt-1">This may take a few seconds</p>
                    </div>
                  </div>
                )}

                {generatedImage && (
                  <div className="space-y-4">
                    <div className="relative group">
                      <img 
                        src={generatedImage} 
                        alt="Generated artwork"
                        className="w-full rounded-lg shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button variant="secondary">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 btn-ai-primary">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline">
                        <Shuffle className="w-4 h-4 mr-2" />
                        Variations
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Generations */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="text-lg">Recent Generations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;