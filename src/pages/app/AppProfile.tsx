import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar,
  Trophy,
  Settings,
  LogOut,
  Download,
  Share2,
  Heart,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppProfile() {
  const navigate = useNavigate();
  
  // Mock user data (would come from localStorage or state management)
  const user = {
    name: "João Silva",
    email: "joao@exemplo.com",
    joinDate: "15 de Janeiro, 2024",
    product: "Transformação em 21 Dias",
    avatar: null
  };

  const stats = {
    daysCompleted: 7,
    totalDays: 21,
    streak: 7,
    reflections: 15,
    achievements: 2
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card className="border-soft shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Membro desde {user.joinDate}
                </span>
              </div>
            </div>
          </div>

          <Badge className="bg-primary/10 text-primary border-primary/20">
            {user.product}
          </Badge>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-soft shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            Resumo do Progresso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {stats.daysCompleted}/{stats.totalDays}
              </p>
              <p className="text-sm text-muted-foreground">Dias Completos</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{stats.streak}</p>
              <p className="text-sm text-muted-foreground">Dias Seguidos</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.reflections}</p>
              <p className="text-sm text-muted-foreground">Reflexões</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-soft shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" />
            Conquistas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
            <div className="p-2 bg-success rounded-full">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-foreground">Primeira Semana</p>
              <p className="text-sm text-muted-foreground">Complete 7 dias consecutivos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
            <div className="p-2 bg-primary rounded-full">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-foreground">Reflexivo</p>
              <p className="text-sm text-muted-foreground">Escreva 10 reflexões pessoais</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Card className="border-soft shadow-soft">
          <CardContent className="p-4">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-3" />
              Baixar Certificado
            </Button>
          </CardContent>
        </Card>

        <Card className="border-soft shadow-soft">
          <CardContent className="p-4">
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="h-4 w-4 mr-3" />
              Compartilhar Progresso
            </Button>
          </CardContent>
        </Card>

        <Card className="border-soft shadow-soft">
          <CardContent className="p-4">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              Configurações
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Support & Logout */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full">
          <Mail className="h-4 w-4 mr-2" />
          Falar com Suporte
        </Button>
        
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair da Conta
        </Button>
      </div>

      {/* App Info */}
      <Card className="border-soft shadow-soft">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Propósito24h - Versão 1.0.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2024 Todos os direitos reservados
          </p>
        </CardContent>
      </Card>
    </div>
  );
}