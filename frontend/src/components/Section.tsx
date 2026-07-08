import type { PublicItem, PublicSection } from "@lafontaine/backend";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type Props = {
	section: PublicSection;
	items: PublicItem[];
	searchTerm?: string;
};

function reorderBeers(beers: PublicItem[]): PublicItem[] {
	const saintLazare = beers.filter((b) => b.name.includes("Saint-Lazare"));
	const supplement = beers.filter((b) => b.name === "Supplément de sirop");
	const others = beers.filter(
		(b) => !b.name.includes("Saint-Lazare") && b.name !== "Supplément de sirop",
	);
	return [...saintLazare, ...others, ...supplement];
}

export function Section({ section, items, searchTerm }: Props) {
	const ordered = section.name === "Bières" ? reorderBeers(items) : items;
	const displayItems = searchTerm
		? ordered.filter(
				(item) =>
					item.name.toLowerCase().includes(searchTerm) ||
					item.origin?.toLowerCase().includes(searchTerm),
			)
		: ordered;

	return (
		<AccordionItem
			value={String(section.sectionId)}
			className="rounded-lg shadow-sm overflow-hidden border border-border border-b-0"
		>
			<AccordionTrigger
				className="w-full px-5 py-4 border-0 border-l-4 border-l-primary/25 rounded-none
					text-foreground bg-accent hover:bg-secondary hover:border-l-primary/60
					transition-all duration-150 hover:no-underline"
			>
				<span className="text-base font-semibold tracking-wide">{section.name}</span>
			</AccordionTrigger>
			<AccordionContent className="pb-0">
				{displayItems.length === 0 ? (
					<p className="px-5 py-4 text-sm text-muted-foreground text-center">
						Aucun item disponible dans cette section.
					</p>
				) : (
					<div className="grid md:grid-cols-2 min-[1400px]:grid-cols-3 bg-card">
						{displayItems.map((item) => (
							<div
								key={item.itemId}
								className="flex items-baseline justify-between gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-foreground/[0.02] transition-colors"
							>
								<div className="flex-1 min-w-0">
									<p className="font-semibold text-foreground leading-snug">{item.name}</p>
									<div className="flex flex-wrap items-center gap-1 mt-0.5">
										{item.origin && (
											<Badge className="bg-accent text-primary-dark border-0 text-[11px] font-semibold">
												{item.origin}
											</Badge>
										)}
										{item.capacity != null && item.unit && (
											<span className="text-sm text-muted-foreground">
												{new Intl.NumberFormat("fr").format(item.capacity)} {item.unit}
											</span>
										)}
										{!item.isAvailable && (
											<span className="text-sm text-destructive font-medium">Non disponible</span>
										)}
									</div>
								</div>
								<span className="font-bold whitespace-nowrap text-primary">
									{item.price.toFixed(2)} €
								</span>
							</div>
						))}
					</div>
				)}
			</AccordionContent>
		</AccordionItem>
	);
}
