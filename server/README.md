# Todo App Backend Server

A RESTful API backend for a todo application built with Node.js, Express, and MongoDB.

## Features

- ✅ CRUD operations for todos
- ✅ MongoDB integration with Mongoose
- ✅ Input validation and error handling
- ✅ CORS support for frontend integration
- ✅ Priority levels (low, medium, high)
- ✅ Completion status tracking
- ✅ Timestamps for created/updated dates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository and navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

4. Configure your MongoDB connection in the `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/todo-app
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Base URL: `http://localhost:5000`

### Health Check
- **GET** `/health` - Check if the API is running

### Todos

#### Get All Todos
- **GET** `/api/todos`
- Returns all todos sorted by creation date (newest first)

#### Get Single Todo
- **GET** `/api/todos/:id`
- Returns a specific todo by ID

#### Create Todo
- **POST** `/api/todos`
- **Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the todo app backend",
  "priority": "high"
}
```

#### Update Todo
- **PUT** `/api/todos/:id`
- **Body:** (all fields optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "priority": "medium"
}
```

#### Delete Todo
- **DELETE** `/api/todos/:id`
- Deletes a todo by ID

#### Toggle Todo Completion
- **PATCH** `/api/todos/:id/toggle`
- Toggles the completion status of a todo

## Todo Schema

```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String (enum: 'low', 'medium', 'high', default: 'medium'),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Testing the API

You can test the API using tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [curl](https://curl.se/)

### Example curl commands:

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a new todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test todo", "description": "This is a test", "priority": "high"}'

# Update a todo
curl -X PUT http://localhost:5000/api/todos/[todo-id] \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/[todo-id]
```

## Development

### Project Structure
```
server/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   └── app.js
├── server.js
├── package.json
└── README.md
```

### Adding New Features

1. Create new models in `src/models/`
2. Add routes in `src/routes/`
3. Update `src/app.js` to include new routes
4. Add any necessary middleware

## License

ISC 