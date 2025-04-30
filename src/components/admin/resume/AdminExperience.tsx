
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useExperienceManagement } from '@/hooks/useExperienceManagement';
import ExperienceTable from './experience/ExperienceTable';
import ExperienceFormDialog from './experience/ExperienceFormDialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const AdminExperience = () => {
  const {
    items,
    isItemsLoading,
    isDialogOpen,
    setIsDialogOpen,
    currentItem,
    setCurrentItem,
    mutation,
    handleNewItem,
    handleEditItem,
    handleDeleteItem,
    handleMoveUp,
    handleMoveDown,
    handleSubmit
  } = useExperienceManagement();

  // Check if there are items on initial load
  useEffect(() => {
    if (!isItemsLoading && (!items || items.length === 0)) {
      console.log("No experience items found in AdminExperience component");
    } else if (!isItemsLoading && items && items.length > 0) {
      console.log(`Found ${items.length} experience items in AdminExperience`);
      console.log('First item:', items[0]);
    }
  }, [items, isItemsLoading]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experience Management</h2>
        <Button onClick={handleNewItem} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Experience
        </Button>
      </div>

      {!isItemsLoading && (!items || items.length === 0) && (
        <Alert className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>No experience items found</AlertTitle>
          <AlertDescription>
            You don't have any experiences yet. Click "New Experience" to add your first experience item.
            If you believe this is an error, try reinitializing your resume data from the Admin Dashboard.
          </AlertDescription>
        </Alert>
      )}

      <ExperienceTable 
        items={items}
        isLoading={isItemsLoading}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ExperienceFormDialog
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          handleSubmit={handleSubmit}
          isPending={mutation.isPending}
          onClose={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default AdminExperience;
