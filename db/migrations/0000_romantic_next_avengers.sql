CREATE TABLE "item" (
	"item_id" integer PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"subsection_id" integer,
	"name" varchar(100) NOT NULL,
	"description" text,
	"origin" varchar(100),
	"capacity" real,
	"unit" varchar(20),
	"price" numeric(10, 2) NOT NULL,
	"is_available" boolean DEFAULT true,
	"picture" varchar(255),
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "section" (
	"section_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "section_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "subsection" (
	"subsection_id" integer PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_section_id_section_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."section"("section_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_subsection_id_subsection_subsection_id_fk" FOREIGN KEY ("subsection_id") REFERENCES "public"."subsection"("subsection_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subsection" ADD CONSTRAINT "subsection_section_id_section_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."section"("section_id") ON DELETE cascade ON UPDATE no action;