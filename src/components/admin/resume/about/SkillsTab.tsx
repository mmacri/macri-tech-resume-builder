
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash } from 'lucide-react';

interface SkillsTabProps {
  skillsItems: string[];
  updateSkills: (skills: string[]) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({ skillsItems, updateSkills }) => {
  const handleAddSkill = () => {
    updateSkills([...skillsItems, '']);
  };

  const handleRemoveSkill = (index: number) => {
    updateSkills(skillsItems.filter((_, i) => i !== index));
  };

  const handleUpdateSkill = (index: number, value: string) => {
    const newSkills = [...skillsItems];
    newSkills[index] = value;
    updateSkills(newSkills);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skilled In</CardTitle>
        <CardDescription>Edit the skills displayed in your About section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Format as: "Category: Description"</p>
          {skillsItems.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={skill}
                onChange={(e) => handleUpdateSkill(index, e.target.value)}
                placeholder="Skill: Description"
                className="flex-1"
                required
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveSkill(index)}
                disabled={skillsItems.length <= 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddSkill}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsTab;
