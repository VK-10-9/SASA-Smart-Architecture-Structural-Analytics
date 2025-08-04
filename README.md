# 🚀 SASA – Smart Architecture & Structural Analytics

**SASA** is a fullstack, AI-powered web platform developed by first-year Computer Science students at **K.L.E. Institute of Technology**, aimed at simplifying structural design and analysis through intelligent load calculators, material modeling, and real-time recommendations.

---

## 📘 Project Overview

This project was developed as part of the academic curriculum at **K.L.E. Society’s K.L.E. Institute of Technology**, affiliated with **Visvesvaraya Technological University (VTU)**, with guidance from the Civil Engineering department.

> The platform leverages modern web technologies to allow users (students, professionals, and researchers) to perform **dead, live, wind, and seismic load** calculations and receive **AI-based structural recommendations** with PDF export functionality.

---

## 🏫 Institution Details

* **College**: K.L.E. Institute of Technology, Hubballi
* **Department**: Computer Science & Engineering
* **University**: Visvesvaraya Technological University (VTU)
* **Project Guide**: Mr. Rajat Vaidya
* **Team Members**:

  * Vishwanath M. Koliwad 
  * Nihal V. Batunge 

---

## 💻 Tech Stack

* **Frontend**: Next.js 14, Tailwind CSS, Shadcn UI, Radix UI
* **Backend**: Flask (Python)
* **AI Model**: Together AI’s Mixtral-8x7B
* **Hosting**: [Vercel](https://vercel.com)
* **Design**: Blueprint UI with engineering-style dark mode

---

## 🧠 Core Features (v1.0)

* 🌐 Web-based interface (no installation required)
* 🧮 Dead, Live, Wind, and Seismic Load Calculators
* 🤖 AI-Powered Structural Solver
* 📄 Exportable PDF Reports
* 🎯 Material Selector & Scenario Planner
* 💡 Responsive UI for educational and professional usage

---

## 🔧 Getting Started (Development Mode)

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VK-10-9/SASA-Smart-Architecture-Structural-Analytics.git
   cd SASA-Smart-Architecture-Structural-Analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run pre-commit` - Run all checks before committing

### Environment Variables
```env
TOGETHER_API_KEY=your_together_ai_api_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Comprehensive error handling**
- **Input validation and sanitization**

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI
- **Backend**: Next.js API Routes
- **AI Integration**: Together AI (Mixtral models)
- **Email**: Resend API
- **Analytics**: Vercel Analytics

### Project Structure
```
src/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── (pages)/           # Page components
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── blocks/           # Page sections
│   └── load-calculator/  # Calculator components
├── lib/                  # Utility libraries
│   ├── api-client.ts     # API client
│   ├── error-handler.ts  # Error handling
│   ├── validation.ts     # Input validation
│   └── config.ts         # Configuration
├── types/                # TypeScript types
├── hooks/                # Custom React hooks
└── data/                 # Static data
```

### Key Features
- **Type-safe API calls** with comprehensive error handling
- **Input validation** and sanitization
- **Responsive design** with accessibility features
- **Performance optimized** with code splitting
- **SEO friendly** with proper meta tags

---

To run the development server locally:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📈 Features in Development (v1.1 & Beyond)

* 🔐 Login system to save multiple scenarios
* 📊 Shear Force & Bending Moment Diagrams
* 🎨 Interactive Load Visualizer
* ✅ IS Code compliance checker
* 📦 CAD/BIM Export (DWG, IFC)
* 📱 PWA Support (Mobile-friendly usage)
* 🧑‍🏫 Faculty Panel & Scenario Templates

---

## 🌍 Live Project

> Explore the live platform here: [https://sassa-civil.vercel.app](https://sassa-civil.vercel.app)

---

## 📚 Learn More About the Stack

* [Next.js Documentation](https://nextjs.org/docs)
* [Vercel Platform](https://vercel.com/)
* [Together AI](https://www.together.ai/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn UI](https://ui.shadcn.com/)

---

## 🤝 Acknowledgements

Special thanks to our guide **Mr. Rajat Vaidya** for his support and mentorship.

**Developed with passion by:**

* **Vishwanath M. Koliwad**
* **Nihal V. Batunge**

🧠 *Team SASA – Smart Architecture & Structural Analytics*
*"Blending Computer Science with Structural Engineering for a smarter future!"*


