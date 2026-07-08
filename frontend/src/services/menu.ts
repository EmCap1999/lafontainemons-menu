import type { PublicItem, PublicSection } from "@lafontaine/backend";
import { API_URL } from "@/lib/constants";

export async function getSections(): Promise<PublicSection[]> {
	const res = await fetch(`${API_URL}/sections`);
	if (!res.ok) throw new Error("Failed to fetch sections");
	const json = await res.json();
	return (json.data?.sections ?? []) as PublicSection[];
}

export async function getItemsBySection(sectionId: number): Promise<PublicItem[]> {
	const res = await fetch(`${API_URL}/sections/${sectionId}/items`);
	if (!res.ok) throw new Error("Failed to fetch items");
	const json = await res.json();
	return (json.data?.items ?? []) as PublicItem[];
}
