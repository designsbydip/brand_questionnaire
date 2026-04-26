"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronDown, ChevronUp, Loader2, Download } from "lucide-react";
import { FORM_PAGES } from "@/lib/types";

type ResponseData = Record<string, unknown>;

export default function ResponseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [reviewStatus, setReviewStatus] = useState("pending");
  const [isSaving, setIsSaving] = useState(false);
  const [openParts, setOpenParts] = useState<Set<number>>(new Set([1]));

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`/api/admin/responses/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
          setAdminNotes(res.data.adminNotes || "");
          setReviewStatus(res.data.reviewStatus || "pending");
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const saveNotes = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("admin_token");
    await fetch(`/api/admin/responses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ adminNotes, reviewStatus, isReviewed: reviewStatus !== "pending" }),
    });
    setIsSaving(false);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `response_${id}.json`;
    a.click();
  };

  const togglePart = (part: number) => {
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(part)) next.delete(part);
      else next.add(part);
      return next;
    });
  };

  // Group pages by part
  const partGroups = FORM_PAGES.reduce<Record<number, typeof FORM_PAGES>>((acc, page) => {
    if (!acc[page.part]) acc[page.part] = [];
    acc[page.part].push(page);
    return acc;
  }, {});

  if (isLoading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!data) return <div className="text-center py-20 text-sm text-muted-foreground">Response not found.</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Response Detail</h1>
            <p className="text-xs text-muted-foreground font-mono">{id}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={exportJSON}>
          <Download className="h-4 w-4 mr-1" /> Export JSON
        </Button>
      </div>

      {/* Meta */}
      <div className="bg-white rounded-xl border border-border p-5 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <span className="text-sm font-medium capitalize">{String(data.status || "draft")}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completion</p>
            <span className="text-sm font-medium">{String(data.completionPercentage || 0)}%</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Submitted</p>
            <span className="text-sm font-medium">{data.createdAt ? new Date(String(data.createdAt)).toLocaleDateString() : "—"}</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-foreground">Review Status</p>
            <Select value={reviewStatus} onValueChange={(v) => setReviewStatus(v ?? "pending")}>
              <SelectTrigger className="w-48 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-foreground">Admin Notes</p>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add internal notes about this response…"
              rows={3}
              className="text-sm"
            />
          </div>
          <Button size="sm" onClick={saveNotes} disabled={isSaving} className="bg-black text-white hover:bg-black/90">
            {isSaving ? <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Saving…</> : "Save Notes"}
          </Button>
        </div>
      </div>

      {/* Parts */}
      <div className="space-y-3">
        {Object.entries(partGroups).map(([partStr, pages]) => {
          const part = parseInt(partStr);
          const partTitle = pages[0].partTitle;
          const isOpen = openParts.has(part);
          return (
            <Collapsible key={part} open={isOpen} onOpenChange={() => togglePart(part)}>
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <CollapsibleTrigger className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">Part {part}</span>
                    <span className="text-sm font-semibold text-foreground">{partTitle}</span>
                  </div>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Separator />
                  <div className="p-5 space-y-3">
                    {Object.entries(data)
                      .filter(([key]) => !["id", "createdAt", "updatedAt", "status", "completionPercentage", "adminNotes", "isReviewed", "reviewStatus", "reviewedAt", "lastPageVisited"].includes(key))
                      .slice(0, 10)
                      .map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-4 text-sm">
                          <dt className="text-xs text-muted-foreground font-medium col-span-1 capitalize">
                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                          </dt>
                          <dd className="text-sm text-foreground col-span-2">
                            {Array.isArray(value)
                              ? value.join(", ") || <span className="text-muted-foreground italic">Empty</span>
                              : value !== null && value !== undefined && value !== ""
                              ? String(value)
                              : <span className="text-muted-foreground italic">Not answered</span>}
                          </dd>
                        </div>
                      ))}
                    <div className="pt-2">
                      <Link href={`/admin/responses/${id}/edit`} className="text-xs text-muted-foreground hover:text-foreground underline">
                        View all fields for this part →
                      </Link>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
