import 'module-alias/register';
import Server from './app';

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('🚨 Uncaught Exception! Shutting down...', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Create and start server
const server = new Server();
server.start().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});