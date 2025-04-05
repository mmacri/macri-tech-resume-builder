
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useExperienceManagement } from '@/hooks/useExperienceManagement';
import ExperienceTable from './experience/ExperienceTable';
import ExperienceFormDialog from './experience/ExperienceFormDialog';

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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Experience Management</h2>
        <Button onClick={handleNewItem} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Experience
        </Button>
      </div>

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
