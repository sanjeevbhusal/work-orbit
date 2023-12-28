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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteCardProps {
  cardId: string;
}

function DeleteCard({ cardId }: DeleteCardProps) {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  async function deleteCard() {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/card/${cardId}`);
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while deleting the card",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmationModal(false);
    }
  }

  return (
    <div className="mt-4">
      <Label>Delete this Card</Label>
      <p className="text-xs mt-1">
        Once you delete the card, you cannot recover it. Please be sure.{" "}
      </p>
      <AlertDialog
        open={showDeleteConfirmationModal}
        onOpenChange={(open) => {
          console.log("change open", open);
          setShowDeleteConfirmationModal(open);
        }}
      >
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="mt-2" size={"sm"}>
            Delete Card
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all the
              information related to the card.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                deleteCard();
                event.preventDefault();
              }}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="animate-spin mr-2" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { DeleteCard };
