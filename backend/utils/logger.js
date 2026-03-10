export function logInfo(message, data = null) {

  console.log("[INFO]", message, data)

}

export function logError(message, error) {

  console.error("[ERROR]", message, error)

}