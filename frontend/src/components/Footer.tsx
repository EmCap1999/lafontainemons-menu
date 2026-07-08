export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			<div>
				<span>Powered by </span>
				<a
					href="https://www.linkedin.com/in/emmanu%C3%ABl-caputo-a46173235/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Manu Caputo
				</a>
			</div>
			<div>© {year} La Fontaine Mons</div>
		</footer>
	);
}
