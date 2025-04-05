
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAbout from './resume/AdminAbout';
import AdminExperience from './resume/AdminExperience';
import AdminEducation from './resume/AdminEducation';
import AdminSkills from './resume/AdminSkills';
import AdminInterests from './resume/AdminInterests';
import AdminAwards from './resume/AdminAwards';

const AdminResume = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Resume Management</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about">
          <AdminAbout />
        </TabsContent>
        
        <TabsContent value="experience">
          <AdminExperience />
        </TabsContent>
        
        <TabsContent value="education">
          <AdminEducation />
        </TabsContent>
        
        <TabsContent value="skills">
          <AdminSkills />
        </TabsContent>
        
        <TabsContent value="interests">
          <AdminInterests />
        </TabsContent>
        
        <TabsContent value="awards">
          <AdminAwards />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminResume;
