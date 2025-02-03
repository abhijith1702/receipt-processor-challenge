import app from './app.js';
import Logger from './utils/Logger.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
  Logger.info(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  Logger.info(`Env ${process.env.NODE_ENV}`);
});