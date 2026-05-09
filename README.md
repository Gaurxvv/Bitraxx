# Bitraxx Institutional Interface

Bitraxx is a premium, high-performance institutional coin reservation platform. Designed with a "Quiet Luxury" aesthetic, it provides a seamless and secure environment for institutional investors to reserve and manage $BRX assets.

![Bitraxx Header](https://raw.githubusercontent.com/Gaurxvv/Bitraxx/main/public/header.png)

## 💎 Design Philosophy
The platform adheres to a strict **Obsidian & Gold** color palette, emphasizing exclusivity and focus. 
- **Obsidian (#050505):** Providing depth and a sophisticated backdrop.
- **Gold Accent (#D4AF37):** Representing value and precision.
- **Focus Mode:** A distraction-free navigation system for critical financial workflows.

## 🚀 Key Features
- **Institutional Reservation System:** Secure portal for $BRX coin allocation with real-time validation.
- **Admin Command Center:** Comprehensive dashboard for managing reservations, bookings, and user status.
- **Automated Notifications:** Integration with **Resend** for institutional-grade email confirmations.
- **Live Concierge:** Integrated **Tawk.to** chat widget for immediate investor support.
- **Premium UI Components:** Custom-built interactive elements including `BackgroundLines`, `ChatWidget`, and advanced data tables.
- **Mobile Optimized:** Fluid responsiveness across all device types, ensuring a premium experience on the go.

## 🛠 Tech Stack
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Database/Auth:** [Supabase](https://supabase.com/)
- **Email Service:** [Resend](https://resend.com/)
- **Live Chat:** [Tawk.to](https://tawk.to/)
- **Styling:** Tailwind CSS with Framer Motion animations
- **Deployment:** Vercel

## 🏁 Getting Started

### Prerequisites
- Node.js 18.x or later
- A Supabase account and project
- A Resend API key for email functionality

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
   Create a `.env.local` file in the root directory based on `.env.example`:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Email (Resend)
   RESEND_API_KEY=your_resend_key

   # Admin
   ADMIN_EMAIL=admin@brxcoin.com
   ADMIN_PASSWORD=your_password
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the platform.

## 📈 Architecture
- **`/src/app`**: Next.js App Router for page structure and routing.
- **`/src/components`**: Modular UI components (Admin, Layout, Home).
- **`/src/lib`**: Core logic, Supabase client, and server actions.

## ⚖️ License
Internal Use Only. © 2026 Bitraxx Institutional.
