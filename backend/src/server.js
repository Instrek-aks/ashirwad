import app from './app.js';
import { connectDB } from './config/database.js';
import { env } from './config/env.js';
import { ensureDefaultAdmin } from './services/auth.service.js';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Ensure default admin user is initialized
    await ensureDefaultAdmin();

    const server = app.listen(env.PORT, () => {
      console.log('==================================================');
      console.log(`🚀 Ashirwad CRM & Email Server is running`);
      console.log(`📡 Port: ${env.PORT}`);
      console.log(`🌐 Environment: ${env.NODE_ENV}`);
      console.log(`🛡️  Admin API Base: http://localhost:${env.PORT}/api/v1`);
      console.log('==================================================');
    });

    // Handle graceful shutdowns
    const shutdown = () => {
      console.log('[Server] Gracefully shutting down...');
      server.close(() => {
        console.log('[Server] Closed all active connections.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('[Server Error] Startup failed:', error);
    process.exit(1);
  }
};

startServer();
