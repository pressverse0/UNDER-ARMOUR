# Styling Guide

## Design System

### Brand Colors

```css
/* Primary Colors */
--red-primary: #C9001F;      /* Under Armour Red */
--black-primary: #000000;     /* Black */
--white-primary: #FFFFFF;     /* White */

/* Grayscale */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Accent Colors */
--green-success: #10B981;
--red-error: #EF4444;
--blue-info: #3B82F6;
--yellow-warning: #F59E0B;
```

### Typography

#### Font Families
```css
/* Body Text */
font-family: 'Barriecito', cursive;

/* Headings & Buttons */
font-family: 'Montserrat', sans-serif;
```

#### Font Weights
```css
--font-normal: 400;
--font-bold: 700;
--font-black: 900;    /* Primary weight for headings */
```

#### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */
--text-8xl: 6rem;      /* 96px */
```

## Custom Classes

### Sketchy Borders

```css
.sketchy-border {
  border-style: solid;
  border-width: 4px;
  border-color: #000;
  position: relative;
}

.sketchy-card {
  @apply sketchy-border bg-white;
  box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
}

.sketchy-frame {
  @apply border-4 border-black;
  box-shadow: inset 4px 4px 0px rgba(0, 0, 0, 0.1);
}
```

### Buttons

```css
.sketchy-btn {
  @apply px-6 py-3 font-black uppercase tracking-wide;
  @apply border-4 border-black;
  @apply transition-all duration-300;
  @apply hover:scale-105 hover:shadow-lg;
}

.sketchy-btn-outline {
  @apply sketchy-btn bg-transparent;
  @apply hover:bg-black hover:text-white;
}
```

### Shadows

```css
/* Card Shadow */
box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);

/* Hover Shadow */
box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1);

/* Inset Shadow */
box-shadow: inset 4px 4px 0px rgba(0, 0, 0, 0.1);

/* Toast Shadow */
box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
```

## Component Styles

### Cards

```tsx
<Card className="sketchy-card bg-white border-4 border-black">
  <CardContent className="p-8">
    {/* Content */}
  </CardContent>
</Card>
```

### Buttons

```tsx
{/* Primary Button */}
<Button className="sketchy-btn bg-red-600 text-white hover:bg-red-700">
  Click Me
</Button>

{/* Outline Button */}
<Button className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white">
  Click Me
</Button>
```

### Badges

```tsx
<Badge className="bg-red-600 font-black uppercase">
  Sale
</Badge>
```

### Inputs

```tsx
<Input
  className="border-2 border-gray-300 focus:border-red-600 font-bold"
  placeholder="Enter text"
/>
```

### Toasts

```tsx
toast({
  title: "Success!",
  description: "Action completed successfully",
  variant: "success",
})
```

## Animations

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
```

### Slide In

```css
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-in-out;
}
```

### Scale In

```css
@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scaleIn {
  animation: scaleIn 0.2s ease-in-out;
}
```

### Wiggle

```css
@keyframes wiggle {
  0%, 100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
}

.animate-wiggle {
  animation: wiggle 1s ease-in-out infinite;
}
```

## Responsive Design

### Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

### Usage

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Responsive grid */}
</div>
```

## Layout Patterns

### Container

```tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

### Section

```tsx
<section className="py-20 bg-gray-100">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

### Hero

```tsx
<section className="relative bg-black text-white py-20 lg:py-32">
  <div className="container mx-auto px-4">
    <h1 className="text-5xl lg:text-7xl font-black uppercase">
      Hero Title
    </h1>
  </div>
</section>
```

## Best Practices

### 1. Use Utility Classes
```tsx
// ✅ Good
<div className="flex items-center justify-between p-4">

// ❌ Avoid
<div style={{ display: 'flex', alignItems: 'center' }}>
```

### 2. Consistent Spacing
```tsx
// Use Tailwind spacing scale
p-4, p-6, p-8  // Padding
m-4, m-6, m-8  // Margin
gap-4, gap-6   // Gap
```

### 3. Bold Typography
```tsx
// Always use font-black for headings
<h1 className="font-black uppercase">Title</h1>
```

### 4. Uppercase Text
```tsx
// Use uppercase for buttons and headings
<Button className="uppercase">Click Me</Button>
```

### 5. Consistent Borders
```tsx
// Always use 4px borders for cards
<Card className="border-4 border-black">
```

### 6. Red Accent
```tsx
// Use red for primary actions and accents
<Button className="bg-red-600 hover:bg-red-700">
```

### 7. Smooth Transitions
```tsx
// Add transitions to interactive elements
<button className="transition-all duration-300 hover:scale-105">
```

## Accessibility

### Color Contrast
- Ensure text has sufficient contrast (WCAG AA minimum)
- Red on white: ✅ Pass
- White on red: ✅ Pass
- Gray on white: Check contrast ratio

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-red-600">
  Button
</button>
```

### Screen Readers
```tsx
<button aria-label="Close menu">
  <X className="h-6 w-6" />
</button>
```

## Dark Mode

### Theme Provider
```tsx
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

### Dark Mode Classes
```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  {/* Content */}
</div>
```

## Performance

### Image Optimization
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={600}
  height={400}
  className="object-cover"
/>
```

### Lazy Loading
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  loading="lazy"
/>
```

### CSS Optimization
- Use Tailwind's JIT mode
- Purge unused styles
- Minimize custom CSS
