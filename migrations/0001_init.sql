-- Initial migration: create uploader transactions table

CREATE TABLE IF NOT EXISTS uploads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uploader_wallet_pubkey TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  page_id TEXT NOT NULL,
  meta_tags_json TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


