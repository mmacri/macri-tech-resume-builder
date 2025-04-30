
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash } from 'lucide-react';

interface ReferencesTabProps {
  references: string[];
  updateReferences: (refs: string[]) => void;
}

const ReferencesTab: React.FC<ReferencesTabProps> = ({ references, updateReferences }) => {
  const handleAddReference = () => {
    updateReferences([...references, '']);
  };

  const handleRemoveReference = (index: number) => {
    updateReferences(references.filter((_, i) => i !== index));
  };

  const handleUpdateReference = (index: number, value: string) => {
    const newReferences = [...references];
    newReferences[index] = value;
    updateReferences(newReferences);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>References</CardTitle>
        <CardDescription>Edit the references displayed in the About section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {references.map((reference, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={reference}
                onChange={(e) => handleUpdateReference(index, e.target.value)}
                placeholder="Reference quote"
                className="flex-1"
                rows={4}
                required
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveReference(index)}
                disabled={references.length <= 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddReference}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add Reference
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferencesTab;
