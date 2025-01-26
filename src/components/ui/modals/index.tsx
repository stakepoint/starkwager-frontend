import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { SetStateAction } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dialog, DialogContent, ModalProps } from "../dialog";
export function ModalView({
  open,
  setOpen,
  children,

  ...props
}: {
  open: boolean;
  children: React.ReactNode;
  setOpen: React.Dispatch<SetStateAction<any>>;
} & ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent {...props}>{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <DrawerContent className="border-none max-h-[98%] ">
        <div className="overflow-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
