TRUNCATE public.item CASCADE;
TRUNCATE public.subsection CASCADE;
TRUNCATE public.section CASCADE;

CREATE SEQUENCE IF NOT EXISTS section_id_seq;
CREATE SEQUENCE IF NOT EXISTS subsection_id_seq;
CREATE SEQUENCE IF NOT EXISTS item_id_seq;

ALTER TABLE public.section
    ALTER COLUMN section_id SET DEFAULT nextval('section_id_seq');
ALTER TABLE public.subsection
    ALTER COLUMN subsection_id SET DEFAULT nextval('subsection_id_seq');
ALTER TABLE public.item
    ALTER COLUMN item_id SET DEFAULT nextval('item_id_seq');

ALTER SEQUENCE section_id_seq OWNED BY public.section.section_id;
ALTER SEQUENCE subsection_id_seq OWNED BY public.subsection.subsection_id;
ALTER SEQUENCE item_id_seq OWNED BY public.item.item_id;

-- Sections
INSERT INTO public.section (name, display_order)
VALUES ('Softs', 1),
       ('Desserts', 2),
       ('HotDrinks', 3),
       ('Les Vins', 4),
       ('Bières', 5),
       ('Apéritifs', 6),
       ('Alcools', 7);

-- Subsections
INSERT INTO public.subsection (section_id, name, display_order)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Les Vins'), 'Vin rosé, blanc & rouge', 1),
       ((SELECT section_id FROM public.section WHERE name = 'Les Vins'), 'Sélection du Patron', 2),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), 'Au fût', 1);

-- Softs
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Chaudfontaine', 2.50, 25, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Chaudfontaine', 4.50, 50, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Chaudfontaine', 7.00, 100, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Perrier Nature', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'San Pellegrino', 2.50, 25, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'San Pellegrino', 4.50, 50, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Fanta Orange', 2.50, 20, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Coca-Cola', 2.50, 20, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Coca-Cola', 7.00, 100, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Coca-Cola Zéro', 2.50, 20, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Schweppes Tonic', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Schweppes Agrume', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Fuze Tea', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Jus d''orange', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Jus de tomate', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Jus de cerise', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Jus de fraise & poire', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Softs'), NULL, 'Jus multifruits', 2.50, NULL, NULL);

-- Desserts
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Desserts'), NULL,
        'Moelleux chocolat/caramel et boule de glace', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Desserts'), NULL, 'Tarte aux morceaux de pomme', 8.00,
        NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Desserts'), NULL, 'Dame blanche au chocolat chaud', 8.00,
        NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Desserts'), NULL, 'Sorbet', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Desserts'), NULL, 'Sorbet avec alcool', 10.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Desserts'), NULL, 'Flambé au calvados', 10.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Desserts'), NULL, 'Glace', 7.00, NULL, NULL);

-- Boissons chaudes
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Café', 2.20, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Décaféiné', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Thé', 2.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Chocolat chaud', 3.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Chocolat viennois', 3.50, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Capuccino', 3.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Vin chaud', 6.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Irish Coffee maison', 8.00, NULL,
        NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'French Koffee', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Italian Koffee', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'HotDrinks'), NULL, 'Vin chaud amélioré', 7.00, NULL, NULL);

-- Les Vins
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Les Vins'),
        (SELECT subsection_id
         FROM public.subsection
         WHERE name = 'Vin rosé, blanc & rouge'
           AND section_id = (SELECT section_id FROM public.section WHERE name = 'Les Vins')),
        'Le verre', 5.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Les Vins'),
        (SELECT subsection_id
         FROM public.subsection
         WHERE name = 'Vin rosé, blanc & rouge'
           AND section_id = (SELECT section_id FROM public.section WHERE name = 'Les Vins')),
        'Pichet', 8.00, 25, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Les Vins'),
        (SELECT subsection_id
         FROM public.subsection
         WHERE name = 'Vin rosé, blanc & rouge'
           AND section_id = (SELECT section_id FROM public.section WHERE name = 'Les Vins')),
        'Pichet', 16.00, 50, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Les Vins'),
        (SELECT subsection_id
         FROM public.subsection
         WHERE name = 'Sélection du Patron'
           AND section_id = (SELECT section_id FROM public.section WHERE name = 'Les Vins')),
        'La bouteille', 25.00, 75, 'cl');

-- Bières au fût
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Bières'),
        (SELECT subsection_id
         FROM public.subsection
         WHERE name = 'Au fût'
           AND section_id = (SELECT section_id FROM public.section WHERE name = 'Bières')),
        'Jupiler', 2.30, 25, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'),
        (SELECT subsection_id
         FROM public.subsection
         WHERE name = 'Au fût'
           AND section_id = (SELECT section_id FROM public.section WHERE name = 'Bières')),
        'Jupiler', 3.00, 33, 'cl');

-- Bières de Mons
INSERT INTO public.item (section_id, subsection_id, name, origin, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Bières'),
        NULL,
        'Saint-Lazare 002 Saison',
        'Mons',
        4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'),
        NULL,
        'Saint-Lazare 006 IPA',
        'Mons',
        4.50, 33, 'cl');

-- Autres bières
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Saint-Feuillien blonde', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Fram Bush', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Pêche Mel', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Leffe blonde/brune', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Triple Karmeliet', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Saint-Feuillien Grand cru', 5.00, 33,
        'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Chimay blanche', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Chimay bleue', 5.00, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Fram'' Bush', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Pêche Mel''', 4.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Duvel', 5.00, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Westmalle triple', 5.00, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Orval', 5.00, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Dominicains quadruple', 5.00, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Liefmans', 3.50, 33, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Blanche', 2.50, 25, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Blanche rosée', 3.00, 25, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Carlsberg', 3.00, 25, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Geuze Boon', 6.00, 37.5, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Moinette', 10.00, 75, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Bières'), NULL, 'Supplément de sirop', 0.20, NULL, NULL);

-- Apéritifs
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Apéritif maison', 9.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Spritz', 9.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Martini blanc ou rouge', 5.00, NULL,
        NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Porto', 7.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Pineau des Charentes', 7.00, NULL,
        NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Kir', 7.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Batida', 7.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Campari orange', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Pisang orange', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Picon vin blanc', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Ricard', 5.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Cynar', 5.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Grodino 0%', 5.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Funny Pisang orange 0%', 5.00, NULL,
        NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Prosecco', 30.00, 75, 'cl'),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Negroni', 9.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Apéritifs'), NULL, 'Rhum Coca', 8.00, NULL, NULL);

-- Alcools
INSERT INTO public.item (section_id, subsection_id, name, price, capacity, unit)
VALUES ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Cocktail maison', 7.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Cognac', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Gin', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Gin Soft', 9.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Whisky', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Calvados', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Vacchia Romagna', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Grappa', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Averna', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Amaretto di Saronno', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Sambuca', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Cointreau', 8.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Chartreuse', 12.00, NULL, NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Rhum vanillé de Martinique', 8.00, NULL,
        NULL),
       ((SELECT section_id FROM public.section WHERE name = 'Alcools'), NULL, 'Limoncello', 8.00, NULL, NULL);