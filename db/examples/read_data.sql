-- Get all items with complete details including section and subsection
SELECT i.item_id,
       s.name   AS section_name,
       sub.name AS subsection_name,
       i.name,
       i.description,
       i.capacity,
       i.unit,
       i.price,
       i.is_available,
       i.picture
FROM item i
         JOIN
     section s ON i.section_id = s.section_id
         LEFT JOIN
     subsection sub ON i.subsection_id = sub.subsection_id
ORDER BY s.display_order,
         COALESCE(sub.display_order, 0),
         i.display_order;

-- Get all items from a specific section
SELECT i.item_id,
       i.name,
       i.description,
       i.capacity,
       i.unit,
       i.price,
       sub.name AS subsection_name
FROM item i
         JOIN
     section s ON i.section_id = s.section_id
         LEFT JOIN
     subsection sub ON i.subsection_id = sub.subsection_id
WHERE s.name = 'Softs'
ORDER BY COALESCE(sub.display_order, 0),
         i.display_order;

-- Search items by name or description
SELECT i.item_id,
       s.name AS section_name,
       i.name,
       i.price
FROM item i
         JOIN
     section s ON i.section_id = s.section_id
WHERE i.name ILIKE '%coca%'
   OR i.description ILIKE '%coca%'
ORDER BY i.name;