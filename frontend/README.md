# Todo App Frontend

A modern, responsive todo application frontend built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ **Modern UI/UX** - Clean, responsive design with smooth animations
- ✅ **Real-time Updates** - Instant feedback for all CRUD operations
- ✅ **Priority Management** - Low, Medium, High priority levels with color coding
- ✅ **Filtering & Sorting** - Filter by status and sort by date, priority, or title
- ✅ **Error Handling** - Comprehensive error boundaries and user feedback
- ✅ **Loading States** - Skeleton loaders and loading indicators
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks with custom hooks
- **API Integration**: Fetch API with error handling
- **Icons**: Heroicons (SVG)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see server README)

## Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main page component
│   ├── components/
│   │   ├── AddTodoForm.tsx      # Form for adding new todos
│   │   ├── TodoItem.tsx         # Individual todo item
│   │   ├── TodoList.tsx         # List of todos with filters
│   │   └── ErrorBoundary.tsx    # Error handling component
│   ├── hooks/
│   │   └── useTodos.ts          # Custom hook for todo operations
│   ├── lib/
│   │   └── api.ts               # API service functions
│   └── types/
│       └── todo.ts              # TypeScript interfaces
├── public/                      # Static assets
└── package.json
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api` by default. You can customize this by setting the `NEXT_PUBLIC_API_URL` environment variable.

### API Endpoints Used

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle completion status

## Features in Detail

### Todo Management
- **Create**: Add new todos with title, description, and priority
- **Read**: View all todos with filtering and sorting options
- **Update**: Edit todo details inline or toggle completion
- **Delete**: Remove todos with confirmation

### Filtering & Sorting
- **Filter by**: All, Active, Completed
- **Sort by**: Date Created, Priority, Title
- **Real-time**: Filters and sorts update instantly

### Priority System
- **Low Priority**: Green badge
- **Medium Priority**: Yellow badge (default)
- **High Priority**: Red badge

### User Experience
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Proper focus management and keyboard navigation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **AWS Amplify**

### Build for Production

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
