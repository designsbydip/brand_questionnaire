"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, FileJson, Loader2 } from "lucide-react";

export default function ExportPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const download = async (format: "csv" | "json") => {
    setIsDownloading(format);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams({ format, ...(statusFilter !== "all" && { status: statusFilter }) });
      const res = await fetch(`/api/admin/export?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gaudi_responses_${Date.now()}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Export Responses</h1>
        <p className="text-sm text-muted-foreground mt-1">Download all client responses as CSV or JSON</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-5">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Filter by Status</p>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-48 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All responses</SelectItem>
              <SelectItem value="draft">Drafts only</SelectItem>
              <SelectItem value="submitted">Submitted only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">CSV Format</p>
                <p className="text-xs text-muted-foreground">Flat table, one row per response</p>
              </div>
            </div>
            <Button
              onClick={() => download("csv")}
              disabled={isDownloading === "csv"}
              variant="outline"
              className="w-full h-9 text-sm"
            >
              {isDownloading === "csv" ? <><Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> Downloading…</> : <><Download className="h-3.5 w-3.5 mr-2" /> Download CSV</>}
            </Button>
          </div>

          <div className="border border-border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">JSON Format</p>
                <p className="text-xs text-muted-foreground">Full nested structure, pretty-printed</p>
              </div>
            </div>
            <Button
              onClick={() => download("json")}
              disabled={isDownloading === "json"}
              variant="outline"
              className="w-full h-9 text-sm"
            >
              {isDownloading === "json" ? <><Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> Downloading…</> : <><Download className="h-3.5 w-3.5 mr-2" /> Download JSON</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
