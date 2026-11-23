-- Lock the app tables away from Supabase's public Data API (PostgREST).
-- The app connects as `postgres` (BYPASSRLS), so it is unaffected.
-- Applied manually to production on 2026-11-23, then recorded as this migration.
-- Unqualified table names: applies to the schema Prisma is migrating.

-- Row Level Security with no policies: API roles see no rows.
ALTER TABLE "Admin"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Client"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Plan"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Settings"     ENABLE ROW LEVEL SECURITY;

-- Remove table privileges from the API roles, and stop future objects
-- created by `postgres` in this schema from being granted to them.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON "Admin", "Client", "Notification", "Order", "Plan", "Settings" FROM anon, authenticated;
    EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA %I REVOKE ALL ON TABLES FROM anon, authenticated', current_schema());
    EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA %I REVOKE ALL ON SEQUENCES FROM anon, authenticated', current_schema());
    EXECUTE format('ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA %I REVOKE ALL ON FUNCTIONS FROM anon, authenticated', current_schema());
  END IF;
END $$;
