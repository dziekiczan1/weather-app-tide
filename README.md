# 🌤️ Weather App Tide

A modern weather application built with Next.js 16, featuring city management and real-time weather data from OpenWeather API.

## ✨ Features

- 🏙️ **City Management** - Add, edit, and delete cities with validation
- 🌡️ **Real-time Weather** - Fetch current weather data from OpenWeather API
- 🔍 **City Search** - Filter through saved cities with instant search
- ✅ **City Validation** - Validates cities against OpenWeather API before saving
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Virtualized List** - Smooth performance with large city lists
- 🎨 **Modern UI** - Beautiful dark theme with gradient accents

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Virtualization:** [TanStack Virtual](https://tanstack.com/virtual)
- **Weather API:** [OpenWeather](https://openweathermap.org/api)

## 📁 Project Structure

```
weather-app-tide/
├── actions/              # Server actions
│   ├── city.ts           # City CRUD operations
│   └── weather.ts        # Weather API calls
├── app/                  
├── components/
│   ├── city/             # City components
│   │   ├── city-form.tsx
│   │   ├── city-item.tsx
│   │   ├── city-list.tsx
│   │   ├── city-manager.tsx
│   │   ├── city-search.tsx
│   │   ├── city-empty-state.tsx
│   │   └── types.ts
│   ├── weather/          # Weather components
│   │   ├── weather-card.tsx
│   │   ├── weather-stat.tsx
│   │   ├── weather-stats.tsx
│   │   └── types.ts
│   ├── layout/           # Layout components
│   └── ui/               # UI primitives (shadcn)
├── lib/                  # Utilities
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/
│   └── schema.prisma     # Database schema
└── schemas/              # Zod validation schemas
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenWeather API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dziekiczan1/weather-app-tide.git
   cd weather-app-tide
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost: 5432/weather_app"
   OPENWEATHER_API_KEY="your_openweather_api_key"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Environment Variables

| Variable                   | Description                  | Required |
| -------------------------- | ---------------------------- | -------- |
| `DATABASE_URL`             | PostgreSQL connection string | Yes      |
| `OPENWEATHER_API_KEY` | OpenWeather API key          | Yes      |

## 🔧 Scripts

| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start development server         |
| `npm run build` | Build for production             |
| `npm run start` | Start production server          |
| `npm run lint`  | Run ESLint                       |

## 🌐 API Integration

The app uses OpenWeather API 2.5 for weather data:

```
GET https://api.openweathermap.org/data/2.5/weather?q={city},{country}&units=metric&appid={API_KEY}
```

Weather data is cached for 5 minutes to optimize API usage.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**dziekiczan1**

- GitHub: [Piotr Rzadkowolski](https://github.com/dziekiczan1)
