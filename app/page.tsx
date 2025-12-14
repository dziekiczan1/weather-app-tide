import { CityForm } from "@/components/city/city-form";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <main>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <CardWrapper heading="Add City" icon={Plus}>
            <CityForm />
          </CardWrapper>
        </div>
      </div>
    </main>
  );
}
