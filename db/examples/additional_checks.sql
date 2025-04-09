-- Count items by section
SELECT s.name           AS section_name,
       COUNT(i.item_id) AS item_count
FROM section s
         LEFT JOIN
     item i ON s.section_id = i.section_id
GROUP BY s.name
ORDER BY COUNT(i.item_id) DESC;

-- Find most expensive items
SELECT name,
       price,
       (SELECT name FROM section WHERE section_id = item.section_id) AS section
FROM item
ORDER BY price DESC
LIMIT 5;

-- Get database schema overview
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;