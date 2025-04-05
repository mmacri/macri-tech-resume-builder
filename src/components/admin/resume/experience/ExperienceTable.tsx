
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { ExperienceItem } from '@/hooks/resume/useExperienceItems';

interface ExperienceTableProps {
  items: ExperienceItem[] | null;
  isLoading: boolean;
  onEdit: (item: ExperienceItem) => void;
  onDelete: (id: string) => void;
  onMoveUp: (item: ExperienceItem, index: number) => void;
  onMoveDown: (item: ExperienceItem, index: number) => void;
}

const ExperienceTable: React.FC<ExperienceTableProps> = ({
  items,
  isLoading,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  if (isLoading) {
    return <div>Loading experience items...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Period</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="w-24">
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={index === 0}
                    onClick={() => onMoveUp(item, index)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={!items || index === items.length - 1}
                    onClick={() => onMoveDown(item, index)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.organization || '-'}</TableCell>
              <TableCell>
                {item.start_date && `${item.start_date}`}
                {item.end_date && ` - ${item.end_date}`}
                {!item.start_date && !item.end_date && '-'}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">No experience items found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ExperienceTable;
