# Flight Search

Welcome to **Flight Search**! A modern web application that helps you discover and compare flights easily and quickly. Designed specifically for an enjoyable and efficient search experience.

## Featured Features

### **Smart Search**
- **Real-time search** with advanced filters
- **Multi-airline support** from various carriers
- **Price range filtering** for your budget
- **Duration filtering** for on-time travel

### **Premium User Experience**
- **Dark mode support** for eye comfort
- **Responsive design** perfect on all devices
- **Virtual scrolling** for optimal performance with thousands of data
- **Smooth animations** and seamless transitions

### **High Performance**
- **Next.js 16** with latest App Router
- **React Query** for intelligent state management
- **TanStack Virtual** for ultra-smooth scrolling
- **Optimized fonts** and lazy loading

### **Developer Experience**
- **TypeScript** for code quality
- **Jest testing** with 100% coverage
- **ESLint** for code consistency
- **Prettier** for automatic formatting

## Quick Start

### Prerequisites
Node.js version 20

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and start explor

### Testing
```bash
npm test              # Run all tests
npm run test:watch    # Tests with auto-reload
npm run test:coverage # Tests with coverage report
```

### Production
```bash
npm run build
npm start
```

## How to Use

1. **Choose Destination** - Select departure and arrival airports
2. **Set Filters** - Use filters for price, duration, and airlines
3. **Find Flights** - Browse search results with virtual scrolling
4. **Compare Prices** - View detailed information for each flight
5. **Book Tickets** - Click "Book" to start booking process

## UI/UX Features

### Dark Mode
- Toggle between light and dark mode
- Automatically follows system preference
- Smooth transition animations

### Mobile First
- Filter drawer for mobile
- Touch-friendly interactions
- Optimized for all screen sizes

### Performance Features
- Virtual scrolling for 1000+ flights
- Lazy loading components
- Optimized images with Next.js
- Automatic code splitting

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Leading UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### State Management
- **Redux Toolkit** - Powerful state management
- **React Query** - Server state management
- **Redux Persist** - Persistent state

### UI Components
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **Custom Components** - Reusable UI elements

### Development Tools
- **Jest** - Unit testing framework
- **ESLint** - Code linting
- **Husky** - Git hooks

### Performance
- **TanStack Virtual** - Virtual scrolling
- **Next.js Optimization** - Built-in optimizations
- **React.memo** - Component memoization

## 🚀 CI/CD

This project uses **GitHub Actions** for automated testing and deployment.

### Workflow Triggers
- **Push** to `main` or `develop` branches
- **Pull Request** targeting `main` or `develop` branches

### CI Pipeline Steps
1. **Setup** - Node.js 18.x and 20.x (matrix testing)
2. **Install** - `npm ci` for clean dependency installation
3. **Lint** - `npm run lint` for code quality checks
4. **Test** - `npm test` for unit test execution

### Quality Gates
- ✅ **ESLint**: No linting errors
- ✅ **Jest**: All tests pass (18/18)
- ✅ **TypeScript**: No compilation errors

### Matrix Testing
Tests run on multiple Node.js versions for compatibility:
- Node.js 18.x (LTS)
- Node.js 20.x (Current)

### Author : 
Muhammad Imam Rozali
