-- Add a new section
INSERT INTO section (name, display_order)
VALUES ('Snacks', 8);

-- Add a new subsection to an existing section
INSERT INTO subsection (section_id, name, display_order)
VALUES ((SELECT section_id FROM section WHERE name = 'Bières'),
        'Bières spéciales',
        3);

-- Add a new item
INSERT INTO item (section_id,
                  subsection_id,
                  name,
                  description,
                  capacity,
                  unit,
                  price,
                  origin,
                  is_available,
                  picture,
                  display_order)
VALUES ((SELECT section_id FROM section WHERE name = 'Softs'),
        NULL,
        'Orangina',
        'Boisson gazeuse à l''orange',
        25,
        'cl',
        2.80,
        'Mons',
        TRUE,
        'orangina.jpg',
        20);