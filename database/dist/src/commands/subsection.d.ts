import type { DrizzleDatabase } from '@lafontaine/database/db';
import * as schema from '@lafontaine/database/src/schema';
export * as subsectionCommand from './subsection';
export declare function selectAll(db: DrizzleDatabase): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
}[]>;
export declare function selectById(db: DrizzleDatabase, subsectionId: number): Promise<schema.SubsectionSelect | undefined>;
export declare function selectBySection(db: DrizzleDatabase, sectionId: number): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
}[]>;
export declare function selectWithSection(db: DrizzleDatabase, subsectionId: number): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
    section: {
        sectionId: number;
        name: string;
        displayOrder: number;
        createdAt: Date | null;
        updatedAt: Date | null;
    };
} | undefined>;
export declare function selectWithItems(db: DrizzleDatabase): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
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
export declare function selectBySectionWithItems(db: DrizzleDatabase, sectionId: number): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
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
export declare function insert(db: DrizzleDatabase, subsection: schema.SubsectionInsert): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
}[]>;
export declare function update(db: DrizzleDatabase, subsectionId: number, subsection: Partial<Omit<schema.SubsectionInsert, 'subsectionId'>>): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
}[]>;
export declare function remove(db: DrizzleDatabase, subsectionId: number): Promise<{
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
}[]>;
export declare function countBySection(db: DrizzleDatabase, sectionId: number): Promise<number>;
//# sourceMappingURL=subsection.d.ts.map