
CREATE TABLE IF NOT EXISTS public.item
(
    "itemId" bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    section character varying NOT NULL,
    subsection character varying,
    name character varying NOT NULL,
    capacity integer,
    price integer NOT NULL,
    picture character varying,
    PRIMARY KEY ("itemId")
);

INSERT INTO public.item (section, subsection, name, price, capacity)
VALUES 
    ('Softs',null, 'Chaudefontaine', 2.20, 25),
    ('Softs',null, 'Chaudefontaine', 4, 50),
    ('Softs',null, 'Chaudefontaine', 7, 100),
    ('Softs',null, 'Perrier Nature', 2.50, NULL),
    ('Softs',null, 'San Pellegrino', 2.50, 25),
    ('Softs',null, 'San Pellegrino', 4.50, 50),
    ('Softs',null, 'Fanta Orange', 2.50, 20),
    ('Softs',null, 'Coca-Cola', 2.50, 20),
    ('Softs',null, 'Coca-Cola', 7, 100),
    ('Softs',null, 'Coca-Cola Zéro', 2.50, 20),
    ('Softs',null, 'Schweppes Tonic', 2.50, NULL),
    ('Softs',null, 'Schweppes Agrume', 2.50, NULL),
    ('Softs',null, 'Fuze Tea', 2.50, NULL),
    ('Softs',null, 'Jus d''orange', 2.50, NULL),
    ('Softs',null, 'Jus de tomate', 2.50, NULL),
    ('Softs',null, 'Jus de cerise', 2.50, NULL),
    ('Softs',null, 'Jus de fraise & poire', 2.50, NULL),
    ('Softs',null, 'Jus multifruits', 2.50, NULL),
    ('Desserts',null, 'Le moelleux au chocolat maison', 8, null),
    ('Desserts',null, 'Tarte aux pommes', 8, null),
    ('Desserts',null, 'Glace', 7, null),
    ('Desserts',null, 'Sorbet', 7, null),
    ('HotDrinks',null, 'Café', 2.20, null),
    ('HotDrinks',null, 'Décaféiné', 2.50, null),
    ('HotDrinks',null, 'Thé', 2.50, null),
    ('HotDrinks',null, 'Chocolat chaud', 3, null),
    ('HotDrinks',null, 'Chocolat viennois', 3.50, null),
    ('HotDrinks',null, 'Capuccino', 3, null),
    ('HotDrinks',null, 'Vin chaud', 6, null),
    ('HotDrinks',null, 'Irish Coffee maison', 8, null),
    ('HotDrinks',null, 'French Koffee', 8, null),
    ('HotDrinks',null, 'Italian Koffee', 8, null),
    ('Les Vins', 'Vin rosé, blanc & rouge', 'Le verre', 5, null),
    ('Les Vins', 'Vin rosé, blanc & rouge', 'Pichet', 7.50, 25),
    ('Les Vins', 'Vin rosé, blanc & rouge', 'Pichet', 15, 50),
    ('Les Vins', 'Sélection du Patron', 'Le verre', 25, 75),
    ('Bières', 'Au fût', 'Jupiler', 2.20, 25),
    ('Bières', 'Au fût', 'Jupiler', 3, 33),
    ('Bières', null, 'Saint-Lazare 002 IPA', 2.20, 33),
    ('Bières', null, 'Saint-Lazare 040 Triple blonde', 2.20, 33),
    ('Bières', null, 'Saint-Feuillien blonde', 4.50, 33),
    ('Bières', null, 'Leffe blonde/brune', 4.50, 33),
    ('Bières', null, 'Triple Karmeliet', 4.50, 33),
    ('Bières', null, 'Saint-Feuillien Grand cru', 5, 33),
    ('Bières', null, 'Chimay blanche', 4.50, 33),
    ('Bières', null, 'Chimay bleue', 5, 33),
    ('Bières', null, 'Duvel', 5, 33),
    ('Bières', null, 'Westmalle triple', 5, 33),
    ('Bières', null,'Orval', 5, 33),
    ('Bières', null, 'Liefmans', 3.50, 33),
    ('Bières', null, 'Blanche', 2.70, 25),
    ('Bières', null, 'Blanche rosée', 3, 25),
    ('Bières', null, 'Carlsberg', 3, 25),
    ('Bières', null, 'Geuze Boon', 6, 37.5),
	('Bières', null, 'Moinette', 6, 75),
	('Bières', null, 'Supplément de sirop', 0.20, null),
	('Apéritifs', null, 'Apéritif maison', 9, null),
	('Apéritifs', null, 'Spritz', 9, null),
	('Apéritifs', null, 'Martini blanc ou rouge', 5, null),
	('Apéritifs', null, 'Porto', 5, null),
	('Apéritifs', null, 'Pineau des Charentes', 5, null),
	('Apéritifs', null, 'Kir', 5, null),
	('Apéritifs', null, 'Batida', 7, null),
	('Apéritifs', null, 'Campari orange', 8, null),
	('Apéritifs', null, 'Pisang orange', 8, null),
	('Apéritifs', null, 'Picon vin blanc', 8, null),
	('Apéritifs', null, 'Ricard', 5, null),
	('Apéritifs', null, 'Cynar', 5, null),
	('Apéritifs', null, 'Grodino 0%', 5, null),
	('Apéritifs', null, 'Funny Pisang orange 0%', 5, null),
	('Apéritifs', null, 'Prosecco', 30, 75),
	('Alcools', null, 'Cognac', 8, null),
	('Alcools', null, 'Gin', 8, null),
	('Alcools', null, 'Whisky', 8, null),
	('Alcools', null, 'Calvados', 8, null),
	('Alcools', null, 'Vacchia Romagna', 8, null),
	('Alcools', null, 'Grappa', 8, null),
	('Alcools', null, 'Averna', 8, null),
	('Alcools', null, 'Amaretto di Saronno', 8, null),
	('Alcools', null, 'Sambuca', 8, null),
	('Alcools', null, 'Cointreau', 8, null),
	('Alcools', null, 'Chartreuse', 12, null),
	('Alcools', null, 'Rhum vanillé de Martinique', 8, null),
	('Alcools', null, 'Limoncello', 8, null);
	
	
	

	
	
	
	
	
    




