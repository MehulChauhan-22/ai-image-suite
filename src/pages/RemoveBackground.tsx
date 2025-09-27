import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scissors, Upload, Download, Palette, Wand2 } from "lucide-react";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import ImageComparison from "@/components/ImageComparison";
import demoBefore from "@/assets/demo-before.jpg";
import demoNoBg from "@/assets/demo-no-bg.png";

const RemoveBackground = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [backgroundType, setBackgroundType] = useState("transparent");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleImageSelect = (file: File) => {
    setUploadedImage(file);
    setProcessedImage(null);
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setProcessedImage(null);
  };

  const handleRemoveBackground = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    
    // Simulate background removal process
    setTimeout(() => {
      setProcessedImage(demoNoBg);
      setIsProcessing(false);
    }, 2000);
  };

  const backgroundOptions = [
    { value: "transparent", label: "Transparent" },
    { value: "white", label: "White" },
    { value: "black", label: "Black" },
    { value: "custom", label: "Custom Color" },
    { value: "gradient", label: "Gradient" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-ai">Background Removal</h1>
          </div>
          <p className="text-muted-foreground">Remove and replace backgrounds with AI precision</p>
          <Badge className="mt-2 bg-primary/10 text-primary">
            5/10 removals used today
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Upload & Controls Panel */}
          <div className="space-y-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-primary" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Choose an image to remove its background
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleImageRemove}
                  selectedImage={uploadedImage}
                  isProcessing={isProcessing}
                  acceptedFormats={["image/jpeg", "image/png", "image/webp"]}
                  maxSize={10}
                />
              </CardContent>
            </Card>

            {/* Background Options */}
            {uploadedImage && (
              <Card className="card-ai">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Palette className="w-5 h-5 mr-2" />
                    Background Options
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="background-type">Background Type</Label>
                    <Select value={backgroundType} onValueChange={setBackgroundType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {backgroundOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {backgroundType === "custom" && (
                    <div>
                      <Label htmlFor="color-picker">Custom Color</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <input
                          type="text"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-md text-sm"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleRemoveBackground}
                    disabled={isProcessing}
                    className="w-full btn-ai-primary"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Scissors className="w-4 h-4 mr-2" />
                        Remove Background
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="text-lg">Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Use high-contrast images with clear subject boundaries</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Works best with people, products, and distinct objects</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Avoid complex or busy backgrounds for cleaner results</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-2">
            <Card className="card-ai h-fit">
              <CardHeader>
                <CardTitle>Background Removal Result</CardTitle>
                <CardDescription>
                  Compare your original and processed images
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ImageComparison
                  beforeImage={uploadedImage}
                  afterImage={processedImage}
                  isProcessing={isProcessing}
                  onDownload={() => {
                    if (processedImage) {
                      const link = document.createElement('a');
                      link.href = processedImage;
                      link.download = `no-background.${backgroundType === "transparent" ? "png" : "jpg"}`;
                      link.click();
                    }
                  }}
                  onReset={() => setProcessedImage(null)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;