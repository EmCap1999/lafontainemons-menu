export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative border-t border-border bg-gradient-to-br from-accent to-secondary px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-6 sm:pt-5 sm:pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
			<div className="absolute top-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-b bg-gradient-to-r from-primary to-primary-dark" />
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
				<span className="text-[15px] font-medium text-foreground">© {year} La Fontaine Mons</span>
				<div className="flex items-center gap-1.5 text-xs text-foreground/50">
					<span>v{__APP_VERSION__}</span>
					<span className="text-foreground/40">·</span>
					<span className="font-light">Powered by</span>
					<a
						href="https://www.linkedin.com/in/emmanu%C3%ABl-caputo-a46173235/"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-foreground/70 underline underline-offset-2 transition-colors hover:text-primary"
					>
						Manu Caputo
					</a>
				</div>
			</div>
		</footer>
	);
}
