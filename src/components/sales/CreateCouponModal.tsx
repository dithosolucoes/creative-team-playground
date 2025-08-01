import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CreateCouponModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CreateCouponModal({ open, onOpenChange, onSuccess }: CreateCouponModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
    maxUses: "",
    expiresAt: undefined as Date | undefined
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const generateCode = () => {
    const randomCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, code: randomCode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.code.trim() || !formData.discountValue) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const discountValue = parseFloat(formData.discountValue);
    if (isNaN(discountValue) || discountValue <= 0) {
      toast({
        title: "Erro",
        description: "Valor do desconto deve ser um número válido",
        variant: "destructive"
      });
      return;
    }

    if (formData.discountType === "percentage" && discountValue > 100) {
      toast({
        title: "Erro",
        description: "Desconto percentual não pode ser maior que 100%",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      // Convert value to cents for fixed discounts
      const valueInCents = formData.discountType === "fixed" 
        ? Math.round(discountValue * 100)
        : discountValue;

      const { error } = await supabase
        .from('coupons')
        .insert({
          code: formData.code.toUpperCase(),
          discount_type: formData.discountType,
          discount_value: valueInCents,
          max_uses: formData.maxUses ? parseInt(formData.maxUses) : null,
          expires_at: formData.expiresAt?.toISOString(),
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Cupom criado com sucesso!"
      });

      setFormData({
        code: "",
        discountType: "percentage",
        discountValue: "",
        maxUses: "",
        expiresAt: undefined
      });
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Erro ao criar cupom:', error);
      
      if (error.code === '23505') {
        toast({
          title: "Erro",
          description: "Este código de cupom já existe",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro",
          description: "Erro ao criar cupom",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Cupom</DialogTitle>
          <DialogDescription>
            Configure um novo cupom de desconto para seus produtos
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code">Código do Cupom *</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                placeholder="Ex: DESCONTO50"
                required
              />
              <Button type="button" variant="outline" onClick={generateCode}>
                Gerar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discountType">Tipo de Desconto *</Label>
              <Select
                value={formData.discountType}
                onValueChange={(value: "percentage" | "fixed") => 
                  setFormData(prev => ({ ...prev, discountType: value, discountValue: "" }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentual (%)</SelectItem>
                  <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountValue">
                Valor * {formData.discountType === "percentage" ? "(%)" : "(R$)"}
              </Label>
              <Input
                id="discountValue"
                type="number"
                step={formData.discountType === "percentage" ? "1" : "0.01"}
                min="0"
                max={formData.discountType === "percentage" ? "100" : undefined}
                value={formData.discountValue}
                onChange={(e) => setFormData(prev => ({ ...prev, discountValue: e.target.value }))}
                placeholder={formData.discountType === "percentage" ? "50" : "10.00"}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxUses">Limite de Usos</Label>
            <Input
              id="maxUses"
              type="number"
              min="1"
              value={formData.maxUses}
              onChange={(e) => setFormData(prev => ({ ...prev, maxUses: e.target.value }))}
              placeholder="Deixe vazio para ilimitado"
            />
          </div>

          <div className="space-y-2">
            <Label>Data de Expiração</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.expiresAt ? (
                    format(formData.expiresAt, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecionar data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.expiresAt}
                  onSelect={(date) => setFormData(prev => ({ ...prev, expiresAt: date }))}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Cupom"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}