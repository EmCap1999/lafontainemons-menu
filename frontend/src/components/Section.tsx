import type { PublicItem, PublicSection } from "@lafontaine/backend";

type Props = {
	section: PublicSection;
	items: PublicItem[];
	isExpanded: boolean;
	onToggle: (sectionId: number) => void;
};

function reorderBeers(beers: PublicItem[]): PublicItem[] {
	const saintLazare = beers.filter((b) => b.name.includes("Saint-Lazare"));
	const supplement = beers.filter((b) => b.name === "Supplément de sirop");
	const others = beers.filter(
		(b) => !b.name.includes("Saint-Lazare") && b.name !== "Supplément de sirop",
	);
	return [...saintLazare, ...others, ...supplement];
}

export function Section({ section, items, isExpanded, onToggle }: Props) {
	const displayItems = section.name === "Bières" ? reorderBeers(items) : items;

	return (
		<div>
			<button type="button" onClick={() => onToggle(section.sectionId)}>
				<h2>{section.name}</h2>
				<span>{isExpanded ? "−" : "+"}</span>
			</button>

			{isExpanded && (
				<div>
					{displayItems.map((item) => (
						<div key={item.itemId}>
							<div>
								<h3>{item.name}</h3>
								<div>
									{item.origin && <span>{item.origin}</span>}
									{item.capacity != null && item.unit && (
										<span>
											{new Intl.NumberFormat("fr").format(item.capacity)} {item.unit}
										</span>
									)}
									{!item.isAvailable && <span>Non disponible</span>}
								</div>
							</div>
							<span>{item.price.toFixed(2)} €</span>
						</div>
					))}

					{displayItems.length === 0 && <p>Aucun item disponible dans cette section.</p>}
				</div>
			)}
		</div>
	);
}
