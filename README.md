# AttendanceHub 2.0 - Predictive Attendance Analytics

AttendanceHub is a modern, predictive attendance management and alert system built for educational institutions. It tracks student presence, runs predictive ML insights to anticipate shortages before they happen, and allows educators to intervene early.

## Features

- **Grand Landing Page**: A premium, high-tech dark mode landing page featuring a dynamic cursor spotlight effect, ambient glows, and cinematic animations.
- **Predictive ML Insights**: Analyzes attendance trends and flags students who are projected to drop below critical thresholds in the coming month.
- **Dynamic Dashboard**: 
  - **Weekly Average & Totals**: Track overall attendance health with beautiful donut charts.
  - **Critical Alerts**: Immediately identify students at risk (attendance < 75%) and send one-click email alerts.
  - **Student Management**: A comprehensive, searchable table of all students. Quickly mark students as present, add new students via modal, or remove inactive students.
- **Global State Management**: Powered by React Context, ensuring seamless state persistence across routes without full page reloads.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (customized for a dark premium aesthetic)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/page.tsx`: The grand, animated landing page.
- `app/(app)/layout.tsx`: The global dashboard layout with top navigation.
- `app/(app)/dashboard/page.tsx`: High-level metrics overview.
- `app/(app)/shortages/page.tsx`: Critical alerts and shortages.
- `app/(app)/predictions/page.tsx`: Predictive ML insights.
- `app/(app)/students/page.tsx`: Complete student roster and management.
- `components/providers.tsx`: Global React Context for state management.
- `components/shared.tsx`: Reusable UI components (Metric Cards, Donut charts).

## License

This project is licensed under the MIT License.
