"use client";

import { Sprout } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBacaanStore } from "@/lib/store";

export function StartPlan() {
  const startPlan = useBacaanStore((s) => s.startPlan);
  return (
    <Card className="flex flex-col items-center gap-4 p-8 text-center md:p-12">
      <Sprout className="size-10 text-muted-foreground" strokeWidth={1.25} />
      <div className="space-y-2">
        <h2 className="font-serif text-3xl tracking-tight">
          Renungan 365 Hari
        </h2>
        <p className="max-w-md text-muted-foreground">
          Baca seluruh Alkitab dalam setahun. Sekitar 3–4 pasal setiap hari,
          mengikuti urutan kanonik — dari Kejadian sampai Wahyu.
        </p>
      </div>
      <Button
        size="lg"
        onClick={() => {
          startPlan();
          toast.success("Rencana dimulai. Selamat membaca!", {
            duration: 2000,
          });
        }}
      >
        Mulai hari ini
      </Button>
      <p className="text-xs text-muted-foreground">
        Kamu bisa mengulang atau me-reset kapan pun.
      </p>
    </Card>
  );
}
