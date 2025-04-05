
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface InitializeDataOptions {
  force?: boolean;
}

export const useInitializeResumeData = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  
  const initializeData = async (options: InitializeDataOptions = {}) => {
    setIsInitializing(true);
    
    try {
      // First, check if resume sections exist
      const { data: existingSections, error: checkError } = await supabase
        .from('resume_sections')
        .select('section_name');
      
      if (checkError) {
        throw checkError;
      }
      
      // If there are no sections or force option is true, initialize all sections
      if (!existingSections?.length || options.force) {
        console.log('Initializing resume sections...');
        
        // Define sections with display order
        const resumeSections = [
          { section_name: 'about', display_order: 1 },
          { section_name: 'experience', display_order: 2 },
          { section_name: 'education', display_order: 3 },
          { section_name: 'skills', display_order: 4 },
          { section_name: 'interests', display_order: 5 },
          { section_name: 'awards', display_order: 6 }
        ];
        
        // If force is true, delete existing sections first
        if (options.force && existingSections?.length) {
          const { error: deleteError } = await supabase
            .from('resume_sections')
            .delete()
            .in('section_name', resumeSections.map(s => s.section_name));
            
          if (deleteError) {
            throw deleteError;
          }
        }
        
        // Create sections
        const { error: insertError } = await supabase
          .from('resume_sections')
          .insert(resumeSections);
        
        if (insertError) {
          throw insertError;
        }
        
        // Now fetch the created sections to get their IDs
        const { data: sections, error: fetchError } = await supabase
          .from('resume_sections')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (fetchError || !sections) {
          throw fetchError || new Error('Failed to fetch sections after creation');
        }
        
        // Initialize sample data for each section
        await Promise.all(sections.map(async (section) => {
          switch(section.section_name) {
            case 'about':
              await initializeAboutSection(section.id);
              break;
            case 'experience':
              await initializeExperienceSection(section.id);
              break;
            case 'education':
              await initializeEducationSection(section.id);
              break;
            case 'skills':
              await initializeSkillsSection(section.id);
              break;
            case 'interests':
              await initializeInterestsSection(section.id);
              break;
            case 'awards':
              await initializeAwardsSection(section.id);
              break;
          }
        }));
        
        toast.success('Resume data initialized successfully!');
      } else {
        console.log('Resume sections already exist, checking for sample data...');
        // Ensure sample data exists for each section
        // First, fetch sections with their IDs
        const { data: sectionsWithIds, error: fetchError } = await supabase
          .from('resume_sections')
          .select('*');
          
        if (fetchError) {
          throw fetchError;
        }
        
        // Then check each section for data
        for (const section of sectionsWithIds) {
          const { count, error } = await supabase
            .from('resume_items')
            .select('*', { count: 'exact', head: true })
            .eq('section_id', section.id);
            
          if (error) {
            console.error(`Error checking items for section ${section.section_name}:`, error);
            continue;
          }
          
          if (count === 0) {
            // Initialize sample data for this section
            switch(section.section_name) {
              case 'about':
                await initializeAboutSection(section.id);
                break;
              case 'experience':
                await initializeExperienceSection(section.id);
                break;
              case 'education':
                await initializeEducationSection(section.id);
                break;
              case 'skills':
                await initializeSkillsSection(section.id);
                break;
              case 'interests':
                await initializeInterestsSection(section.id);
                break;
              case 'awards':
                await initializeAwardsSection(section.id);
                break;
            }
          }
        }
        toast.success('Resume data checked and updated successfully!');
      }
    } catch (error) {
      console.error('Error initializing resume data:', error);
      toast.error(`Failed to initialize resume data: ${error.message}`);
    } finally {
      setIsInitializing(false);
    }
  };
  
  const mutation = useMutation({
    mutationFn: initializeData
  });
  
  return {
    initializeData: mutation.mutate,
    isInitializing: isInitializing || mutation.isPending
  };
};

// Helper functions for initializing different section types
async function initializeAboutSection(sectionId: string) {
  const sampleAbout = {
    title: 'John Doe',
    description: 'I am an experienced full-stack developer with a passion for creating clean, efficient, and user-friendly applications. With expertise in React, Node.js, and modern web technologies, I deliver robust solutions that meet business needs while providing excellent user experiences.',
    section_id: sectionId,
    display_order: 1
  };
  
  const { error } = await supabase
    .from('resume_items')
    .insert(sampleAbout);
    
  if (error) {
    console.error('Error initializing about section:', error);
  }
}

