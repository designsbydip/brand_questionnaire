"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2, Download, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface ResponseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  completionPercentage: number;
  status: string;
  isReviewed: boolean;
  reviewStatus: string;
  lastPageVisited: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  submitted: "bg-blue-100 text-blue-700",
  reviewed: "bg-green-100 text-green-700",
  approved: "bg-purple-100 text-purple-700",
};

export default function AdminDashboard() {
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 10, pages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchResponses = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        sortBy,
        sortOrder,
        ...(search && { search }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });
      const res = await fetch(`/api/admin/responses?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setResponses(data.data);
        setPagination(data.pagination);
      }
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, sortBy, sortOrder]);

  useEffect(() => { fetchResponses(1); }, [fetchResponses]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this response permanently?")) return;
    const token = localStorage.getItem("admin_token");
    await fetch(`/api/admin/responses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchResponses(pagination.page);
  };

  const downloadJSON = (id: string) => {
    const response = responses.find((r) => r.id === id);
    if (!response) return;
    const blob = new Blob([JSON.stringify(response, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `response_${id}.json`;
    a.click();
  };

  const stats = {
    total: pagination.total,
    submitted: responses.filter((r) => r.status === "submitted").length,
    avgCompletion: responses.length ? Math.round(responses.reduce((s, r) => s + r.completionPercentage, 0) / responses.length) : 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Client Responses</h1>
        <p className="text-sm text-muted-foreground mt-1">Review and manage Gaudi questionnaire submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Responses", value: pagination.total },
          { label: "Submitted", value: responses.filter((r) => r.status === "submitted").length },
          { label: "Avg. Completion", value: `${stats.avgCompletion}%` },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-5">
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by response ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-36 h-9 text-sm">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
            </SelectContent>
          </Select>
          <Select value={`${sortBy}-${sortOrder}`} onValueChange={(v) => { const val = v ?? "createdAt-desc"; const dashIdx = val.lastIndexOf("-"); setSortBy(val.slice(0, dashIdx)); setSortOrder(val.slice(dashIdx + 1)); }}>
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest first</SelectItem>
              <SelectItem value="createdAt-asc">Oldest first</SelectItem>
              <SelectItem value="completionPercentage-desc">Most complete</SelectItem>
              <SelectItem value="completionPercentage-asc">Least complete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : responses.length === 0 ? (
          <div className="text-center py-20 text-sm text-muted-foreground">
            No responses yet. They&apos;ll appear here when clients submit the form.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs">Response ID</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Completion</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Last Page</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.map((r) => (
                <TableRow key={r.id} className="hover:bg-muted/20">
                  <TableCell className="text-xs font-mono text-muted-foreground">{r.id.slice(0, 12)}…</TableCell>
                  <TableCell className="text-xs">{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-black rounded-full" style={{ width: `${r.completionPercentage}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{r.completionPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[r.status] || "bg-gray-100 text-gray-700"}`}>
                      {r.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r.lastPageVisited} / 28</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/responses/${r.id}`} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-7 w-7")}><Eye className="h-3.5 w-3.5" /></Link>
                      <Button variant="ghost" size="icon" onClick={() => downloadJSON(r.id)} className="h-7 w-7">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} className="h-7 w-7 hover:text-red-500">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-xs text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={pagination.page <= 1} onClick={() => fetchResponses(pagination.page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={pagination.page >= pagination.pages} onClick={() => fetchResponses(pagination.page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
