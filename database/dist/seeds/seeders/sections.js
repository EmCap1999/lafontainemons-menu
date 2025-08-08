import { sectionCommand } from '@lafontaine/database/src/commands';
import { sectionsData } from '@lafontaine/database/seeds/data';
export async function seedSections(db) {
    const insertedSections = [];
    for (const sectionData of sectionsData) {
        const [section] = await sectionCommand.insert(db, sectionData);
        insertedSections.push(section);
    }
    return insertedSections;
}
//# sourceMappingURL=sections.js.map