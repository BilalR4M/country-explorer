# Country Explorer

A modern web application built with Next.js 14 that allows users to explore countries from around the world using the REST Countries API. The application provides detailed information about countries, with features like search, filtering by region, and user authentication.

## Features

- **Country Browsing**: View a responsive grid of country cards showing flags, names, populations and capitals
- **Detailed Country View**: Access comprehensive information about each country
- **Search Functionality**: Find countries by name with real-time filtering
- **Region Filtering**: Filter countries by geographic region
- **Authentication**: Sign in using GitHub or Google accounts
- **Responsive Design**: Optimized layout for all devices from mobile to desktop
- **Dark/Light Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with JIT engine
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google and GitHub providers
- **API**: [REST Countries API](https://restcountries.com/)
- **Testing**: Jest and React Testing Library

## Setup Instructions

### Prerequisites

- Node.js 18.17.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/country-explorer.git
cd country-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```
# Create a .env.local file with your authentication provider keys
```

4. Start the development server:
```bash
npm run dev
```

## Testing

The project includes comprehensive tests built with Jest and React Testing Library.

To run tests:

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

See the [Testing Guide](./TESTING_GUIDE.md) for detailed information about the testing setup and guidelines for writing tests.