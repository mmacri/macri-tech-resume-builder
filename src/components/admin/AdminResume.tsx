
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminAbout from './resume/AdminAbout';
import AdminExperience from './resume/AdminExperience';
import AdminEducation from './resume/AdminEducation';
import AdminSkills from './resume/AdminSkills';
import AdminInterests from './resume/AdminInterests';
import AdminAwards from './resume/AdminAwards';

const AdminResume = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume Management</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-4">
          <AdminAbout />
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-4">
          <AdminExperience />
        </TabsContent>
        
        <TabsContent value="education" className="space-y-4">
          <AdminEducation />
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <AdminSkills />
        </TabsContent>
        
        <TabsContent value="interests" className="space-y-4">
          <AdminInterests />
        </TabsContent>
        
        <TabsContent value="awards" className="space-y-4">
          <AdminAwards />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminResume;
