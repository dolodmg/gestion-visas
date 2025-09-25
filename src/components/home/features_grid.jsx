import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, MessageCircle } from "lucide-react";

const features = [
  {
    icon: "🇦🇷",
    title: "Hechos por argentinos",
    description:
      "Entendemos tu situación específica y los desafíos únicos que enfrentan los ciudadanos argentinos.",
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    title: "Proceso simplificado",
    description:
      "Convertimos formularios complejos en pasos simples que podés completar desde casa.",
  },
  {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    title: "Acompañamiento total",
    description:
      "Te guiamos desde el primer paso hasta que tengas tu visa aprobada en la mano.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
    title: "Soporte humano",
    description:
      "Hablás con personas reales, no con bots. Estamos acá para resolver todas tus dudas.",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 mt-10 mx-10">
      {features.map((feature, index) => (
        <Card key={index} className="p-4 text-center bg-[#212020] border-none drop-shadow-lg">
          <CardContent className="flex flex-col items-center gap-2 text-white">
            <div className="text-md">{feature.icon}</div>
            <h3 className="text-md font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground text-zinc-400">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
