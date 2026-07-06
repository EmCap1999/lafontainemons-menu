import { Component, computed, DestroyRef, Input, inject, signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import type { PublicItem, PublicSection } from "@lafontaine/backend/src/types";
import { catchError, of } from "rxjs";
import { MenuService } from "../../services/menu.service";
import { SectionComponent } from "../section/section.component";

@Component({
	selector: "app-menu",
	standalone: true,
	imports: [SectionComponent],
	templateUrl: "./menu.component.html",
	styleUrl: "./menu.component.scss",
})
export class MenuComponent {
	@Input() facebookUrl = "";
	@Input() tripadvisorUrl = "";
	@Input() googleUrl = "";

	private readonly menuService = inject(MenuService);
	private readonly destroyRef = inject(DestroyRef);

	private readonly sectionsResult = toSignal(
		this.menuService.getAllSections().pipe(
			catchError((err) => {
				console.error("Error loading sections:", err);
				return of([] as PublicSection[]);
			}),
		),
		{ initialValue: undefined },
	);

	readonly sections = computed(() => this.sectionsResult() ?? []);
	readonly sectionsLoading = computed(() => this.sectionsResult() === undefined);

	readonly sectionItems = signal<Record<number, PublicItem[]>>({});
	readonly expandedSections = signal<Set<number>>(new Set());
	readonly loadingSections = signal<Set<number>>(new Set());
	readonly searchTerm = signal("");

	private readonly expandedBeforeSearch = signal<Set<number>>(new Set());
	private readonly isSearching = signal(false);

	readonly filteredSections = computed(() => {
		const term = this.searchTerm().toLowerCase().trim();
		if (!term) return this.sections();
		return this.sections().filter((section) => {
			const items = this.sectionItems()[section.sectionId] ?? [];
			return items.some(
				(item) =>
					item.name.toLowerCase().includes(term) || item.origin?.toLowerCase().includes(term),
			);
		});
	});

	onSectionClick(sectionId: number): void {
		if (this.expandedSections().has(sectionId)) {
			this.expandedSections.update((s) => {
				const next = new Set(s);
				next.delete(sectionId);
				return next;
			});
		} else {
			this.expandedSections.update((s) => new Set([...s, sectionId]));
			if (!this.sectionItems()[sectionId]) {
				this.loadSectionItems(sectionId);
			}
		}
	}

	loadSectionItems(sectionId: number): void {
		this.loadingSections.update((s) => new Set([...s, sectionId]));

		this.menuService
			.getItemsBySection(sectionId)
			.pipe(
				catchError((err) => {
					console.error(`Error loading items for section ${sectionId}:`, err);
					return of([] as PublicItem[]);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((items) => {
				this.sectionItems.update((current) => ({ ...current, [sectionId]: items }));
				this.loadingSections.update((s) => {
					const next = new Set(s);
					next.delete(sectionId);
					return next;
				});
			});
	}

	isSectionExpanded(sectionId: number): boolean {
		return this.expandedSections().has(sectionId);
	}

	isSectionLoading(sectionId: number): boolean {
		return this.loadingSections().has(sectionId);
	}

	getSectionItems(sectionId: number): PublicItem[] {
		if (!this.searchTerm().trim()) {
			return this.sectionItems()[sectionId] ?? [];
		}
		return this.getFilteredItems(sectionId);
	}

	onSearchInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value;

		if (value.trim() && !this.isSearching()) {
			this.isSearching.set(true);
			this.expandedBeforeSearch.set(new Set(this.expandedSections()));
			this.loadAllSectionItems();
		}

		if (!value.trim() && this.isSearching()) {
			this.isSearching.set(false);
			this.expandedSections.set(new Set(this.expandedBeforeSearch()));
			this.expandedBeforeSearch.set(new Set());
		}

		this.searchTerm.set(value);

		if (value.trim()) {
			this.expandedSections.set(new Set(this.filteredSections().map((s) => s.sectionId)));
		}
	}

	private getFilteredItems(sectionId: number): PublicItem[] {
		const items = this.sectionItems()[sectionId] ?? [];
		const term = this.searchTerm().toLowerCase().trim();
		return items.filter(
			(item) => item.name.toLowerCase().includes(term) || item.origin?.toLowerCase().includes(term),
		);
	}

	private loadAllSectionItems(): void {
		for (const section of this.sections()) {
			if (!this.sectionItems()[section.sectionId]) {
				this.loadSectionItems(section.sectionId);
			}
		}
	}
}
