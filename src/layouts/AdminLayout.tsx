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
          {/* Modern Header */}
          <header className="h-16 border-b border-border bg-black shadow-soft">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white" />
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar produtos, vendas..."
                    className="pl-10 w-80 bg-gray-800 border-gray-700 focus:border-primary h-10 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-800 text-white">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-800 text-white">
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white font-semibold text-sm">A</span>
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