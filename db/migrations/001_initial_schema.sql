CREATE TABLE IF NOT EXISTS public.section
(
    section_id    SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL UNIQUE,
    display_order INT          NOT NULL DEFAULT 0,
    created_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS public.subsection
(
    subsection_id SERIAL PRIMARY KEY,
    section_id    INT          NOT NULL REFERENCES public.SECTION (section_id) ON DELETE CASCADE,
    name          VARCHAR(100) NOT NULL,
    display_order INT          NOT NULL DEFAULT 0,
    created_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (section_id, name)
);


CREATE TABLE IF NOT EXISTS public.item
(
    item_id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    section_id    INT            NOT NULL REFERENCES public.SECTION (section_id) ON DELETE CASCADE,
    subsection_id INT            REFERENCES public.subsection (subsection_id) ON DELETE SET NULL,
    name          VARCHAR(100)   NOT NULL,
    description   TEXT,
    capacity      REAL,
    unit          VARCHAR(20),
    price         NUMERIC(10, 2) NOT NULL,
    is_available  BOOLEAN                 DEFAULT TRUE,
    picture       VARCHAR(255),
    display_order INT            NOT NULL DEFAULT 0,
    created_at    TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP               DEFAULT CURRENT_TIMESTAMP
);