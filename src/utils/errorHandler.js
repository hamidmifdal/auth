const errorHandler = (err, req, res, next) => {
  // 1. First check if response object exists and is valid
  if (!res || typeof res.status !== 'function') {
      console.error('Invalid response object in error handler:', err);
      return next(err);
  }

  // 2. Check if headers have already been sent
  if (res.headersSent) {
      console.error('Headers already sent when error occurred:', err);
      return next(err);
  }

  // 3. Determine status code safely
  const statusCode = typeof err.statusCode === 'number' && 
                    err.statusCode >= 400 && 
                    err.statusCode < 600 ? err.statusCode : 500;

  // 4. Environment detection
  const isDev = process.env.NODE_ENV === 'development';

  // 5. Prepare error response
  const errorResponse = {
      error: err.name || 'Internal Server Error',
      message: isDev ? err.message : 'Something went wrong!'
  };

  // 6. Only include stack trace in development
  if (isDev && err.stack) {
      errorResponse.stack = err.stack;
  }

  // 7. Additional security headers
  try {
      res.set({
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
      });

      // 8. Send response
      res.status(statusCode).json(errorResponse);
  } catch (responseError) {
      console.error('Failed to send error response:', responseError);
      // Last resort if even the error response fails
      res.status(500).end();
  }
};

export default errorHandler;