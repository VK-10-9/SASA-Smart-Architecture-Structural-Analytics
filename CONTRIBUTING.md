# Contributing to SASA

Thank you for your interest in contributing to SASA - Smart Architecture & Structural Analytics! This document provides guidelines for contributing to the project.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment for all contributors

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup

1. **Fork the repository**
   - Click "Fork" on the GitHub repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SASA-Smart-Architecture-Structural-Analytics.git
   cd SASA-Smart-Architecture-Structural-Analytics
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your API keys to .env.local
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Development Workflow

### Branch Naming Convention
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Convention
Follow conventional commits format:
- `feat:` - new features
- `fix:` - bug fixes
- `docs:` - documentation changes
- `style:` - formatting changes
- `refactor:` - code refactoring
- `test:` - adding tests
- `chore:` - maintenance tasks

## 📋 Code Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use strict type checking

### React Components
- Use functional components with hooks
- Follow component naming conventions (PascalCase)
- Keep components focused and reusable
- Add proper error boundaries

### Styling
- Use Tailwind CSS classes
- Follow existing design patterns
- Ensure responsive design
- Test on mobile devices

### Error Handling
- Use the centralized error handling system
- Add proper try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors with context

## 🧪 Testing

### Code Quality Checks
```bash
# Run all checks
npm run pre-commit

# Individual checks
npm run type-check    # TypeScript checking
npm run lint         # ESLint
npm run format       # Prettier formatting
```

### Manual Testing
- Test all affected features
- Verify responsive design
- Check error handling
- Test with different browsers

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Include usage examples
- Update type definitions

### README Updates
- Update features list for new functionality
- Add setup instructions for new dependencies
- Update screenshots if UI changes
- Keep examples current

## 🚀 Submitting Changes

### Pull Request Process

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to the GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Description Should Include:**
   - Clear description of changes
   - Screenshots for UI changes
   - Testing instructions
   - Breaking changes (if any)

### PR Review Process
- Maintain focus on code quality
- Address review feedback promptly
- Update documentation as needed
- Ensure all checks pass

## 🐛 Bug Reports

### Before Reporting
- Check existing issues
- Reproduce the bug
- Test on different devices/browsers

### Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 96]
- Device: [e.g., Desktop/Mobile]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this work?

## Alternatives Considered
Other approaches considered
```

## 📚 Resources

### Learning Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Project Resources
- [Project Architecture](./README.md#architecture)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./docs/api.md)

## ❓ Questions?

- Open a GitHub issue for technical questions
- Check existing documentation first
- Be specific about your question
- Provide relevant code snippets

## 🎯 Areas for Contribution

### High Priority
- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile responsiveness

### Medium Priority
- [ ] Additional load calculators
- [ ] UI/UX improvements
- [ ] Documentation updates
- [ ] Code refactoring

### Low Priority
- [ ] Additional features
- [ ] Design enhancements
- [ ] Developer tooling
- [ ] Build optimizations

Thank you for contributing to SASA! 🚀
