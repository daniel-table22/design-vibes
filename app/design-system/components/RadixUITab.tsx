"use client";

import ComponentShowcase from "./ComponentShowcase";
import { AlertDialog, type AlertDialogSize } from "@/components/ui/alert-dialog";

export default function RadixUITab() {
  return (
    <div className="divide-y divide-gray-100">
      <ComponentShowcase
        name="Alert Dialog"
        defaultProps={{ size: "3", insetContent: false, showDescription: true }}
        controls={[
          { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4"] },
          { type: "toggle", label: "Inset Content", key: "insetContent" },
          { type: "toggle", label: "Description", key: "showDescription" },
        ]}
        preview={(props, open, setOpen) => (
          <>
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Open Dialog
            </button>
            <AlertDialog
              open={open}
              onOpenChange={setOpen}
              size={props.size as AlertDialogSize}
              insetContent={props.insetContent as boolean}
              showDescription={props.showDescription as boolean}
            />
          </>
        )}
        render={(props, open, setOpen) => (
          <>
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1.5 text-xs font-medium bg-black text-white rounded hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Open Alert Dialog
            </button>
            <AlertDialog
              open={open}
              onOpenChange={setOpen}
              size={props.size as AlertDialogSize}
              insetContent={props.insetContent as boolean}
              showDescription={props.showDescription as boolean}
            />
          </>
        )}
      />
    </div>
  );
}
