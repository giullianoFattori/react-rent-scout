# React Rent Scout

Base React architecture following market best practices inspired by the [GeeksForGeeks guide](https://www.geeksforgeeks.org/reactjs/react-architecture-pattern-and-best-practices/).

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` – start development server
- `npm run build` – build production bundle
- `npm run preview` – preview production build
- `npm run test` – run unit tests
- `npm run test:watch` – run unit tests in watch mode
- `npm run lint` – run ESLint

## Project Structure

```
src/
├── app/            # global providers
├── components/     # reusable components
├── config/         # configuration objects
├── features/       # feature-specific modules
├── hooks/          # reusable hooks
├── layouts/        # layout components
├── pages/          # route-level pages
├── routes/         # routing configuration
├── services/       # API clients and integrations
├── store/          # state management setup
├── support/        # style helpers, assets, etc.
├── test/           # testing utilities and setup
├── types/          # shared TypeScript types
└── utils/          # shared utilities
```

## Testing

The project uses [Vitest](https://vitest.dev/) with Testing Library for unit tests.
```
npm run test
```
