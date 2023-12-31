import { PageTitle } from "@/components/pae-title";
import { PageSubheading } from "@/components/page-subheading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Board } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

interface DeleteBoardProps {
  board: Board;
}

function DeleteBoard({ board }: DeleteBoardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isBoardDeleting, setIsBoardDeleting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  async function deleteBoard() {
    setIsBoardDeleting(true);
    try {
      await axios.delete(`/api/board/${board.id}`);
      router.push("/boards");
    } catch (error) {
      toast({
        description: "Something went wrong while deleting the board",
        variant: "destructive",
      });
    } finally {
      setIsBoardDeleting(false);
      setOpenDialog(false);
    }
  }
  return (
    <div className="mt-8">
      <PageTitle>Delete Board</PageTitle>
      <PageSubheading className="mt-2">
        This action cannot be undone. This will delete the board, all its column
        and all the cards inside the column
      </PageSubheading>
      <AlertDialog
        open={openDialog}
        onOpenChange={(open) => setOpenDialog(open)}
      >
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="mt-4">
            Delete Board
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the board, all its
              column and all the cards inside the column
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBoardDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                deleteBoard();
                e.preventDefault();
              }}
              disabled={isBoardDeleting}
            >
              {isBoardDeleting && <Loader2 className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { DeleteBoard };
