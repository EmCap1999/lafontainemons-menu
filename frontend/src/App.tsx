import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";

function App() {
	return (
		<div className="h-dvh flex flex-col overflow-hidden">
			<main className="flex-1 min-h-0 flex flex-col">
				<Menu />
			</main>
			<Footer />
		</div>
	);
}

export default App;
