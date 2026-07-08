import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";

function App() {
	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1 pb-12 sm:pb-16">
				<Menu />
			</main>
			<Footer />
		</div>
	);
}

export default App;
