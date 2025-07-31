import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  TrendingUp, 
  User,
  Calendar,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: "/app/crescimento", label: "Crescimento", icon: TrendingUp },
    { path: "/app/hoje", label: "Hoje", icon: Home },
    { path: "/app/perfil", label: "Perfil", icon: User },
  ];

  const getNavClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-primary">Transformação 21 Dias</h1>
            <p className="text-xs text-muted-foreground">Sua jornada espiritual</p>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={getNavClass(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}