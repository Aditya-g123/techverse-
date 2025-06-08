# Techverse Educational Website

A modern educational platform built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies:**
\`\`\`bash
git clone <your-repo>
cd techverse-website
npm install
\`\`\`

2. **Set up environment variables:**
Create a `.env.local` file in the root directory:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://ovsjphatiwxggmvbdpas.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2pwaGF0aXd4Z2dtdmJkcGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDgzODEsImV4cCI6MjA2MzQ4NDM4MX0.6_uwzsfJilbISS6zVqvBsBP3JUfS1WYVXD_xTdRq1kg
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

3. **Run the development server:**
\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The project includes SQL scripts to set up your Supabase database:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the script: `scripts/create-working-inquiries-table.sql`

## 📱 Features

- ✅ Responsive design
- ✅ Course catalog with enrollment
- ✅ Contact forms with multiple submission methods
- ✅ WhatsApp integration
- ✅ Admin dashboard
- ✅ Testimonials section
- ✅ About section with team info
- ✅ Animated UI components

## 🔧 Configuration

### Supabase Setup
- Database URL and keys are pre-configured
- RLS policies are set up for security
- Tables: `inquiries`, `enrollments`

### Contact Methods
- Google Form: https://forms.gle/qUh9ZwGpM8fBagcn9
- WhatsApp: +91 9120984300
- Email: info@techverse.com

## 📂 Project Structure

\`\`\`
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utility functions
├── scripts/            # Database scripts
└── public/             # Static assets
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🛠️ Troubleshooting

### Database Issues
- Use the "Test DB" button in the inquiry section
- Check Supabase dashboard for table structure
- Run the SQL scripts if tables are missing

### Form Submission Issues
- Primary method: Google Form (always works)
- Fallback: Direct database submission
- Alternative: Email/WhatsApp links

## 📞 Support

- Phone: +91 9120984300
- Email: info@techverse.com
- WhatsApp: Available via floating button
