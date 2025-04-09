CREATE INDEX idx_item_section ON public.item (section_id);
CREATE INDEX idx_item_subsection ON public.item (subsection_id);
CREATE INDEX idx_subsection_section ON public.subsection (section_id);
CREATE INDEX idx_item_origin ON public.item (origin);