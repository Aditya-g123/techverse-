#!/bin/bash

echo "🚀 Starting Techverse Website..."
echo "================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating environment file..."
    cat > .env.local << EOL
# Supabase Configuration (Already Connected)
NEXT_PUBLIC_SUPABASE_URL=https://ovsjphatiwxggmvbdpas.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2pwaGF0aXd4Z2dtdmJkcGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDgzODEsImV4cCI6MjA2MzQ4NDM4MX0.6_uwzsfJilbISS6zVqvBsBP3JUfS1WYVXD_xTdRq1kg

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOL
    echo "✅ Environment file created"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🌟 Techverse Website Features:"
echo "• 📚 18 Courses with enrollment system"
echo "• 📝 Inquiry forms with Supabase integration"
echo "• 💬 WhatsApp integration (+91 9120984300)"
echo "• 🎯 Google Form backup (guaranteed delivery)"
echo "• 👥 About section with team info"
echo "• ⭐ Student testimonials"
echo "• 🎁 Special offer popups"
echo "• 📱 Fully responsive design"
echo "• 🔐 Admin dashboard for managing inquiries"
echo ""

echo "🚀 Starting development server..."
echo "📍 Your website will be available at: http://localhost:3000"
echo ""
echo "🔧 Quick Test Checklist:"
echo "1. ✅ Homepage loads with hero section"
echo "2. ✅ About section shows team members"
echo "3. ✅ Courses section displays all 18 courses"
echo "4. ✅ Inquiry form connects to Supabase"
echo "5. ✅ WhatsApp button works"
echo "6. ✅ Contact section is functional"
echo ""

# Start the development server
npm run dev
