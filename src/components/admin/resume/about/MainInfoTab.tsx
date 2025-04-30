
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash } from 'lucide-react';
import { AboutData } from './types';

interface MainInfoTabProps {
  aboutData: AboutData;
  setAboutData: React.Dispatch<React.SetStateAction<AboutData>>;
}

const MainInfoTab: React.FC<MainInfoTabProps> = ({ aboutData, setAboutData }) => {
  const handleAddLocation = () => {
    setAboutData({
      ...aboutData,
      locations: [...aboutData.locations, '']
    });
  };

  const handleRemoveLocation = (index: number) => {
    setAboutData({
      ...aboutData,
      locations: aboutData.locations.filter((_, i) => i !== index)
    });
  };

  const handleUpdateLocation = (index: number, value: string) => {
    const newLocations = [...aboutData.locations];
    newLocations[index] = value;
    setAboutData({
      ...aboutData,
      locations: newLocations
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Information</CardTitle>
        <CardDescription>Edit your main information displayed in the About section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="name">Full Name</label>
          <Input
            id="name"
            value={aboutData.full_name}
            onChange={(e) => setAboutData({...aboutData, full_name: e.target.value})}
            placeholder="Your full name"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="headline">Headline (Optional)</label>
          <Input
            id="headline"
            value={aboutData.headline}
            onChange={(e) => setAboutData({...aboutData, headline: e.target.value})}
            placeholder="Your headline or tagline"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="intro">Introduction</label>
          <Textarea
            id="intro"
            value={aboutData.intro_text}
            onChange={(e) => setAboutData({...aboutData, intro_text: e.target.value})}
            placeholder="Write something about yourself..."
            rows={4}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <label>Locations</label>
          <div className="space-y-2">
            {aboutData.locations.map((location, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={location}
                  onChange={(e) => handleUpdateLocation(index, e.target.value)}
                  placeholder="Location"
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveLocation(index)}
                  disabled={aboutData.locations.length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddLocation}
              className="flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainInfoTab;
