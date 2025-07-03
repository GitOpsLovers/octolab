import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware de ejemplo
app.use(express.json());

// Ruta base
app.get('/api', (_req, res) => {
  res.json({ message: 'Hello from OctoLab backend! 🚀' });
});

// Ruta healthcheck opcional
app.get('/health', (_req, res) => {
  res.send('OK');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
