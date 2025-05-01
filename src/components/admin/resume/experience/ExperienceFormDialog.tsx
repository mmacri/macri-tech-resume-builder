
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ExperienceItem } from '@/hooks/resume/useExperienceItems';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';

interface ExperienceFormDialogProps {
  currentItem: Partial<ExperienceItem> | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<Partial<ExperienceItem> | null>>;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  onClose: () => void;
}

const ExperienceFormDialog: React.FC<ExperienceFormDialogProps> = ({
  currentItem,
  setCurrentItem,
  handleSubmit,
  isPending,
  onClose
}) => {
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    return dateString;
  };

  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>{currentItem?.id ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              value={currentItem?.title || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
              placeholder="Job Title"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="organization">Organization</label>
            <Input
              id="organization"
              value={currentItem?.organization || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, organization: e.target.value })}
              placeholder="Company Name"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="location">Location</label>
            <Input
              id="location"
              value={currentItem?.location || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
              placeholder="City, State or Remote"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="start_date">Start Date</label>
              <Input
                id="start_date"
                type="date"
                value={formatDate(currentItem?.start_date)}
                onChange={(e) => setCurrentItem({ ...currentItem, start_date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="end_date">End Date</label>
              <Input
                id="end_date"
                type="date"
                value={formatDate(currentItem?.end_date)}
                onChange={(e) => setCurrentItem({ ...currentItem, end_date: e.target.value })}
                placeholder="Leave blank for 'Present'"
              />
              <p className="text-xs text-gray-500">Leave blank for 'Present'</p>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={currentItem?.description || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              placeholder="Job description and accomplishments (use line breaks between bullet points)"
              rows={10}
              className="font-mono text-sm"
            />
            <div className="text-xs text-gray-500 space-y-1">
              <p>Enter each bullet point on a new line. They will be displayed as a list.</p>
              <p>Example:</p>
              <pre className="bg-gray-100 p-2 rounded text-xs">
                Led internal design and consultative solutioning for GRC modules.
                Collaborated with stakeholders across multiple departments.
                Created and managed PolicyHub 1.0, simplifying access to policies.
              </pre>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Experience'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ExperienceFormDialog;
