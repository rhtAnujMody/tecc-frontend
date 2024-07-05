import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { CommonDialogProps } from "@/types";
export default function CommonDialog({
  open,
  title,
  children,
  classes,
  setDefault,
}: CommonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setDefault}>
      <DialogContent className={cn(classes)}>
        <div className="flex justify-between items-center relative">
          {title !== "" && (
            <DialogTitle className="text-text-primary text-base font-semibold">
              {title}
            </DialogTitle>
          )}
          <X
            className="cursor-pointer absolute right-0 top-1"
            onClick={setDefault}
          ></X>
        </div>

        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
