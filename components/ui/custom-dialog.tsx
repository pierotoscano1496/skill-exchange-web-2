"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

type DialogType = "success" | "error" | "confirmation" | "info";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type: DialogType;
  confirmText?: string;
  cancelText?: string;
}

const dialogIcons: Record<DialogType, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  confirmation: HelpCircle,
  info: AlertTriangle,
};

const dialogColors: Record<DialogType, string> = {
  success: "text-green-500",
  error: "text-red-500",
  confirmation: "text-blue-500",
  info: "text-yellow-500",
};

export function CustomDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: CustomDialogProps) {
  const Icon = dialogIcons[type];
  const color = dialogColors[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Icon className={`h-6 w-6 ${color}`} />
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="py-4">{message}</DialogDescription>
        <DialogFooter>
          {type === "confirmation" ? (
            <>
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
              <Button
                onClick={() => {
                  if (onConfirm) onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </Button>
            </>
          ) : (
            <Button onClick={onClose}>OK</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}