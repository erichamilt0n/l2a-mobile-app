# Contributing Guidelines

Thank you for your interest in contributing to this project! This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Our CI/CD Pipeline

We use several tools to ensure code quality and security. Here's what happens when you make changes:

### 1. Code Quality Checks

- **ESLint**: Checks your code for errors and style issues
- **Prettier**: Makes your code look consistent
- **TypeScript**: Makes sure your types are correct

### 2. Security Checks

- **CodeQL**: Looks for security problems in your code
- **Snyk**: Checks for security issues in dependencies
- **Dependabot**: Keeps dependencies up to date

### 3. Performance Checks

- **Lighthouse**: Measures how fast and accessible your changes are
- **Bundle Size**: Makes sure the app stays small and fast

### 4. Testing

- **Unit Tests**: Makes sure individual parts work correctly
- **Integration Tests**: Checks if everything works together
- **E2E Tests**: Tests the whole app like a real user

### 5. Monitoring

- **Grafana Metrics**: Tracks important numbers about our app
- **Error Tracking**: Watches for problems in production
- **Usage Analytics**: Helps us understand how people use the app

## How to Make Changes

1. **Start Fresh**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b your-branch-name
   ```

   Example: `git checkout -b fix/login-button`

2. **Make Your Changes**

   - Write your code
   - Test it locally
   - Add comments to explain complex parts

3. **Check Your Work**

   ```bash
   npm run lint        # Check for code problems
   npm run format      # Fix code formatting
   npm test           # Run tests
   npm run build      # Make sure it builds
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "type: short description"
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

5. **Push and Create PR**

   ```bash
   git push origin your-branch-name
   ```

   Then go to GitHub and create a Pull Request

## What Happens Next?

1. **Automatic Checks** (about 5-10 minutes)

   - Green check = Good to go
   - Red X = Something needs fixing
   - Yellow dot = Still running

2. **Code Review**

   - At least one team member will review
   - They might suggest changes
   - Make changes if needed

3. **Merging**

   - All checks must pass
   - Need at least one approval
   - PR will be merged to main

## Common Issues and Solutions

### "Checks Failed"

1. Click the "Details" link
2. Look at what failed
3. Fix the problem
4. Push your changes

### "Merge Conflicts"

1. Get the latest main:

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git merge main
   ```

2. Fix any conflicts
3. Push your changes

### "Branch Out of Date"

1. Update your branch:

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git merge main
   git push origin your-branch
   ```

## Need Help?

- Create an issue for questions
- Ask in pull request comments
- Check existing documentation

Remember: It's okay to make mistakes! The CI/CD pipeline is here to help catch problems before they reach users.

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up pre-commit hooks:

   ```bash
   npm run prepare
   ```

3. Create a `.env` file based on `.env.example`

## Coding Standards

- Follow ESLint and Prettier configurations
- Write self-documenting code
- Include JSDoc comments for functions
- Keep functions small and focused
- Write meaningful variable and function names

## Testing Guidelines

- Write unit tests for new features
- Maintain or improve code coverage
- Test edge cases and error conditions
- Use meaningful test descriptions

## Documentation

- Update README.md for significant changes
- Document new features and APIs
- Include examples where appropriate
- Keep documentation up to date

## Review Process

1. All submissions require review
2. Changes must pass CI/CD checks
3. Reviews require at least one approval
4. Address review feedback promptly

## Additional Resources

- [Issue Templates](.github/ISSUE_TEMPLATE/)
- [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)
- [Security Policy](SECURITY.md)

## Questions?

Feel free to create an issue for any questions about contributing.
