
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAbout from './resume/AdminAbout';
import AdminExperience from './resume/AdminExperience';
import AdminEducation from './resume/AdminEducation';
import AdminSkills from './resume/AdminSkills';
import AdminInterests from './resume/AdminInterests';
import AdminAwards from './resume/AdminAwards';
import { AdminUpdateProvider, useAdminUpdate } from '@/contexts/AdminUpdateContext';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const AdminResume = () => {
  const [activeTab, setActiveTab] = useState("about");
  
  // Read activeTab from localStorage if it was set (for direct navigation to a tab)
  useEffect(() => {
    const savedTab = localStorage.getItem('activeResumeTab');
    if (savedTab) {
      setActiveTab(savedTab);
      localStorage.removeItem('activeResumeTab'); // Clear after use
    }
  }, []);

  return (
    <AdminUpdateProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Resume Management</h1>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <UpdateTargetSelector />
          </CardContent>
        </Card>

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
    </AdminUpdateProvider>
  );
};

// Component for selecting which pages to update
const UpdateTargetSelector = () => {
  const { updateResume, updateIndex, toggleUpdateResume, toggleUpdateIndex } = useAdminUpdate();

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-lg font-medium">Update Target Pages</h2>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="updateResume" checked={updateResume} onCheckedChange={toggleUpdateResume} />
          <Label htmlFor="updateResume">Update Resume Page</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="updateIndex" checked={updateIndex} onCheckedChange={toggleUpdateIndex} />
          <Label htmlFor="updateIndex">Update Index Page</Label>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Select which pages should be updated when making changes. The Resume page will always reflect admin dashboard data
        if no options are selected.
      </p>
    </div>
  );
};

export default AdminResume;
