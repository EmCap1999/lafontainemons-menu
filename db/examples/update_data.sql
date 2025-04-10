-- Update is_available attribute
UPDATE item
SET is_available = FALSE,
    updated_at   = CURRENT_TIMESTAMP
WHERE item_id = 5;

-- Update the price of an item
UPDATE item
SET price      = 3.50,
    updated_at = CURRENT_TIMESTAMP
WHERE item_id = 1;

-- Reorder all items in a specific section alphabetically
WITH ordered_items AS (SELECT item_id,
                              ROW_NUMBER() OVER (
                                  PARTITION BY section_id, subsection_id
                                  ORDER BY name
                                  ) AS new_order
                       FROM item
                       WHERE section_id = (SELECT section_id FROM section WHERE name = 'Alcools'))
UPDATE item i
SET display_order = o.new_order,
    updated_at    = CURRENT_TIMESTAMP
FROM ordered_items o
WHERE i.item_id = o.item_id;

-- Reorder all sections alphabetically
WITH ordered_sections AS (SELECT section_id,
                                 ROW_NUMBER() OVER ( ORDER BY name) AS new_order
                          FROM section)
UPDATE section s
SET display_order = o.new_order,
    updated_at    = CURRENT_TIMESTAMP
FROM ordered_sections o
WHERE s.section_id = o.section_id;

-- Reorder all subsections alphabetically within each section
WITH ordered_subsections AS (SELECT subsection_id,
                                    ROW_NUMBER() OVER (
                                        PARTITION BY section_id
                                        ORDER BY name) AS new_order
                             FROM subsection)
UPDATE subsection s
SET display_order = o.new_order,
    updated_at    = CURRENT_TIMESTAMP
FROM ordered_subsections o
WHERE s.subsection_id = o.subsection_id;

-- Update section name
UPDATE section
SET name       = 'Boissons chaudes',
    updated_at = CURRENT_TIMESTAMP
WHERE name = 'HotDrinks';

-- Update subsection name
UPDATE subsection
SET name       = 'Vins rouges',
    updated_at = CURRENT_TIMESTAMP
WHERE name = 'Vin rosé, blanc & rouge'
  AND section_id = (SELECT section_id FROM section WHERE name = 'Les Vins');


