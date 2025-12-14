import { getCities } from "@/actions/city";
import { CityManager } from "@/components/city/city-manager";

export default async function Page() {
  const cities = await getCities();

  return (
    <main>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <CityManager initialCities={cities} />
      </div>
    </main>
  );
}
