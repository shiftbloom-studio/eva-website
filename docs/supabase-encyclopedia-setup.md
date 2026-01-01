# Supabase Setup — Encyclopedia of Arda (`/enzyklopaedie`)

This guide sets up Supabase **Auth + Database (RLS)** for the Encyclopedia route group in this repo.

- The encyclopedia is **protected by default** (auth required).
- Set `ENCYCLOPEDIA_PUBLIC=true` to bypass auth **in the Next.js app** for **read-only public access**.
- Supabase is used **only** inside `/enzyklopaedie/**` and its middleware matcher (marketing routes remain Supabase-free).

## 1) Create a Supabase project

1. In the Supabase dashboard, create a new project.
2. Save the following values (Project Settings → API):
   - **Project URL**
   - **Publishable key** (legacy name: **anon key**)

## 2) Configure environment variables

Create (or update) `.env.local` in the project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT-REF.supabase.co"
# Prefer the new name; if your dashboard shows "anon key", use that value here.
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY"

# Encyclopedia
# If true, bypasses auth gating for /enzyklopaedie/** (read-only public access).
ENCYCLOPEDIA_PUBLIC="false"
```

Notes:
- Any variable starting with `NEXT_PUBLIC_` is available in the browser (this is expected for Supabase URL/key).
- **Do not** commit `.env.local`.

## 3) Create the database table

In Supabase: **SQL Editor → New query**, then run:

```sql
-- Encyclopedia articles (Markdown/MDX stored in `content`)
create table if not exists public.encyclopedia_articles (
  id uuid primary key default gen_random_uuid(),

  -- Canonical URL key: /enzyklopaedie/article/<slug>
  slug text not null unique,

  title text not null,
  content text not null,

  -- Optional structured metadata for filtering/search/navigation
  category text,
  tags text[] not null default '{}',
  aliases text[] not null default '{}',
  related text[] not null default '{}',
  knowledge_type text not null default 'mixed' check (knowledge_type in ('ic', 'ooc', 'mixed')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep `updated_at` fresh on updates.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists encyclopedia_articles_set_updated_at on public.encyclopedia_articles;
create trigger encyclopedia_articles_set_updated_at
before update on public.encyclopedia_articles
for each row
execute procedure public.set_updated_at();
```

### Optional: seed an example article

```sql
insert into public.encyclopedia_articles (slug, title, content, category, tags, aliases, related, knowledge_type)
values (
  'eldric-varn',
  'Eldric Varn',
  E'---\ntitle: Eldric Varn\ntags: [character, arathor, warden]\naliases: [\"Eldric\", \"Der Eidläufer\"]\nrelated: [\"[[Arathor]]\", \"[[Vael Tirin]]\"]\nknowledge_type: ic\n---\n\n# Eldric Varn\n\nEin Name wie ein Schwur.\n',
  'characters',
  array['character','arathor','warden'],
  array['Eldric','Der Eidläufer'],
  array['[[Arathor]]','[[Vael Tirin]]'],
  'ic'
)
on conflict (slug) do nothing;
```

## 4) Enable Row Level Security (RLS)

Run:

```sql
alter table public.encyclopedia_articles enable row level security;
```

## 5) Add RLS policies

### Option A (recommended default): **Authenticated users only**

```sql
-- READ
drop policy if exists "Encyclopedia articles are readable by authenticated users" on public.encyclopedia_articles;
create policy "Encyclopedia articles are readable by authenticated users"
on public.encyclopedia_articles
for select
to authenticated
using (true);

-- WRITE (CRUD)
drop policy if exists "Encyclopedia articles are writable by authenticated users" on public.encyclopedia_articles;
create policy "Encyclopedia articles are writable by authenticated users"
on public.encyclopedia_articles
for all
to authenticated
using (true)
with check (true);
```

### Option B: **Public read** (for `ENCYCLOPEDIA_PUBLIC=true`)

If you want unauthenticated visitors to be able to read from Supabase too, add:

```sql
drop policy if exists "Encyclopedia articles are readable by everyone" on public.encyclopedia_articles;
create policy "Encyclopedia articles are readable by everyone"
on public.encyclopedia_articles
for select
to authenticated, anon
using (true);
```

Important:
- This only controls DB access. The **Next.js app** still gates `/enzyklopaedie/**` unless `ENCYCLOPEDIA_PUBLIC=true`.

## 6) Configure Supabase Auth (email/password)

In Supabase dashboard:

1. **Authentication → Providers**
2. Ensure **Email** provider is enabled.
3. Decide whether you allow signups:
   - If you **disable signups**, create users manually in **Authentication → Users** (recommended for a private lore wiki).

### Redirect URLs (recommended)

If you enable email confirmations, password recovery, or magic links, add redirect URLs:

- Local dev:
  - `http://localhost:3000/enzyklopaedie`
  - `http://localhost:3000/enzyklopaedie/login`
  - `http://localhost:3000/enzyklopaedie/auth/confirm` (if you implement a confirm route)
- Production (example):
  - `https://YOUR_DOMAIN/enzyklopaedie`
  - `https://YOUR_DOMAIN/enzyklopaedie/login`
  - `https://YOUR_DOMAIN/enzyklopaedie/auth/confirm`

Also set the **Site URL** to your production origin (e.g. `https://YOUR_DOMAIN`).

## 7) Optional: Storage bucket for article images

If you want images stored in Supabase Storage:

1. **Storage → Buckets → New bucket**
2. Create a bucket, e.g. `encyclopedia-images`
3. Choose:
   - **Public** if images are public
   - **Private** if you want auth-only access (recommended for private wiki)

Then add Storage policies to match your access model (public read vs authenticated read).

## 8) Testing checklist

- **Auth gating**
  - With `ENCYCLOPEDIA_PUBLIC=false`: visiting `/enzyklopaedie` redirects to `/enzyklopaedie/login` when logged out.
  - With `ENCYCLOPEDIA_PUBLIC=true`: `/enzyklopaedie` is readable without logging in.
- **DB/RLS**
  - With Option A policies: anon requests cannot `select` from `public.encyclopedia_articles`.
  - With Option B policy: anon requests can `select` but still cannot write.
- **Content loading**
  - Local files under `src/content/**/*.md` load in dev.
  - Supabase rows load in prod (or when local file is missing, depending on app configuration).
