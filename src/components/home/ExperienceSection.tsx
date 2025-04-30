
import React, { useEffect } from 'react';
import { format, parse } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ExperienceSectionProps {
  items: any[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ items = [] }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  // Log items for debugging
  useEffect(() => {
    console.log('Experience items received in ExperienceSection component:', items);
    if (items && items.length > 0) {
      console.log('First experience item details:', items[0]);
    } else {
      console.log('No experience items found in ExperienceSection component');
    }
  }, [items]);
  
  // Function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    try {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      return format(date, 'MMM yyyy');
    } catch (e) {
      console.error('Error formatting date:', e, dateString);
      return dateString;
    }
  };

  // Function to format date range
  const formatDateRange = (startDate: string | null, endDate: string | null) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  // If items is not an array or is empty, show a message only in admin mode
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <section className="resume-section" id="experience">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Experience</h2>
          <div className="p-6 border rounded-lg bg-gray-50">
            {isAdmin ? (
              <Alert variant="warning" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Resume Data Not Found</AlertTitle>
                <AlertDescription>
                  No experience data is available. Please initialize your resume data from the Admin Dashboard.
                </AlertDescription>
              </Alert>
            ) : (
              <p className="text-gray-600">Experience information coming soon...</p>
            )}
            
            {isAdmin && (
              <div className="mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/admin-dashboard')}
                >
                  Go to Admin Dashboard
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Tip: Click "Reset Resume Data" in the Admin Dashboard to initialize all sections with sample data.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="resume-section" id="experience">
      <div className="resume-section-content px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-8">Experience</h2>

        {items.map((item, index) => (
          <div key={item.id || index} className="card mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-macri-primary text-sm">
                  {formatDateRange(item.start_date, item.end_date)}
                </p>
              </div>
              <h5 className="text-base font-normal text-gray-600 mb-3">{item.organization}</h5>
              {item.description && (
                <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                  {item.description.split('\n').map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
