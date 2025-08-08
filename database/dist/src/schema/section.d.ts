import * as drizzle from 'drizzle-orm/pg-core';
export declare const section: drizzle.PgTableWithColumns<{
    name: "section";
    schema: undefined;
    columns: {
        sectionId: drizzle.PgColumn<{
            name: "section_id";
            tableName: "section";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
        name: drizzle.PgColumn<{
            name: "name";
            tableName: "section";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
        displayOrder: drizzle.PgColumn<{
            name: "display_order";
            tableName: "section";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle.PgColumn<{
            name: "created_at";
            tableName: "section";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle.PgColumn<{
            name: "updated_at";
            tableName: "section";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export type SectionInsert = typeof section.$inferInsert;
export type SectionSelect = typeof section.$inferSelect;
export declare const SectionInsertZod: import("zod").ZodObject<{
    sectionId: import("zod").ZodOptional<import("zod").ZodNumber>;
    name: import("zod").ZodString;
    displayOrder: import("zod").ZodOptional<import("zod").ZodNumber>;
    createdAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    name: string;
    sectionId?: number | undefined;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
}, {
    name: string;
    sectionId?: number | undefined;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
}>;
export declare const SectionSelectZod: import("zod").ZodObject<{
    sectionId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    displayOrder: import("zod").ZodNumber;
    createdAt: import("zod").ZodNullable<import("zod").ZodDate>;
    updatedAt: import("zod").ZodNullable<import("zod").ZodDate>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}, {
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}>;
export declare const SectionUpdateZod: import("zod").ZodObject<{
    sectionId: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
    name: import("zod").ZodOptional<import("zod").ZodString>;
    displayOrder: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    sectionId?: number | undefined;
    name?: string | undefined;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
}, {
    sectionId?: number | undefined;
    name?: string | undefined;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
}>;
//# sourceMappingURL=section.d.ts.map