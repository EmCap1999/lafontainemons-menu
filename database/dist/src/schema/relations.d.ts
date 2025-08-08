export declare const sectionRelations: import("drizzle-orm").Relations<"section", {
    subsections: import("drizzle-orm").Many<"subsection">;
    items: import("drizzle-orm").Many<"item">;
}>;
export declare const subsectionRelations: import("drizzle-orm").Relations<"subsection", {
    section: import("drizzle-orm").One<"section", true>;
    items: import("drizzle-orm").Many<"item">;
}>;
export declare const itemRelations: import("drizzle-orm").Relations<"item", {
    section: import("drizzle-orm").One<"section", true>;
    subsection: import("drizzle-orm").One<"subsection", false>;
}>;
//# sourceMappingURL=relations.d.ts.map