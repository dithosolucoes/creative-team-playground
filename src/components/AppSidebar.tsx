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
    <Sidebar className={`${isCollapsed ? "w-16" : "w-72"} border-r transition-all duration-300`}>
      {/* BLACK HEADER - SAME HEIGHT AS MAIN HEADER */}
      <SidebarHeader className="border-b px-6 h-20 flex items-center" style={{ backgroundColor: "hsl(var(--black))", borderColor: "hsl(0 0% 15%)" }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "hsl(var(--blue-primary))" }}>
            <span className="text-white font-bold text-lg">24h</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-white text-2xl">Propósito24h</h2>
              <p className="text-sm text-gray-300">Área Admin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* LIGHT GRAY CONTENT */}
      <SidebarContent style={{ backgroundColor: "hsl(var(--gray-light))" }}>
        <SidebarGroup>
          <SidebarGroupLabel className={`${isCollapsed ? "sr-only" : ""} text-gray-600 text-sm font-medium px-4 py-4`}>
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-4">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-6 py-6 rounded-xl transition-all group font-semibold text-base ${
                          isActive
                            ? "text-white shadow-lg shadow-blue-500/20"
                            : "text-white hover:bg-gray-700"
                        }`
                      }
                      style={({ isActive }) => ({
                        backgroundColor: isActive 
                          ? "hsl(var(--blue-primary))" 
                          : "hsl(var(--black))"
                      })}
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0" />
                      {!isCollapsed && (
                        <span>{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t px-6 py-6" style={{ backgroundColor: "hsl(var(--gray-light))", borderColor: "hsl(0 0% 15%)" }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--blue-primary))" }}>
            <span className="text-white font-semibold text-base">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-base">Admin User</p>
              <p className="text-sm text-gray-600">admin@proposito24h.com</p>
            </div>
          )}
          <button className="p-3 hover:bg-gray-200 rounded-lg transition-colors">
            <LogOut className="h-5 w-5 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}