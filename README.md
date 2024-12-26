# Lodge2A Mobile App

[![Known Vulnerabilities](https://snyk.io/test/github/erichamilt0n/l2a-mobile-app/badge.svg)](https://snyk.io/test/github/erichamilt0n/l2a-mobile-app)

A modern, responsive web application for Lodge2A club management for members. Built with React, TypeScript, and Vite.

## Features

- Responsive navigation system with collapsible menu
- Dashboard for quick overview
- Event management
- Reservation system
- Pro shop interface
- User settings and preferences
- Mobile-first design

## Tech Stack

- React 18.3
- TypeScript
- Vite
- TailwindCSS
- React Router DOM

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/l2a-mobile-app.git
cd l2a-mobile-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Project Structure

```
l2a-mobile-app/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── assets/        # Static assets
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Public assets
└── ...config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
