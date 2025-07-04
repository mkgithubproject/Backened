### create server
```
const http = require('http');
const url = require('url');

// Sample data (in-memory)
let todos = [
  { id: 1, task: 'Learn Node.js routing', done: false },
  { id: 2, task: 'Use switch-case for routing', done: true },
];

// Helper function to send JSON response
const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data)); // node native function end
};

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const method = req.method;

  const routeKey = `${method} ${pathname}`;

  switch (routeKey) {
    case 'GET /api/todos': {
      sendJson(res, 200, { success: true, data: todos });
      break;
    }

    case 'GET /api/todo': {
      const todo = todos.find(t => t.id === Number(query.id));
      if (todo) {
        sendJson(res, 200, { success: true, data: todo });
      } else {
        sendJson(res, 404, { success: false, message: 'Todo not found' });
      }
      break;
    }

    case 'POST /api/todo': {
      let body = '';
      req.on('data', chunk => (body += chunk));
      req.on('end', () => {
        try {
          const newTodo = JSON.parse(body);
          newTodo.id = todos.length + 1;
          todos.push(newTodo);
          sendJson(res, 201, { success: true, data: newTodo });
        } catch (err) {
          sendJson(res, 400, { success: false, message: 'Invalid JSON' });
        }
      });
      break;
    }

    default: {
      sendJson(res, 404, { success: false, message: 'Route not found' });
    }
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

```
### using express 
```
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory mock data
let todos = [
  { id: 1, task: 'Learn Express', done: false },
  { id: 2, task: 'Build API with Express', done: true },
];

// Routes

// GET /api/todos - get all todos
app.get('/api/todos', (req, res) => {
  res.status(200).json({ success: true, data: todos });
});

// GET /api/todo/:id - get single todo by ID
app.get('/api/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (todo) {
    res.status(200).json({ success: true, data: todo });
  } else {
    res.status(404).json({ success: false, message: 'Todo not found' });
  }
});

// POST /api/todo - create new todo
app.post('/api/todo', (req, res) => {
  const { task, done } = req.body;

  if (!task) {
    return res.status(400).json({ success: false, message: 'Task is required' });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    done: done || false,
  };

  todos.push(newTodo);
  res.status(201).json({ success: true, data: newTodo });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
```

