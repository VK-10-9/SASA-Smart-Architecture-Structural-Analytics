# SASA Deployment Guide

## 🚀 Quick Deployment on Vercel

### Prerequisites
- GitHub account with your SASA repository
- Vercel account (free tier available)
- Together AI API key
- Resend API key (for contact form)

### Step 1: Connect to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your `SASA-Smart-Architecture-Structural-Analytics` repository

### Step 2: Configure Environment Variables
In your Vercel project settings, add the following environment variables:

```env
TOGETHER_API_KEY=your_together_ai_api_key_here
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_BASE_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

### Step 3: Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be live at `https://your-project-name.vercel.app`

## 🔗 Getting API Keys

### Together AI API Key
1. Visit [Together AI](https://www.together.ai)
2. Sign up for an account
3. Navigate to API section
4. Generate a new API key
5. Copy the key to your environment variables

### Resend API Key (for contact form)
1. Visit [Resend](https://resend.com)
2. Sign up for an account
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your environment variables

## 🛠️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VK-10-9/SASA-Smart-Architecture-Structural-Analytics.git
   cd SASA-Smart-Architecture-Structural-Analytics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] API keys are valid and working
- [ ] Build completes without errors
- [ ] All features tested in production
- [ ] Contact form working (if enabled)
- [ ] AI features responding correctly
- [ ] Performance metrics acceptable

## 🔧 Troubleshooting

### Build Errors
- Check TypeScript errors: `npm run type-check`
- Fix linting issues: `npm run lint:fix`
- Verify all dependencies: `npm install`

### API Issues
- Verify API keys are correct
- Check API rate limits
- Ensure environment variables are set in production

### Performance Issues
- Enable caching in Vercel
- Optimize images and assets
- Monitor Core Web Vitals

## 📊 Monitoring

### Vercel Analytics
- Enabled by default in the app
- View performance metrics in Vercel dashboard
- Monitor Core Web Vitals and user engagement

### Error Tracking
- Check Vercel function logs for API errors
- Monitor browser console for client-side issues
- Set up alerts for critical errors

## 🔄 Continuous Deployment

The repository is set up for automatic deployment:
- Push to `master` branch triggers deployment
- Vercel builds and deploys automatically
- Zero-downtime deployments
- Rollback capability if needed

## 🌐 Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains" section
3. Add your custom domain
4. Configure DNS records as instructed
5. SSL certificate is automatically provisioned
