# Contributing to Under Armour

Thank you for your interest in contributing to the Under Armour e-commerce platform!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/UNDER-ARMOUR.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Follow the setup instructions in [SETUP.md](./SETUP.md)

## Development Guidelines

### Code Style

#### Backend (PHP/Laravel)
- Follow PSR-12 coding standards
- Use meaningful variable and function names
- Add docblocks to all public methods
- Keep functions small and focused

Example:
```php
/**
 * Get all products with filters.
 *
 * @param int $perPage
 * @param array $filters
 * @return \Illuminate\Pagination\Paginator
 */
public function getAllProducts(int $perPage = 15, array $filters = [])
{
    return $this->productRepository->getAllPaginated($perPage, $filters);
}
```

#### Frontend (React/TypeScript)
- Use functional components with hooks
- Add prop types or TypeScript interfaces
- Keep components focused and reusable
- Use meaningful component names

Example:
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="product-card">
      {/* Component content */}
    </div>
  );
};
```

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add product search functionality
fix: Resolve cart total calculation bug
docs: Update API documentation
refactor: Simplify product filtering logic
test: Add tests for order service
```

Format: `type: description`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Build, dependencies, etc.

### Pull Requests

1. Create a descriptive PR title
2. Include a summary of changes
3. Reference related issues
4. Ensure all tests pass
5. Request review from maintainers

PR Template:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested the changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
php artisan test

# Run specific test
php artisan test tests/Feature/ProductTest.php

# Run with coverage
php artisan test --coverage
```

### Frontend Tests

```bash
cd under-armour

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

### Manual Testing

1. Test in development environment
2. Test on multiple browsers
3. Test on mobile devices
4. Test with different screen sizes
5. Test error scenarios

## Architecture Guidelines

### Backend

Follow the 4-layer clean architecture:

1. **Presentation Layer** - Controllers handle HTTP
2. **Application Layer** - Services contain business logic
3. **Domain Layer** - Models and repositories
4. **Infrastructure Layer** - Database and external services

### Frontend

Follow React best practices:

1. **Components** - Reusable UI components
2. **Pages** - Full page components
3. **Hooks** - Custom React hooks
4. **Context** - Global state management
5. **Utils** - Helper functions

## Database Changes

When modifying the database schema:

1. Create a new migration: `php artisan make:migration create_table_name`
2. Write the migration code
3. Test the migration: `php artisan migrate`
4. Test rollback: `php artisan migrate:rollback`
5. Document the changes

Example migration:
```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 10, 2);
    $table->unsignedBigInteger('category_id');
    $table->timestamps();
    
    $table->foreign('category_id')->references('id')->on('categories');
    $table->index('category_id');
});
```

## API Changes

When modifying API endpoints:

1. Update the controller
2. Update the service layer
3. Update the API resource
4. Update API documentation in [API.md](./API.md)
5. Test with cURL or Postman

## Documentation

Update documentation for:

- New features
- API changes
- Database schema changes
- Setup changes
- Configuration changes

Documentation files:
- [SETUP.md](./SETUP.md) - Setup instructions
- [API.md](./API.md) - API documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture details

## Performance Considerations

### Backend

- Use eager loading to prevent N+1 queries
- Add database indexes for frequently queried columns
- Cache expensive operations
- Paginate large result sets
- Use query scopes for reusable logic

### Frontend

- Use React.lazy() for code splitting
- Optimize images
- Minimize bundle size
- Use efficient state management
- Implement virtual scrolling for large lists

## Security Considerations

### Backend

- Validate all inputs
- Use parameterized queries (Eloquent ORM)
- Hash passwords with bcrypt
- Use HTTPS in production
- Implement rate limiting
- Sanitize outputs

### Frontend

- Sanitize user input
- Use HTTPS
- Implement CSRF protection
- Validate on client and server
- Use secure authentication tokens

## Reporting Issues

When reporting bugs:

1. Use a clear, descriptive title
2. Describe the expected behavior
3. Describe the actual behavior
4. Provide steps to reproduce
5. Include screenshots if applicable
6. Include environment details

Issue Template:
```markdown
## Description
Brief description of the issue

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- PHP Version: 8.2
- Node Version: 18
```

## Feature Requests

When requesting features:

1. Use a clear, descriptive title
2. Describe the use case
3. Explain the expected behavior
4. Provide examples if applicable
5. Discuss potential implementation

## Code Review Process

1. Maintainers review your PR
2. Address feedback and comments
3. Update your PR with changes
4. Maintainers approve and merge

## Deployment

### Staging Deployment

```bash
git push origin feature/your-feature
# Create PR and wait for approval
# Merge to staging branch
# Deploy to staging environment
```

### Production Deployment

```bash
# After testing on staging
git checkout main
git pull origin main
# Deploy to production
```

## Questions?

- Check existing documentation
- Search closed issues
- Ask in discussions
- Contact maintainers

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn
- Report inappropriate behavior

---

Thank you for contributing! 🎉