async function initializeExperienceSection(sectionId: string) {
  const sampleExperiences = [
    {
      title: 'Senior Web Developer',
      organization: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      start_date: '2020-01-01',
      end_date: null,
      description: 'Led development of enterprise web applications using React and Node.js. Managed a team of 5 developers and implemented CI/CD pipelines.',
      section_id: sectionId,
      display_order: 1
    },
    {
      title: 'Frontend Developer',
      organization: 'Creative Digital Agency',
      location: 'Boston, MA',
      start_date: '2018-03-01',
      end_date: '2019-12-31',
      description: 'Developed responsive web interfaces for various clients using modern JavaScript frameworks and CSS preprocessors.',
      section_id: sectionId,
      display_order: 2
    },
    {
      title: 'Junior Developer',
      organization: 'Startup Innovations',
      location: 'Austin, TX',
      start_date: '2016-06-01',
      end_date: '2018-02-28',
      description: 'Assisted in developing web applications and implemented UI designs using HTML, CSS, and JavaScript.',
      section_id: sectionId,
      display_order: 3
    }
  ];
  
  for (const experience of sampleExperiences) {
    const { error } = await supabase
      .from('resume_items')
      .insert(experience);
      
    if (error) {
      console.error('Error initializing experience:', error);
    }
  }
}

async function initializeEducationSection(sectionId: string) {
  const sampleEducation = [
    {
      title: 'Master of Computer Science',
      organization: 'Stanford University',
      location: 'Stanford, CA',
      start_date: '2014-09-01',
      end_date: '2016-06-30',
      description: 'Focus on Artificial Intelligence and Machine Learning',
      section_id: sectionId,
      display_order: 1
    },
    {
      title: 'Bachelor of Science in Computer Engineering',
      organization: 'MIT',
      location: 'Cambridge, MA',
      start_date: '2010-09-01',
      end_date: '2014-06-30',
      description: 'Graduated with honors, 3.85 GPA',
      section_id: sectionId,
      display_order: 2
    }
  ];
  
  for (const education of sampleEducation) {
    const { error } = await supabase
      .from('resume_items')
      .insert(education);
      
    if (error) {
      console.error('Error initializing education:', error);
    }
  }
}

async function initializeSkillsSection(sectionId: string) {
  const sampleSkills = [
    {
      title: 'React',
      organization: 'Programming Languages & Tools',
      section_id: sectionId,
      display_order: 1
    },
    {
      title: 'TypeScript',
      organization: 'Programming Languages & Tools',
      section_id: sectionId,
      display_order: 2
    },
    {
      title: 'Node.js',
      organization: 'Programming Languages & Tools',
      section_id: sectionId,
      display_order: 3
    },
    {
      title: 'Agile Development',
      organization: 'Methodologies and Focus',
      section_id: sectionId,
      display_order: 4
    },
    {
      title: 'Tailwind CSS',
      organization: 'Frameworks',
      section_id: sectionId,
      display_order: 5
    }
  ];
  
  for (const skill of sampleSkills) {
    const { error } = await supabase
      .from('resume_items')
      .insert(skill);
      
    if (error) {
      console.error('Error initializing skill:', error);
    }
  }
}

async function initializeInterestsSection(sectionId: string) {
  const sampleInterests = [
    {
      title: 'Interest Paragraph',
      description: 'Outside of work, I enjoy hiking and exploring the outdoors. Photography has become a recent passion of mine, allowing me to capture the natural beauty I encounter during my adventures.',
      section_id: sectionId,
      display_order: 1
    },
    {
      title: 'Interest Paragraph',
      description: 'I\'m also an avid reader of science fiction and technology books. When I\'m not coding or hiking, you can find me playing chess or experimenting with new cooking recipes.',
      section_id: sectionId,
      display_order: 2
    }
  ];
  
  for (const interest of sampleInterests) {
    const { error } = await supabase
      .from('resume_items')
      .insert(interest);
      
    if (error) {
      console.error('Error initializing interest:', error);
    }
  }
}

async function initializeAwardsSection(sectionId: string) {
  const sampleAwards = [
    {
      title: 'Google Certified Professional Cloud Architect',
      section_id: sectionId,
      display_order: 1
    },
    {
      title: 'AWS Certified Solutions Architect',
      section_id: sectionId,
      display_order: 2
    },
    {
      title: 'Microsoft Certified: Azure Developer Associate',
      section_id: sectionId,
      display_order: 3
    },
    {
      title: 'Innovation Award - Tech Conference 2023',
      section_id: sectionId,
      display_order: 4
    }
  ];
  
  for (const award of sampleAwards) {
    const { error } = await supabase
      .from('resume_items')
      .insert(award);
      
    if (error) {
      console.error('Error initializing award:', error);
    }
  }
}
