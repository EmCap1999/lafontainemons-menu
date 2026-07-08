import type { PublicItem, PublicSection } from "@lafontaine/backend";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFacebook, FaTripadvisor } from "react-icons/fa";
import background from "@/assets/background.jpg";
import logo from "@/assets/logo.svg";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SOCIAL_LINKS } from "@/lib/constants";
import { getItemsBySection, getSections } from "@/services/menu";
import { Section } from "./Section";

export function Menu() {
	const [sections, setSections] = useState<PublicSection[]>([]);
	const [items, setItems] = useState<Record<number, PublicItem[]>>({});
	const [loading, setLoading] = useState(true);
	const [openSections, setOpenSections] = useState<string[]>([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		getSections()
			.then(async (data) => {
				setSections(data);
				const results = await Promise.allSettled(
					data.map((s) =>
						getItemsBySection(s.sectionId).then((items) => [s.sectionId, items] as const),
					),
				);
				const loaded: Record<number, PublicItem[]> = {};
				for (const result of results) {
					if (result.status === "fulfilled") {
						const [id, items] = result.value;
						loaded[id] = items;
					} else {
						console.error("Failed to load section items:", result.reason);
					}
				}
				setItems(loaded);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	const term = search.toLowerCase().trim();

	const filteredSections = term
		? sections.filter((section) =>
				(items[section.sectionId] ?? []).some(
					(item) =>
						item.name.toLowerCase().includes(term) || item.origin?.toLowerCase().includes(term),
				),
			)
		: sections;

	const accordionValue = term ? filteredSections.map((s) => String(s.sectionId)) : openSections;

	return (
		<div className="flex-1 min-h-0 flex flex-col">
			{/* Hero - sticky top */}
			<div
				className="shrink-0 relative flex items-center justify-center py-7 md:py-10"
				style={{
					backgroundImage: `url(${background})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 bg-black/70" />
				<div className="relative z-10 flex flex-col items-center px-6 text-center">
					<img
						src={logo}
						alt="Logo La Fontaine Mons"
						className="mb-3 brightness-0 invert drop-shadow-lg"
						style={{
							maxHeight: "clamp(6.5rem, 12vw, 9rem)",
							maxWidth: "clamp(15rem, 26vw, 21rem)",
						}}
					/>
					<h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
						Carte — Boissons & Desserts
					</h1>
					<div className="flex gap-3 mt-2">
						<a
							href={SOCIAL_LINKS.tripadvisor}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 hover:bg-white/20 hover:border-white/35 hover:text-white transition-all duration-200"
							aria-label="TripAdvisor"
						>
							<FaTripadvisor size={18} />
							<span className="text-sm font-medium tracking-wide">TripAdvisor</span>
						</a>
						<a
							href={SOCIAL_LINKS.facebook}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 hover:bg-white/20 hover:border-white/35 hover:text-white transition-all duration-200"
							aria-label="Facebook"
						>
							<FaFacebook size={17} />
							<span className="text-sm font-medium tracking-wide">Facebook</span>
						</a>
					</div>
				</div>
			</div>

			{/* Scrollable content */}
			<div className="flex-1 min-h-0 overflow-y-auto">
				<div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
					{/* Search */}
					<div className="py-6 max-w-lg mx-auto">
						<div className="relative">
							<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
							<Input
								type="text"
								placeholder="Rechercher une boisson..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="search-input rounded-full h-auto py-2.5 pl-9 pr-10 bg-card shadow-sm"
							/>
							{search && (
								<Button
									variant="ghost"
									size="icon-sm"
									onClick={() => setSearch("")}
									className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5"
								>
									<X />
								</Button>
							)}
						</div>
					</div>

					{/* Sections */}
					{loading ? (
						<p className="text-center text-muted-foreground py-12">Chargement du menu...</p>
					) : (
						<Accordion
							multiple
							value={accordionValue}
							onValueChange={(value) => {
								if (!term) setOpenSections(value as string[]);
							}}
							className="grid gap-4 pb-12 lg:grid-cols-2 lg:items-start"
						>
							{filteredSections.map((section) => (
								<Section
									key={section.sectionId}
									section={section}
									items={items[section.sectionId] ?? []}
									searchTerm={term || undefined}
								/>
							))}

							{term && filteredSections.length === 0 && (
								<p className="text-center text-muted-foreground py-12">
									Aucun résultat pour « {search} »
								</p>
							)}

							{sections.length === 0 && (
								<p className="text-center text-muted-foreground py-12">
									Aucune section disponible pour le moment.
								</p>
							)}
						</Accordion>
					)}
				</div>
			</div>
		</div>
	);
}
