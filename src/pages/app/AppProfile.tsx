import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Star,
  Loader2,
  Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function AppProfile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });
  const [editProfile, setEditProfile] = useState({
    name: "",
    phone: "",
    cpf: ""
  });
  const [stats, setStats] = useState({
    daysCompleted: 0,
    totalDays: 21,
    streak: 0,
    reflections: 0,
    achievements: 0,
    productName: ""
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      // Get user profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      const profileData = {
        name: profile?.name || user.email?.split('@')[0] || "Usuário",
        email: user.email || "",
        phone: profile?.phone || "",
        cpf: profile?.cpf || ""
      };

      setUserProfile(profileData);
      setEditProfile({
        name: profileData.name,
        phone: profileData.phone,
        cpf: profileData.cpf
      });

    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o perfil do usuário.",
        variant: "destructive"
      });
    }
  };

  const fetchUserStats = async () => {
    try {
      setLoading(true);

      // Get user's active product and progress
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select(`
          *,
          products(
            title,
            experiences(*)
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1);

      if (purchasesError) throw purchasesError;

      if (!purchases || purchases.length === 0) {
        setStats({
          daysCompleted: 0,
          totalDays: 21,
          streak: 0,
          reflections: 0,
          achievements: 0,
          productName: "Nenhuma experiência ativa"
        });
        return;
      }

      const userProduct = purchases[0];
      const experience = userProduct.products.experiences;
      const experienceContent = experience?.content as any;
      const totalDays = experienceContent?.days || 21;

      // Get user progress
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', userProduct.product_id)
        .order('day_number', { ascending: true });

      if (progressError) throw progressError;

      const completedDays = progress?.filter(p => p.completed).length || 0;
      
      // Calculate streak
      let streak = 0;
      if (progress) {
        for (let i = 1; i <= totalDays; i++) {
          const dayProgress = progress.find(p => p.day_number === i && p.completed);
          if (dayProgress) {
            streak = i;
          } else {
            break;
          }
        }
      }

      const reflections = completedDays * 2; // Estimate 2 reflections per day
      const achievements = Math.floor(streak / 7) + (reflections >= 10 ? 1 : 0); // Simple achievement count

      setStats({
        daysCompleted: completedDays,
        totalDays,
        streak,
        reflections,
        achievements,
        productName: userProduct.products.title
      });

    } catch (error) {
      console.error('Error fetching user stats:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as estatísticas do usuário.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          email: user.email,
          name: editProfile.name,
          phone: editProfile.phone,
          cpf: editProfile.cpf,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setUserProfile(prev => ({
        ...prev,
        name: editProfile.name,
        phone: editProfile.phone,
        cpf: editProfile.cpf
      }));

      setEditDialogOpen(false);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });

    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer logout.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card className="border-soft shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{userProfile.name}</h2>
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Perfil</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          value={editProfile.name}
                          onChange={(e) => setEditProfile(prev => ({...prev, name: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={editProfile.phone}
                          onChange={(e) => setEditProfile(prev => ({...prev, phone: e.target.value}))}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={editProfile.cpf}
                          onChange={(e) => setEditProfile(prev => ({...prev, cpf: e.target.value}))}
                          placeholder="000.000.000-00"
                        />
                      </div>
                      <Button onClick={handleUpdateProfile} className="w-full">
                        Salvar Alterações
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-muted-foreground">{userProfile.email}</p>
              {userProfile.phone && (
                <p className="text-sm text-muted-foreground">{userProfile.phone}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Membro desde {new Date(user.created_at || Date.now()).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          <Badge className="bg-primary/10 text-primary border-primary/20">
            {stats.productName}
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