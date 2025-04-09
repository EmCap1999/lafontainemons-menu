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
        TRUE,
        'orangina.jpg',
        20);

-- Add multiple items at once
INSERT INTO item (section_id, name, price, is_available, display_order)
VALUES ((SELECT section_id FROM section WHERE name = 'Snacks'), 'Chips sel', 2.50, TRUE, 1),
       ((SELECT section_id FROM section WHERE name = 'Snacks'), 'Chips paprika', 2.50, TRUE, 2),
       ((SELECT section_id FROM section WHERE name = 'Snacks'), 'Cacahuètes', 3.00, TRUE, 3);