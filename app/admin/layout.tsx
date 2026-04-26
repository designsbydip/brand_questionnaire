"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Download, LogOut, ChevronRight, Home } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!user) return null;

  const navLinks = [
    { href: "/admin", label: "Responses", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/admin/export", label: "Export", icon: <Download className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-border flex flex-col z-20">
        <div className="h-14 flex items-center px-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Dashboard</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                pathname === link.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.icon}
              {link.label}
              {pathname === link.href && (
                <ChevronRight className="h-3 w-3 ml-auto" />
              )}
            </Link>
          ))}
        </nav>
        <Separator />
        <div className="p-3">
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-medium text-foreground truncate">{user.email}</p>
            <p className="text-xs text-muted-foreground capitalize">admin</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full mb-1"
          >
            <Home className="h-3.5 w-3.5" />
            Back to Home
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground text-xs h-8"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-56 min-h-screen">
        <header className="h-14 bg-white border-b border-border flex items-center px-8 sticky top-0 z-10">
          <p className="text-sm font-medium text-foreground">Gaudi Project — Response Dashboard</p>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
