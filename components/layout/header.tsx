import { Sun } from "lucide-react";

export const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/25">
          <Sun className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Weather Dashboard
        </h1>
      </div>
      <p className="text-slate-400 text-lg">
        Track the weather in your favorite cities
      </p>
    </header>
  );
};
