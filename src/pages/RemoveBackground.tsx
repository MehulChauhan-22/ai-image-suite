import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scissors, Upload, Download, Palette, Wand2 } from "lucide-react";
import Header from "@/components/Header";
import demoBefore from "@/assets/demo-before.jpg";
import demoNoBg from "@/assets/demo-no-bg.png";

const RemoveBackground = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [backgroundType, setBackgroundType] = useState("transparent");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Demo: Use demo image instead of actual upload
      setUploadedImage(demoBefore);
      setProcessedImage(null);
    }
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
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop your image here, or click to select
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Works best with clear subjects (people, objects, products)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Image
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img 
                      src={uploadedImage} 
                      alt="Original"
                      className="w-full rounded-lg"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUploadedImage(null);
                        setProcessedImage(null);
                      }}
                      className="w-full"
                    >
                      Upload Different Image
                    </Button>
                  </div>
                )}
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
                {!uploadedImage && !isProcessing && (
                  <div className="aspect-[16/10] bg-muted/30 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Scissors className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Upload an image to see background removal in action</p>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="aspect-[16/10] bg-muted/30 rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <p className="text-primary font-medium">Removing background...</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Analyzing image and extracting subject
                      </p>
                    </div>
                  </div>
                )}

                {uploadedImage && !isProcessing && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Original */}
                      <div>
                        <div className="mb-2">
                          <span className="text-sm font-medium">Original</span>
                        </div>
                        <img 
                          src={uploadedImage} 
                          alt="Original"
                          className="w-full rounded-lg shadow-sm"
                        />
                      </div>

                      {/* Processed */}
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Background Removed</span>
                          {processedImage && (
                            <Badge className="bg-primary/10 text-primary">
                              {backgroundType === "transparent" ? "PNG" : "JPG"}
                            </Badge>
                          )}
                        </div>
                        {processedImage ? (
                          <div className="relative group">
                            <div 
                              className="w-full rounded-lg shadow-sm overflow-hidden"
                              style={{
                                backgroundImage: backgroundType === "transparent" 
                                  ? "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)"
                                  : backgroundType === "custom"
                                  ? `solid ${backgroundColor}`
                                  : backgroundType === "white"
                                  ? "#ffffff"
                                  : backgroundType === "black"
                                  ? "#000000"
                                  : backgroundType === "gradient"
                                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                  : "transparent",
                                backgroundSize: backgroundType === "transparent" ? "20px 20px" : "cover",
                                backgroundPosition: backgroundType === "transparent" ? "0 0, 0 10px, 10px -10px, -10px 0px" : "center"
                              }}
                            >
                              <img 
                                src={processedImage} 
                                alt="Background removed"
                                className="w-full"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button variant="secondary">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
                            <span className="text-muted-foreground text-sm">Processed image will appear here</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {processedImage && (
                      <div className="flex gap-4 justify-center">
                        <Button className="btn-ai-primary">
                          <Download className="w-4 h-4 mr-2" />
                          Download {backgroundType === "transparent" ? "PNG" : "JPG"}
                        </Button>
                        <Button variant="outline">
                          <Wand2 className="w-4 h-4 mr-2" />
                          Try Different Background
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;