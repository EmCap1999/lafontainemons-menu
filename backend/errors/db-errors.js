class DBError extends Error {
  constructor(message, statusCode, originalError = null) {
    super(message)
    this.statusCode = statusCode || 500
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.originalError = originalError

    Error.captureStackTrace(this, this.constructor)
  }
}

const getDBErrorMessage = (code, message) => {
  switch (code) {
    case '08000':
    case '08003':
    case '08006':
    case '08001':
    case '08004':
      return `Database connection error: ${message}`

    case '23000':
    case '23001':
      return `Data integrity error: ${message}`
    case '23502':
      return `Required field missing: ${message}`
    case '23503':
      return `Reference error: ${message}`
    case '23505':
      return `Duplicate entry: ${message}`
    case '23514':
      return `Value validation failed: ${message}`

    case '22000':
    case '22001':
      return `Invalid data format: ${message}`
    case '22003':
      return `Numeric value out of range: ${message}`
    case '22007':
    case '22008':
      return `Invalid date or time format: ${message}`

    case '42601':
      return `SQL syntax error: ${message}`
    case '42702':
      return `Ambiguous column reference: ${message}`
    case '42703':
      return `Column does not exist: ${message}`
    case '42704':
      return `Object does not exist: ${message}`
    case '42P01':
      return `Table does not exist: ${message}`

    case '42501':
      return `Insufficient database privileges: ${message}`

    case '53100':
    case '53200':
    case '53300':
      return `Database resource error: ${message}`

    case '57014':
      return `Query execution canceled: ${message}`

    case 'DRIZZLE_MISSING_TABLE':
      return `Table not found: ${message}`
    case 'DRIZZLE_INVALID_QUERY':
      return `Invalid query: ${message}`

    default:
      return `Database error: ${message}`
  }
}

const handleDBError = (err) => {
  let statusCode = 500
  let errorMessage = err.message || 'An unexpected database error occurred'
  let pgErrorCode = null

  if (err.code) {
    pgErrorCode = err.code
  } else if (err.originalError?.code) {
    pgErrorCode = err.originalError.code
  }

  if (pgErrorCode) {
    if (
      ['23000', '23001', '23502', '23503', '23505', '23514'].includes(
        pgErrorCode
      )
    ) {
      statusCode = 400
    } else if (
      ['42601', '42702', '42703', '42704', '42P01'].includes(pgErrorCode)
    ) {
      statusCode = 500
    } else if (pgErrorCode === '42501') {
      statusCode = 403
    } else if (
      ['08000', '08003', '08006', '08001', '08004'].includes(pgErrorCode)
    ) {
      statusCode = 503
    } else if (['53100', '53200', '53300'].includes(pgErrorCode)) {
      statusCode = 503
    } else if (pgErrorCode === '57014') {
      statusCode = 408
    }

    errorMessage = getDBErrorMessage(pgErrorCode, err.message)
  } else if (err instanceof DBError) {
    statusCode = err.statusCode
    errorMessage = err.message
  }

  return new DBError(errorMessage, statusCode, err)
}

export { DBError, handleDBError }
