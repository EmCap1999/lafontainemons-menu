-- Get all sections ordered by display order
SELECT section_id,
       name,
       display_order,
       created_at,
       updated_at
FROM section
ORDER BY display_order, name;

-- Get all subsections with their parent section
SELECT sub.subsection_id,
       sub.name AS subsection_name,
       sub.display_order,
       s.section_id,
       s.name   AS section_name,
       sub.created_at,
       sub.updated_at
FROM subsection sub
         JOIN
     section s ON sub.section_id = s.section_id
ORDER BY s.display_order, s.name, sub.display_order, sub.name;

-- Get all items with their section and subsection (if applicable)
SELECT i.item_id,
       s.name   AS section_name,
       i.name   AS item_name,
       i.price,
       i.capacity,
       i.unit,
       sub.name AS subsection_name,
       i.origin,
       i.is_available,
       i.display_order,
       i.created_at,
       i.updated_at
FROM item i
         JOIN
     section s ON i.section_id = s.section_id
         LEFT JOIN
     subsection sub ON i.subsection_id = sub.subsection_id
ORDER BY s.display_order,
         s.name,
         COALESCE(sub.display_order, 0),
         COALESCE(sub.name, ''),
         i.display_order,
         i.name;