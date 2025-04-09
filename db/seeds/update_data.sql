-- Update section name
UPDATE item
SET is_available = FALSE, updated_at = CURRENT_TIMESTAMP
WHERE item_id = 5;

-- Update the price of an item
UPDATE item
SET price = 3.50, updated_at = CURRENT_TIMESTAMP
WHERE item_id = 1;

-- Update display order for a series of items
UPDATE item
SET display_order = display_order + 10, updated_at = CURRENT_TIMESTAMP
WHERE section_id = (SELECT section_id FROM section WHERE name = 'Softs');

-- Update section name
UPDATE section
SET name = 'Boissons chaudes', updated_at = CURRENT_TIMESTAMP
WHERE name = 'HotDrinks';


