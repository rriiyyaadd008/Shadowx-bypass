import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ConfigUpdatePayload {
  name?: string;
  tagline?: string;
  description?: string;
  apiKey?: string;
  apiEndpoint?: string;
}

export function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: config, isLoading } = useQuery({
    queryKey: ['/api/config'],
    enabled: open,
  });

  const [formData, setFormData] = useState({
    name: "ShadowX",
    tagline: "Advanced Shortlink Bypasser", 
    description: "The ultimate shortlink bypasser",
    apiKey: "",
    apiEndpoint: "https://api.bypass.vip/bypass"
  });

  // Update form data when config loads
  useEffect(() => {
    if (config && typeof config === 'object') {
      setFormData(prev => ({
        ...prev,
        name: (config as any).name || "ShadowX",
        tagline: (config as any).tagline || "Advanced Shortlink Bypasser",
        description: (config as any).description || "The ultimate shortlink bypasser"
      }));
    }
  }, [config]);

  const updateConfigMutation = useMutation({
    mutationFn: async (data: ConfigUpdatePayload) => {
      const response = await apiRequest("POST", "/api/config/update", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Configuration Updated",
        description: "Your settings have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/config'] });
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed", 
        description: error.message || "Failed to update configuration",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updateConfigMutation.mutate(formData);
  };

  const resetToDefaults = () => {
    setFormData({
      name: "ShadowX",
      tagline: "Advanced Shortlink Bypasser",
      description: "The ultimate shortlink bypasser", 
      apiKey: "",
      apiEndpoint: "https://api.bypass.vip/bypass"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed top-4 left-4 z-50 rounded-full glass-effect shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Website Configuration</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="api">API Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Website Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Website Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="ShadowX"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={formData.tagline}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    placeholder="Advanced Shortlink Bypasser"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="The ultimate shortlink bypasser"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Solar API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={formData.apiKey}
                    onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="SLR-xxxx-xxxx-xxxx-xxxx"
                  />
                  <p className="text-sm text-muted-foreground">
                    Current API key is configured. Enter a new key to change it.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">API Endpoint</Label>
                  <Input
                    id="apiEndpoint"
                    value={formData.apiEndpoint}
                    onChange={(e) => setFormData(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                    placeholder="https://api.bypass.vip/bypass"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={updateConfigMutation.isPending}
            className="flex items-center gap-2"
          >
            {updateConfigMutation.isPending ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}