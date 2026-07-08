import type { PublicItem, PublicSection } from "@lafontaine/backend";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import { SOCIAL_LINKS } from "@/lib/constants";
import { getItemsBySection, getSections } from "@/services/menu";
import { Section } from "./Section";

export function Menu() {
	const [sections, setSections] = useState<PublicSection[]>([]);
	const [items, setItems] = useState<Record<number, PublicItem[]>>({});
	const [loading, setLoading] = useState(true);
	const [expanded, setExpanded] = useState<Set<number>>(new Set());
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

	const toggleSection = (sectionId: number) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(sectionId)) {
				next.delete(sectionId);
			} else {
				next.add(sectionId);
			}
			return next;
		});
	};

	const term = search.toLowerCase().trim();

	const filteredSections = term
		? sections.filter((section) =>
				(items[section.sectionId] ?? []).some(
					(item) =>
						item.name.toLowerCase().includes(term) || item.origin?.toLowerCase().includes(term),
				),
			)
		: sections;

	const isExpanded = (sectionId: number) => !!term || expanded.has(sectionId);

	return (
		<div>
			<div>
				<img src={logo} alt="Logo La Fontaine Mons" />
				<h1>Carte - Boissons & Desserts</h1>
				<div>
					<p>N'hésite pas à laisser un avis sur Google</p>
					<a href={SOCIAL_LINKS.tripadvisor} target="_blank" rel="noopener noreferrer">
						TripAdvisor
					</a>
					<a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
						Facebook
					</a>
				</div>
			</div>

			<div>
				{loading ? (
					<p>Chargement du menu...</p>
				) : (
					<>
						<input
							type="text"
							placeholder="Rechercher une boisson..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>

						{filteredSections.map((section) => (
							<Section
								key={section.sectionId}
								section={section}
								items={items[section.sectionId] ?? []}
								isExpanded={isExpanded(section.sectionId)}
								onToggle={toggleSection}
							/>
						))}

						{term && filteredSections.length === 0 && <p>Aucun résultat pour "{search}"</p>}

						{sections.length === 0 && <p>Aucune section disponible pour le moment.</p>}
					</>
				)}
			</div>
		</div>
	);
}
