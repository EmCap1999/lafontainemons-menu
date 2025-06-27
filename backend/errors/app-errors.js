class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}

const getErrorMessage = (statusCode, message) => {
  switch (statusCode) {
    case 400:
      return `Requête incorrecte: ${message}`
    case 401:
      return 'Non autorisé: Veuillez vous authentifier'
    case 403:
      return `Accès interdit: Vous n'avez pas les droits nécessaires`
    case 404:
      return `Ressource non trouvée: ${message || "La ressource demandée n'existe pas"}`
    case 409:
      return `Conflit: ${message}`
    case 422:
      return `Données invalides: ${message}`
    case 429:
      return 'Trop de requêtes: Veuillez réessayer plus tard'

    case 500:
      return `Erreur serveur interne: ${message || "Une erreur inattendue s'est produite"}`
    case 502:
      return 'Erreur de passerelle: Le service externe a retourné une erreur'
    case 503:
      return 'Service indisponible: Le serveur est temporairement indisponible'
    case 504:
      return `Délai d'attente dépassé: L'opération a pris trop de temps`

    default:
      return message || "Une erreur s'est produite"
  }
}

const handleErrors = (err, req, res, next) => {
  const statusCode = err.statusCode
  const descriptiveMessage = getErrorMessage(statusCode, err.message)

  const errorResponse = {
    status: err.status,
    statusCode: statusCode,
    message: descriptiveMessage,

    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  }

  console.error(`Erreur ${statusCode}: ${descriptiveMessage}`)
  res.status(statusCode).json(errorResponse)
}

export { AppError, handleErrors }
