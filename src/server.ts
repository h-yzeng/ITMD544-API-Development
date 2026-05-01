import 'dotenv/config';
import { createApp } from './app';

const PORT = process.env.PORT ?? 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Docs:  http://localhost:${PORT}/api-docs`);
  console.log(`Health:    http://localhost:${PORT}/health`);
});
