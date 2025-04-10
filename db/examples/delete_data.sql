-- Delete all unavailable items
DELETE
FROM item
WHERE is_available = FALSE;

-- Delete a specific item
DELETE
FROM item
WHERE item_id = 10;

-- Delete a subsection and all its items (uses cascade delete)
DELETE
FROM subsection
WHERE subsection_id = (SELECT subsection_id
                       FROM subsection
                       WHERE name = 'Au fût'
                         AND section_id = (SELECT section_id FROM section WHERE name = 'Bières'));

-- Delete a section and all its items (uses cascade delete)
DELETE
FROM section
WHERE name = 'Alcools';

