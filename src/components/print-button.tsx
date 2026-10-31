"use client";

import { Download } from "lucide-react";

/**
 * Triggers the browser's print dialog so visitors can print or save the
 * résumé as a PDF. No fabricated file — the page itself is the résumé.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        // Chrome names the saved PDF after the document title —
        // use an upload-friendly filename during the print dialog.
        const previous = document.title;
        document.title = "Pratham_Wankhade_Resume";
        try {
          window.print();
        } finally {
          document.title = previous;
        }
      }}
      className="no-print inline-flex items-center gap-2 rounded-lg bg-cobalt px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cobalt/90 min-h-[44px]"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Save as PDF
    </button>
  );
}
