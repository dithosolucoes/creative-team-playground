import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Lightbulb,
  ShoppingCart,
  DollarSign,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Experiências", url: "/admin/experiencias", icon: Lightbulb },
  { title: "Produtos", url: "/admin/produtos", icon: Package },
  { title: "Vendas", url: "/admin/vendas", icon: ShoppingCart },
  { title: "Financeiro", url: "/admin/financeiro", icon: DollarSign },
  { title: "Configurações", url: "/admin/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} border-r transition-all duration-300`} style={{ backgroundColor: "hsl(var(--sidebar-bg))" }}>
      <SidebarHeader className="border-b px-4 py-6" style={{ backgroundColor: "hsl(var(--sidebar-bg))", borderColor: "hsl(0 0% 15%)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base">24h</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-white text-xl">Propósito24h</h2>
              <p className="text-sm text-gray-300">Área Admin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent style={{ backgroundColor: "hsl(var(--sidebar-bg))" }}>
        <SidebarGroup>
          <SidebarGroupLabel className={`${isCollapsed ? "sr-only" : ""} text-gray-400 text-sm font-medium px-3 py-2`}>
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-3">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all group font-medium ${
                          isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="text-sm">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4" style={{ backgroundColor: "hsl(var(--sidebar-bg))", borderColor: "hsl(0 0% 15%)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="font-medium text-white text-sm">Admin User</p>
              <p className="text-xs text-gray-400">admin@proposito24h.com</p>
            </div>
          )}
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <LogOut className="h-4 w-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}