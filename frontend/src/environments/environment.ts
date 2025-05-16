export const environment = {
  production: import.meta.env.NODE_ENV,
  frontendUrl: import.meta.env.FRONTEND_URL,
  apiUrl: `http://localhost:${import.meta.env.BACKEND_PORT}/`,
}
