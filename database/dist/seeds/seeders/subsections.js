import { subsectionCommand } from '@lafontaine/database/src/commands';
import { subsectionsRawData } from '@lafontaine/database/seeds/data';
export async function seedSubsections(db, sections) {
    const sectionNameToId = new Map();
    for (const section of sections) {
        sectionNameToId.set(section.name, section.sectionId);
    }
    const insertedSubsections = [];
    for (const rawData of subsectionsRawData) {
        const sectionId = sectionNameToId.get(rawData.sectionName);
        if (!sectionId) {
            throw new Error(`Section not found: ${rawData.sectionName}`);
        }
        const subsectionToInsert = {
            sectionId,
            name: rawData.name,
            displayOrder: rawData.displayOrder,
        };
        const [subsection] = await subsectionCommand.insert(db, subsectionToInsert);
        insertedSubsections.push(subsection);
    }
    return insertedSubsections;
}
//# sourceMappingURL=subsections.js.map