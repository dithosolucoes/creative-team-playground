import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* BLACK HEADER */}
          <header className="h-20 border-b" style={{ backgroundColor: "hsl(var(--black))", borderColor: "hsl(0 0% 15%)" }}>
            <div className="h-full px-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <SidebarTrigger className="p-3 hover:bg-gray-800 rounded-lg transition-colors text-white" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar produtos, vendas..."
                    className="pl-12 w-96 bg-gray-800 border-gray-700 focus:border-blue-500 h-12 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-800 text-white">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full" style={{ backgroundColor: "hsl(var(--blue-primary))" }}></span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-800 text-white">
                  <Settings className="h-6 w-6" />
                </Button>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "hsl(var(--blue-primary))" }}>
                  <span className="text-white font-semibold text-base">A</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-muted/20 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}