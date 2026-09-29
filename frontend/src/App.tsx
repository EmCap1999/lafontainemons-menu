import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";

function App() {
	return (
		<div className="flex h-svh flex-col overflow-hidden">
			<main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
				<Menu />
			</main>
			<Footer />
		</div>
	);
}

export default App;
