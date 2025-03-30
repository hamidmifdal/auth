const NODE_ENV = process.env.NODE_ENV || 'production'; // Default to 'production' if missing

const notFoundHandler = (req, res, next) => {
  // Security Hardening:
  const sanitizedUrl = req.originalUrl.replace(/[^\w\s\/-]/gi, ''); // Basic sanitization
  const timestamp = new Date().toISOString();
  
  // Log the 404 attempt (useful for security monitoring)
  if (NODE_ENV === 'development') {
    console.warn(`[404] Attempted access to non-existent route: ${sanitizedUrl}`, {
      ip: req.ip,
      timestamp,
      headers: {
        'user-agent': req.get('user-agent'),
        referer: req.get('referer')
      }
    });
  }

  // Security Headers
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'",
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  });

  // Response
  res.status(404).json({
    error: "Not Found",
    message: NODE_ENV === "development" 
      ? `Route ${sanitizedUrl} not found` 
      : "The requested resource could not be found.",
    meta: NODE_ENV === "development" ? "notfoundpage" : {
      // Never expose sensitive info - even in development
      env: NODE_ENV,
      timestamp,
      path: sanitizedUrl,
      status: 404
    }
  });
};

export default notFoundHandler;