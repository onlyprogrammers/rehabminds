import { queryOptional } from '@/lib/db'

export type ScrapeCacheKind = 'previous_paper_course' | 'previous_paper_url' | 'programme_papers' | 'assignments'

export async function getScrapeCache<T>(kind: ScrapeCacheKind, cacheKey: string): Promise<T | null> {
  const result = await queryOptional<{ payload: T }>(
    `select payload
     from scrape_cache
     where kind = $1
       and cache_key = $2
       and expires_at > now()
     limit 1`,
    [kind, cacheKey]
  )

  return result?.rows[0]?.payload ?? null
}

export async function saveScrapeCache(kind: ScrapeCacheKind, cacheKey: string, payload: unknown, ttlHours = 72) {
  await queryOptional(
    `insert into scrape_cache (kind, cache_key, payload, expires_at, updated_at)
     values ($1, $2, $3::jsonb, now() + ($4::text || ' hours')::interval, now())
     on conflict (kind, cache_key)
     do update set payload = excluded.payload,
                   expires_at = excluded.expires_at,
                   updated_at = now()`,
    [kind, cacheKey, JSON.stringify(payload), ttlHours]
  )
}

