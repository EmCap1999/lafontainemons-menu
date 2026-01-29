import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { PublicItem, PublicSection } from "@lafontaine/backend/src/types";

@Component({
	selector: "app-section",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./section.component.html",
	styleUrl: "./section.component.scss",
})
export class SectionComponent {
	@Input() section!: PublicSection;
	@Input() set items(value: PublicItem[]) {
		this._items = this.section?.name === "Bières" ? this.reorderBeers(value) : value;
	}
	get items(): PublicItem[] {
		return this._items;
	}
	private _items: PublicItem[] = [];

	@Input() isExpanded = false;
	@Input() isLoading = false;

	@Output() sectionClick = new EventEmitter<number>();

	onSectionClick(): void {
		this.sectionClick.emit(this.section.sectionId);
	}

	private reorderBeers(beers: PublicItem[]): PublicItem[] {
		const saintLazare = beers.filter((b) => b.name.includes("Saint-Lazare"));
		const supplement = beers.filter((b) => b.name === "Supplément de sirop");
		const others = beers.filter(
			(b) => !b.name.includes("Saint-Lazare") && b.name !== "Supplément de sirop",
		);

		return [...saintLazare, ...others, ...supplement];
	}
}
