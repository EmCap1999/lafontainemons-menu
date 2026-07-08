export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative border-t border-border bg-gradient-to-br from-accent to-secondary px-4 sm:px-6 lg:px-8 py-5">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-b bg-gradient-to-r from-primary to-primary-dark" />
			<div className="max-w-[1800px] mx-auto flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
				<div className="flex items-center gap-2 text-sm text-foreground/60">
					<span className="font-light">Powered by</span>
					<a
						href="https://www.linkedin.com/in/emmanu%C3%ABl-caputo-a46173235/"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-foreground/80 hover:text-primary transition-colors underline underline-offset-2"
					>
						Manu Caputo
					</a>
				</div>
				<div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
					<span>© {year} La Fontaine Mons</span>
					<span className="text-border">·</span>
					<span className="text-sm font-medium text-foreground/50">v{__APP_VERSION__}</span>
				</div>
			</div>
		</footer>
	);
}
