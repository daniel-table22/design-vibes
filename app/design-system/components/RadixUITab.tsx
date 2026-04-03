"use client";

import ComponentShowcase from "./ComponentShowcase";
import { AlertDialog, type AlertDialogSize } from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function RadixUITab() {
  return (
    <div>
      <ComponentShowcase
        name="Alert Dialog"
        defaultProps={{ size: "3", insetContent: false, showDescription: true }}
        controls={[
          { type: "select", label: "Size", key: "size", options: ["1", "2", "3", "4"] },
          { type: "toggle", label: "Inset Content", key: "insetContent" },
          { type: "toggle", label: "Description", key: "showDescription" },
        ]}
        render={(props) => (
          <AlertDialog
            inline
            size={props.size as AlertDialogSize}
            insetContent={props.insetContent as boolean}
            showDescription={props.showDescription as boolean}
          />
        )}
      />
      <ComponentShowcase
        name="Aspect Ratio"
        defaultProps={{ ratio: "16:9" }}
        controls={[
          { type: "select", label: "Ratio", key: "ratio", options: ["16:9", "1:1", "2:3"] },
        ]}
        render={(props) => (
          <AspectRatio ratio={props.ratio as "16:9" | "1:1" | "2:3"} />
        )}
      />
    </div>
  );
}
