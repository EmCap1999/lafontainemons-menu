import type { DrizzleDatabase } from '@lafontaine/database/db';
import * as schema from '@lafontaine/database/src/schema';
export * as sectionCommand from './section';
export declare function selectAll(db: DrizzleDatabase): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}[]>;
export declare function selectById(db: DrizzleDatabase, sectionId: number): Promise<schema.SectionSelect | undefined>;
export declare function selectByName(db: DrizzleDatabase, name: string): Promise<schema.SectionSelect | undefined>;
export declare function selectWithSubsections(db: DrizzleDatabase): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsections: {
        sectionId: number;
        name: string;
        displayOrder: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        subsectionId: number;
    }[];
}[]>;
export declare function selectWithItems(db: DrizzleDatabase): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    items: {
        sectionId: number;
        name: string;
        displayOrder: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        subsectionId: number | null;
        itemId: number;
        price: string;
        capacity: number | null;
        unit: string | null;
        origin: string | null;
        isAvailable: boolean;
    }[];
}[]>;
export declare function insert(db: DrizzleDatabase, section: schema.SectionInsert): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}[]>;
export declare function update(db: DrizzleDatabase, sectionId: number, section: Partial<Omit<schema.SectionInsert, 'sectionId'>>): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}[]>;
export declare function remove(db: DrizzleDatabase, sectionId: number): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}[]>;
export declare function count(db: DrizzleDatabase): Promise<number>;
//# sourceMappingURL=section.d.ts.map