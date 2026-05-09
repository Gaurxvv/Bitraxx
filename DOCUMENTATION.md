# Bitraxx Institutional Platform Documentation

## 🏗 Tech Stack
The Bitraxx platform is built using a modern, high-performance stack designed for security, scalability, and premium user experience.

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom "Quiet Luxury" Obsidian & Gold theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database & Auth**: Supabase
- **Form Handling**: React Hook Form + Zod (Validation)
- **Deployment**: Vercel / Custom Node.js environment

---

## 🔐 API & Infrastructure Requirements

To run the Bitraxx platform, you need a **Supabase** instance configured with the following:

### 1. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Schema
You must execute the following SQL in your Supabase SQL Editor to create the `bookings` table:

```sql
-- Create the bookings table for institutional reservations
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id TEXT UNIQUE NOT NULL, -- Format: BRX-YYYYMMDD-XXXXXX
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Canceled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the reservation form)
CREATE POLICY "Allow anonymous inserts" ON public.bookings
    FOR INSERT WITH CHECK (true);

-- Allow anonymous selects by booking_id (for status tracking)
CREATE POLICY "Allow anonymous status checks" ON public.bookings
    FOR SELECT USING (true);
```

---

## 🔄 Project Workflow

### 1. Institutional Landing
Users arrive at a high-performance landing page featuring an architectural design, a live countdown to the $BRX protocol launch, and detailed institutional features.

### 2. Sovereign Reservation Flow
- **Entry**: User clicks "Access Registry" or "Reserve Access".
- **Validation**: The form uses **Zod** to ensure all institutional data (Entity name, jurisdiction, allocation amount) is valid.
- **Submission**: Data is sent via a **Next.js Server Action** to Supabase.
- **Persistence**: A unique `booking_id` is generated (e.g., `BRX-20260510-A1B2C3`).
- **Confirmation**: The user receives a high-contrast success screen with their unique Authorization Key.

### 3. Verification & Tracking
- **Lookup**: Users can enter their Authorization Key on the `/status` page.
- **Real-time Query**: The system queries the Supabase `bookings` table for that specific ID.
- **Status States**:
    - **Protocol Review (Pending)**: Initial state for all reservations.
    - **Protocol Authorized (Approved)**: Allocation is secured in the digital vault.
    - **Protocol Rejected (Canceled)**: Reservation is de-listed.

---

## 🎨 Design Philosophy: "Quiet Luxury"
Bitraxx follows a strict design system called **Sovereign Obsidian**:
- **Palette**: Pure `#000000` backgrounds, `#D4AF37` (Gold) accents, and `slate-500/600` for secondary technical labels.
- **Typography**: High-contrast Serif headings paired with disciplined, wide-tracking (`tracking-[0.3em]`) Sans-serif labels.
- **Interactions**: Subtle, non-intrusive micro-animations using Framer Motion to convey speed and security.
