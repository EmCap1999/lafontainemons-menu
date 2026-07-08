export const env = {
	apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
	facebookUrl: import.meta.env.VITE_FACEBOOK_URL ?? "",
	tripadvisorUrl: import.meta.env.VITE_TRIPADVISOR_URL ?? "",
	googleUrl: import.meta.env.VITE_GOOGLE_URL ?? "",
} as const;
