
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash } from 'lucide-react';

interface SuccessTabProps {
  successItems: string[];
  updateSuccessItems: (items: string[]) => void;
}

const SuccessTab: React.FC<SuccessTabProps> = ({ successItems, updateSuccessItems }) => {
  const handleAddSuccess = () => {
    updateSuccessItems([...successItems, '']);
  };

  const handleRemoveSuccess = (index: number) => {
    updateSuccessItems(successItems.filter((_, i) => i !== index));
  };

  const handleUpdateSuccess = (index: number, value: string) => {
    const newSuccess = [...successItems];
    newSuccess[index] = value;
    updateSuccessItems(newSuccess);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demonstrated Success</CardTitle>
        <CardDescription>Edit your success highlights displayed in the About section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Format as: "Category: Description" (e.g. "Solutions through Software Development: Created...") </p>
          {successItems.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={item}
                onChange={(e) => handleUpdateSuccess(index, e.target.value)}
                placeholder="Success: Description"
                className="flex-1"
                required
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveSuccess(index)}
                disabled={successItems.length <= 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddSuccess}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add Success Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessTab;
