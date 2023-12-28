"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { EditColumn } from "./edit-column";
import { Column } from "@prisma/client";

interface ColumnOptionsProps {
  column: Column;
  onCardAdd: () => void;
}

function ColumnOptions({ column, onCardAdd }: ColumnOptionsProps) {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [isDeletingColumn, setIsDeletingColumn] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  async function deleteColumn() {
    setIsDeletingColumn(true);
    try {
      await axios.delete(`/api/column/${column.id}`);
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while deleting the column",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirmationModal(false);
      setIsDeletingColumn(false);
    }
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <BsThreeDots size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsEditingColumn(true)}
          >
            Edit Column
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onCardAdd}>
            Add Card
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:text-red-500"
            onClick={() => setShowDeleteConfirmationModal(true)}
          >
            Delete Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={showDeleteConfirmationModal}
        onOpenChange={(open) => setShowDeleteConfirmationModal(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting the column will also delete all the cards inside it. This
              action cannot be reversed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteColumn}>
              {isDeletingColumn ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <EditColumn
        column={column}
        open={isEditingColumn}
        setOpen={(open) => setIsEditingColumn(open)}
      />
    </div>
  );
}

export { ColumnOptions };
