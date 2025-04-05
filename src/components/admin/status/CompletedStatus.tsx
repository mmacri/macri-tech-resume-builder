
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const CompletedStatus = () => {
  return (
    <Alert className="mb-6 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
      <AlertTitle className="text-green-600">All Sections Populated!</AlertTitle>
      <AlertDescription>
        All resume sections, portfolio projects, and users are now populated with data. You can browse, edit, add, or delete items as needed.
      </AlertDescription>
    </Alert>
  );
};

export default CompletedStatus;
