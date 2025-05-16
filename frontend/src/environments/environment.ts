export const environment = {
  production: import.meta.env.NODE_ENV === 'production',
  frontendUrl: import.meta.env.FRONTEND_URL || 'http://localhost:4200',
  apiUrl: `http://localhost:${import.meta.env.BACKEND_PORT || '8080'}/api`,
}
