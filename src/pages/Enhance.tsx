import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sparkles, Upload, Download, RotateCcw, Zap } from "lucide-react";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import ImageComparison from "@/components/ImageComparison";
import demoBefore from "@/assets/demo-before.jpg";
import demoEnhanced from "@/assets/demo-enhanced.jpg";

const Enhance = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [sharpness, setSharpness] = useState([100]);
  const [upscale, setUpscale] = useState([2]);

  const handleImageSelect = (file: File) => {
    setUploadedImage(file);
    setEnhancedImage(null);
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setEnhancedImage(null);
  };

  const handleEnhance = async () => {
    if (!uploadedImage) return;
    
    setIsEnhancing(true);
    
    // Simulate enhancement process
    setTimeout(() => {
      setEnhancedImage(demoEnhanced);
      setIsEnhancing(false);
    }, 2500);
  };

  const handleReset = () => {
    setBrightness([100]);
    setContrast([100]);
    setSharpness([100]);
    setUpscale([2]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-ai">Image Enhancement</h1>
          </div>
          <p className="text-muted-foreground">Upscale and improve your images with AI</p>
          <Badge className="mt-2 bg-primary/10 text-primary">
            3/10 enhancements used today
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Upload Panel */}
          <div className="space-y-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-primary" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Upload your image to get started
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleImageRemove}
                  selectedImage={uploadedImage}
                  isProcessing={isEnhancing}
                  acceptedFormats={["image/jpeg", "image/png", "image/webp"]}
                  maxSize={10}
                />
              </CardContent>
            </Card>

            {/* Controls */}
            {uploadedImage && (
              <Card className="card-ai">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2" />
                    Enhancement Controls
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <Label>Upscale Factor: {upscale[0]}x</Label>
                    <Slider
                      value={upscale}
                      onValueChange={setUpscale}
                      min={1}
                      max={8}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Brightness: {brightness[0]}%</Label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      min={50}
                      max={150}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Contrast: {contrast[0]}%</Label>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      min={50}
                      max={150}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Sharpness: {sharpness[0]}%</Label>
                    <Slider
                      value={sharpness}
                      onValueChange={setSharpness}
                      min={50}
                      max={200}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleReset} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button 
                      onClick={handleEnhance}
                      disabled={isEnhancing}
                      className="flex-1 btn-ai-primary"
                    >
                      {isEnhancing ? (
                        <>
                          <div className="animate-spin w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enhance
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Before/After Comparison */}
          <div className="lg:col-span-2">
            <Card className="card-ai h-fit">
              <CardHeader>
                <CardTitle>Enhancement Preview</CardTitle>
                <CardDescription>
                  Compare your original and enhanced images
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ImageComparison
                  beforeImage={uploadedImage}
                  afterImage={enhancedImage}
                  isProcessing={isEnhancing}
                  onDownload={() => {
                    if (enhancedImage) {
                      const link = document.createElement('a');
                      link.href = enhancedImage;
                      link.download = `enhanced-${upscale[0]}x.jpg`;
                      link.click();
                    }
                  }}
                  onReset={() => setEnhancedImage(null)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhance;