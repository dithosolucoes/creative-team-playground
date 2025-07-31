import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Experiencias() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experiências</h1>
          <p className="text-muted-foreground">
            Crie e gerencie experiências transformadoras de 24 horas
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4" />
          Criar Experiência
        </Button>
      </div>
    </div>
  );
}