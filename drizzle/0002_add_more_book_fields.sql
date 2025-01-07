ALTER TABLE books
  ADD COLUMN categories text[],
  ADD COLUMN purchase_now_button text,
  ADD COLUMN series text,
  ADD COLUMN book_number integer,
  ADD COLUMN teasers text[],
  ADD COLUMN tropes text[];

COMMENT ON COLUMN books.categories IS 'Array of categories the book belongs to';
COMMENT ON COLUMN books.purchase_now_button IS 'Purchase button configuration (in development)';
COMMENT ON COLUMN books.series IS 'Name of the series the book belongs to';
COMMENT ON COLUMN books.book_number IS 'Order number in the series';
COMMENT ON COLUMN books.teasers IS 'Array of teaser text or links';
COMMENT ON COLUMN books.tropes IS 'Array of tropes associated with the book';
