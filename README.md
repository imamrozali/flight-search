# Flight Search

Welcome to **Flight Search**! A modern web application that helps you discover and compare flights easily and quickly. Designed specifically for an enjoyable and efficient search experience.
---
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
---
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
---
## How to Use

1. **Choose Destination** - Select departure and arrival airports
2. **Set Filters** - Use filters for price, duration, and airlines
3. **Find Flights** - Browse search results with virtual scrolling
4. **Compare Prices** - View detailed information for each flight
5. **Book Tickets** - Click "Book" to start booking process

---
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

---
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

### Workflow Triggers
- **Push** to `main` branches
- **Pull Request** targeting `main` branches


### CI Pipeline

* Runs on push and pull request to `main`
* Steps:

  1. Install dependencies (`npm ci`)
  2. Lint (`npm run lint`)
  3. Test (`npm test`)
* Tested on Node.js 20.x


---

# Question Fixed 

### Data Issues & Improvements

This is a quick but important note about the current flight data. Overall, the data is solid and totally usable, but there are a few things worth cleaning up now to avoid headaches later — especially as frontend logic grows.


### 1. `baggage` is still a free-form string

Right now, `baggage` values look like:

* `"1Piece"`
* `"10Kg"`
* `"20Kg"`

This makes things harder when it comes to:

* filtering (e.g. minimum 20kg)
* sorting
* doing any real calculation

**Suggestion:**
Use a more structured and predictable format.

Example:

```json
"baggage": {
  "type": "KG",
  "value": 20
}
```

Or at least:

```json
"baggageKg": 20
```


### 2. `price.original` is not always present

Some flights include:

```json
"original": 1200000
```

but most of them don’t.

This is fine as long as:

* the field is treated as **optional** in the frontend
* no logic assumes it will always exist

**Note:**
If consistency helps, setting `original: null` when there’s no discount could also work.

### 3. `duration` should stay derived, not manual

At the moment, `duration` matches the actual time difference between departure and arrival — including overnight flights.

Just make sure going forward:

* `duration` is calculated from time values
* not manually hardcoded

This helps prevent silent data issues that look correct at first glance.


### 4. `date` and `time` are split

Splitting `date` and `time` works and isn’t wrong.

However, for:

* sorting
* comparisons
* timezone handling

having an ISO datetime field would make things safer and simpler.

Example:

```json
"datetime": "2025-10-22T15:30:00+07:00"
```

### 5. IDs are fine, just keep them unique

The `FL001` → `FLxxx` format works well for lists and React keys.

Just make sure:

* IDs don’t get duplicated
* they stay unique if data is merged from multiple sources

### TL;DR

* The data is **good and usable** 
* There’s a bit of technical debt worth fixing early
* Main focus areas: **baggage structure** and **optional field handling**

---

#  Known Issue

### External API Limitation

The endpoint below may fail when accessed from external environments due to **strict Cloudflare protection**:

```
https://www.bookcabin.com/interview/questions.json
```

### Fallback Solution

This fallback mechanism has already been implemented.
If the external API request fails, the application automatically uses a local data source to ensure the app remains stable and functional.

---

### Author : 
Muhammad Imam Rozali

---