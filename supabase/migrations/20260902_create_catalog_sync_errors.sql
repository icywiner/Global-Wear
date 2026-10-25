-- Migration: create table for catalog sync errors
CREATE TABLE IF NOT EXISTS public.catalog_sync_errors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  country text,
  reason text,
  message text,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Ensure extension for gen_random_uuid exists (pgcrypto)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
