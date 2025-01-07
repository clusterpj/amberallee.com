ALTER TABLE books
  ADD COLUMN IF NOT EXISTS categories text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS purchase_now_button text DEFAULT '',
  ADD COLUMN IF NOT EXISTS series text DEFAULT '',
  ADD COLUMN IF NOT EXISTS book_number integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS teasers text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tropes text[] DEFAULT '{}';

COMMENT ON COLUMN books.categories IS 'Array of categories the book belongs to';
COMMENT ON COLUMN books.purchase_now_button IS 'Purchase button configuration (in development)';
COMMENT ON COLUMN books.series IS 'Name of the series the book belongs to';
COMMENT ON COLUMN books.book_number IS 'Order number in the series';
COMMENT ON COLUMN books.teasers IS 'Array of teaser text or links';
COMMENT ON COLUMN books.tropes IS 'Array of tropes associated with the book';
