import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CreateFunnelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CreateFunnelModal({ open, onOpenChange, onSuccess }: CreateFunnelModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    products: [] as string[]
  });
  const [currentProduct, setCurrentProduct] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const addProduct = () => {
    if (currentProduct.trim() && !formData.products.includes(currentProduct.trim())) {
      setFormData(prev => ({
        ...prev,
        products: [...prev.products, currentProduct.trim()]
      }));
      setCurrentProduct("");
    }
  };

  const removeProduct = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p !== product)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome do funil é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (formData.products.length === 0) {
      toast({
        title: "Erro", 
        description: "Adicione pelo menos um produto ao funil",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('funnels')
        .insert({
          creator_id: user.id,
          name: formData.name,
          description: formData.description,
          products: formData.products,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Funil criado com sucesso!"
      });

      setFormData({ name: "", description: "", products: [] });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar funil:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar funil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Funil</DialogTitle>
          <DialogDescription>
            Configure um novo funil de vendas para seus produtos
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Funil *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Funil Principal - Transformação"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o objetivo deste funil..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Produtos do Funil *</Label>
            <div className="flex gap-2">
              <Input
                value={currentProduct}
                onChange={(e) => setCurrentProduct(e.target.value)}
                placeholder="Nome do produto"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
              />
              <Button type="button" onClick={addProduct} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.products.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.products.map((product, index) => (
                  <Badge key={index} variant="secondary" className="gap-2">
                    {product}
                    <button
                      type="button"
                      onClick={() => removeProduct(product)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
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
              {loading ? "Criando..." : "Criar Funil"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}