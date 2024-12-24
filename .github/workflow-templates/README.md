# CI/CD Workflow Templates

This directory contains reusable workflow templates for Node.js applications.

## Setup Instructions

1. **Organization Secrets**
   - Copy `secrets-template.yml` content to your GitHub Organization Settings
   - Set up each secret with appropriate values
   - These secrets will be available to all repositories in your organization

2. **Repository Setup**
   - Copy the workflow files from `.github/workflows/` to your new repository
   - Ensure all configuration files are present:
     - `.eslintrc.json`
     - `.stylelintrc.json`
     - `.markdownlint.json`
     - `.prettierrc`
     - `tsconfig.json`

3. **Branch Protection**
   - Enable branch protection rules for `main`
   - Require status checks to pass
   - Require pull request reviews

4. **Repository Secrets**
   If not using organization secrets, set up repository-level secrets:
   ```bash
   CODACY_PROJECT_TOKEN=your_token
   SNYK_TOKEN=your_token
   VERCEL_TOKEN=your_token
   VERCEL_ORG_ID=your_org_id
   VERCEL_PROJECT_ID=your_project_id
   GRAFANA_CLOUD_TOKEN=your_token
   NPM_TOKEN=your_token
   ```

5. **Code Owners**
   - Copy `.github/CODEOWNERS` to your repository
   - Update with appropriate team members

## Included Workflows

1. **Code Quality**
   - ESLint
   - Prettier
   - TypeScript
   - Codacy

2. **Security**
   - CodeQL
   - Snyk
   - Dependabot

3. **Performance**
   - Lighthouse
   - Bundle size analysis

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

5. **Monitoring**
   - Grafana metrics
   - Error tracking

## Customization

1. **Workflow Triggers**
   - Edit workflow files to adjust when they run
   - Modify branch patterns in `on:` section

2. **Tool Configuration**
   - Adjust tool settings in respective config files
   - Update version pins in workflow files

3. **Dependencies**
   - Update `package.json` with required dependencies
   - Adjust Dependabot settings as needed

## Troubleshooting

1. **Check Permissions**
   - Ensure GitHub Actions are enabled
   - Verify secret access
   - Check branch protection settings

2. **Common Issues**
   - Review error messages in Actions tab
   - Check secret names match exactly
   - Verify all required files are present
