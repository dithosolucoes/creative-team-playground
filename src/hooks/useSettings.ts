import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface SettingsData {
  general: {
    businessName: string;
    adminEmail: string;
    description: string;
    timezone: string;
    currency: string;
  };
  domain: {
    customDomain: string;
    isVerified: boolean;
  };
  integrations: {
    stripeSecretKey: string;
    stripePublishableKey: string;
    emailProvider: string;
    emailApiKey: string;
    pushProvider: string;
    pushApiKey: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    salesNotifications: boolean;
    marketingNotifications: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    allowedDomains: string[];
  };
}

const defaultSettings: SettingsData = {
  general: {
    businessName: '',
    adminEmail: '',
    description: '',
    timezone: 'America/Sao_Paulo',
    currency: 'BRL',
  },
  domain: {
    customDomain: '',
    isVerified: false,
  },
  integrations: {
    stripeSecretKey: '',
    stripePublishableKey: '',
    emailProvider: 'sendgrid',
    emailApiKey: '',
    pushProvider: 'onesignal',
    pushApiKey: '',
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    salesNotifications: true,
    marketingNotifications: false,
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 30,
    allowedDomains: [],
  },
};

export const useSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('creator_id', user.id);

      if (error) throw error;

      // Converter array de settings para objeto estruturado
      const settingsObj = { ...defaultSettings };
      
      data?.forEach((setting) => {
        const category = setting.category as keyof SettingsData;
        if (settingsObj[category]) {
          (settingsObj[category] as any)[setting.key] = setting.value;
        }
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: SettingsData) => {
    if (!user) return;

    try {
      // Converter objeto estruturado para array de settings
      const settingsArray: Array<{
        creator_id: string;
        category: string;
        key: string;
        value: any;
      }> = [];

      Object.entries(newSettings).forEach(([category, categoryData]) => {
        Object.entries(categoryData).forEach(([key, value]) => {
          settingsArray.push({
            creator_id: user.id,
            category,
            key,
            value,
          });
        });
      });

      // Primeiro, deletar configurações existentes
      await supabase
        .from('settings')
        .delete()
        .eq('creator_id', user.id);

      // Inserir novas configurações
      const { error } = await supabase
        .from('settings')
        .insert(settingsArray);

      if (error) throw error;

      setSettings(newSettings);
      
      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações",
        variant: "destructive",
      });
    }
  };

  const updateSetting = (
    category: keyof SettingsData,
    key: string,
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    loadSettings();
  }, [user]);

  return {
    settings,
    setSettings,
    loading,
    saveSettings,
    updateSetting,
    loadSettings,
  };
};