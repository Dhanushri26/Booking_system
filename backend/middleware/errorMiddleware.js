export function errorHandler(err, req, res, next) {

  console.error("API ERROR:", {
    code: err.code,
    message: err.message,
    stack: err.stack
  })

  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: err.message || "Something went wrong",
      details: err.details || null
    }
  })

}