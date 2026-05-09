# Bitraxx Institutional Interface

Bitraxx is a premium, high-performance institutional coin reservation platform. Designed with a "Quiet Luxury" aesthetic, it provides a seamless and secure environment for institutional investors to reserve and manage $BRX assets.

![Bitraxx Header](https://raw.githubusercontent.com/Gaurxvv/Bitraxx/main/public/header.png)

## 💎 Design Philosophy
The platform adheres to a strict **Obsidian & Gold** color palette, emphasizing exclusivity and focus. 
- **Obsidian (#050505):** Providing depth and a sophisticated backdrop.
- **Gold Accent (#D4AF37):** Representing value and precision.
- **Focus Mode:** A distraction-free navigation system for critical financial workflows.

## 🚀 Key Features
- **Institutional Reservation System:** Secure portal for $BRX coin allocation.
- **Real-time Status Monitoring:** Integrated health checks and transaction tracking.
- **Premium UI Components:** Custom-built interactive elements including `BackgroundLines`, `ChatWidget`, and advanced data tables.
- **Supabase Integration:** Robust backend for secure data management and authentication.
- **Mobile Optimized:** Fluid responsiveness across all device types.

## 🛠 Tech Stack
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Database/Auth:** [Supabase](https://supabase.com/)
- **Styling:** Tailwind CSS with Framer Motion animations
- **Deployment:** Vercel

## 🏁 Getting Started

### Prerequisites
- Node.js 18.x or later
- A Supabase account and project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gaurxvv/Bitraxx.git
   cd Bitraxx
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the platform.

## ⚖️ License
Internal Use Only. © 2026 Bitraxx Institutional.
