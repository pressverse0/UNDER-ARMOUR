# Contributing to Under Armour E-Commerce

First off, thank you for considering contributing to this project! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+ or higher
- npm, pnpm, or yarn
- Git

### Setup Steps

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/UNDER-ARMOUR.git
   cd UNDER-ARMOUR
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open http://localhost:3000**

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use type inference when appropriate

```typescript
// ✅ Good
interface Product {
  id: number
  name: string
  price: number
}

// ❌ Avoid
const product: any = { ... }
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Use custom classes for repeated patterns
- Maintain consistent spacing and sizing

```tsx
// ✅ Good
<div className="flex items-center gap-4 p-6">

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### File Naming

- Use kebab-case for files: `product-card.tsx`
- Use PascalCase for components: `ProductCard`
- Use camelCase for functions: `handleClick`
- Use UPPER_CASE for constants: `MAX_ITEMS`

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add product filtering
fix: resolve cart calculation bug
docs: update README
style: format code with prettier
refactor: simplify checkout logic
test: add product tests
chore: update dependencies
```

### Code Organization

```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface Props {
  title: string
}

// 3. Component
export default function Component({ title }: Props) {
  // 4. State
  const [count, setCount] = useState(0)
  
  // 5. Effects
  useEffect(() => {
    // ...
  }, [])
  
  // 6. Handlers
  const handleClick = () => {
    setCount(count + 1)
  }
  
  // 7. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Count: {count}</Button>
    </div>
  )
}
```

## Testing

### Before Submitting

1. **Run linting**
   ```bash
   pnpm lint
   ```

2. **Build the project**
   ```bash
   pnpm build
   ```

3. **Test in browser**
   - Test on different screen sizes
   - Test all interactive elements
   - Check console for errors

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms validate properly
- [ ] Buttons and links work
- [ ] Images load correctly
- [ ] Responsive design works
- [ ] No console errors
- [ ] Accessibility features work

## Pull Request Process

### Before Submitting

1. Update documentation if needed
2. Add/update tests if applicable
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Follow the PR template

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### Review Process

1. At least one maintainer must approve
2. All CI checks must pass
3. No merge conflicts
4. Documentation is updated
5. Code follows standards

## Project Structure

When adding new features, follow the existing structure:

```
app/
├── [category]/        # Category pages
│   └── page.tsx
├── api/              # API routes
│   └── [endpoint]/
│       └── route.ts
components/           # Reusable components
├── ui/              # UI components
└── [component].tsx  # Feature components
```

## Documentation

### Code Comments

```typescript
/**
 * Calculates the total price including tax
 * @param subtotal - The subtotal amount
 * @param taxRate - The tax rate (e.g., 0.08 for 8%)
 * @returns The total price with tax
 */
function calculateTotal(subtotal: number, taxRate: number): number {
  return subtotal * (1 + taxRate)
}
```

### README Updates

- Keep README.md up to date
- Add new features to FEATURES.md
- Document breaking changes
- Update installation steps if needed

## Community

### Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Join our community chat (if available)
- Read the documentation

### Staying Updated

- Watch the repository for updates
- Follow the changelog
- Subscribe to release notifications

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue or reach out to the maintainers.

Thank you for contributing! 🎉
