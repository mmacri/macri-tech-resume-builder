
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminExperience from './resume/AdminExperience';

const AdminResume = () => {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resume Section Manager</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="experience">
          <AdminExperience />
        </TabsContent>
        
        <TabsContent value="education">
          <div className="p-4 text-center text-gray-500">
            Education section management will be implemented soon.
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <div className="p-4 text-center text-gray-500">
            Skills section management will be implemented soon.
          </div>
        </TabsContent>
        
        <TabsContent value="interests">
          <div className="p-4 text-center text-gray-500">
            Interests section management will be implemented soon.
          </div>
        </TabsContent>
        
        <TabsContent value="awards">
          <div className="p-4 text-center text-gray-500">
            Awards section management will be implemented soon.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminResume;
