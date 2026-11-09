import logo from "@/assets/logo.svg";

const AUTHOR_URL = "https://www.linkedin.com/in/emmanu%C3%ABl-caputo-a46173235/";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto px-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-1.5 text-center text-xs text-muted-foreground">
				<p className="flex items-center gap-1.5">
					<img src={logo} alt="" aria-hidden="true" className="h-7 w-auto opacity-70 dark:invert" />
					© {year} La Fontaine Mons
				</p>
				<p>
					v{__APP_VERSION__} · Conçu par{" "}
					<a
						href={AUTHOR_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground"
					>
						Manu Caputo
					</a>
				</p>
			</div>
		</footer>
	);
}
