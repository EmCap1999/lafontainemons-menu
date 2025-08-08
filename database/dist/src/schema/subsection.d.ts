import * as drizzle from 'drizzle-orm/pg-core';
export declare const subsection: drizzle.PgTableWithColumns<{
    name: "subsection";
    schema: undefined;
    columns: {
        subsectionId: drizzle.PgColumn<{
            name: "subsection_id";
            tableName: "subsection";
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
        sectionId: drizzle.PgColumn<{
            name: "section_id";
            tableName: "subsection";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
        name: drizzle.PgColumn<{
            name: "name";
            tableName: "subsection";
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
            tableName: "subsection";
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
            tableName: "subsection";
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
            tableName: "subsection";
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
export type SubsectionInsert = typeof subsection.$inferInsert;
export type SubsectionSelect = typeof subsection.$inferSelect;
export declare const SubsectionInsertZod: import("zod").ZodObject<{
    sectionId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    displayOrder: import("zod").ZodOptional<import("zod").ZodNumber>;
    createdAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>;
    subsectionId: import("zod").ZodOptional<import("zod").ZodNumber>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    sectionId: number;
    name: string;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    subsectionId?: number | undefined;
}, {
    sectionId: number;
    name: string;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    subsectionId?: number | undefined;
}>;
export declare const SubsectionSelectZod: import("zod").ZodObject<{
    subsectionId: import("zod").ZodNumber;
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
    subsectionId: number;
}, {
    sectionId: number;
    name: string;
    displayOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    subsectionId: number;
}>;
export declare const SubsectionUpdateZod: import("zod").ZodObject<{
    sectionId: import("zod").ZodOptional<import("zod").ZodNumber>;
    name: import("zod").ZodOptional<import("zod").ZodString>;
    displayOrder: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
    createdAt: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodDate>>>;
    subsectionId: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    sectionId?: number | undefined;
    name?: string | undefined;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    subsectionId?: number | undefined;
}, {
    sectionId?: number | undefined;
    name?: string | undefined;
    displayOrder?: number | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    subsectionId?: number | undefined;
}>;
//# sourceMappingURL=subsection.d.ts.map