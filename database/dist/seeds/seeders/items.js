import { itemCommand } from '@lafontaine/database/src/commands';
import { itemsRawData } from '@lafontaine/database/seeds/data';
export async function seedItems(db, sections, subsections) {
    const sectionNameToId = new Map();
    for (const section of sections) {
        sectionNameToId.set(section.name, section.sectionId);
    }
    const subsectionNameToId = new Map();
    for (const subsection of subsections) {
        subsectionNameToId.set(subsection.name, subsection.subsectionId);
    }
    for (const rawData of itemsRawData) {
        const sectionId = sectionNameToId.get(rawData.sectionName);
        if (!sectionId) {
            throw new Error(`Section not found: ${rawData.sectionName}`);
        }
        const subsectionId = rawData.subsectionName
            ? subsectionNameToId.get(rawData.subsectionName)
            : undefined;
        if (rawData.subsectionName && !subsectionId) {
            throw new Error(`Subsection not found: ${rawData.subsectionName}`);
        }
        const { sectionName, subsectionName, ...itemFields } = rawData;
        const itemToInsert = {
            sectionId,
            subsectionId,
            ...itemFields,
        };
        await itemCommand.insert(db, itemToInsert);
    }
}
//# sourceMappingURL=items.js.map