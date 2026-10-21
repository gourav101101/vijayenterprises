import { defaultContent } from './data';
import { getDb } from '../../db';
import { settings } from '../../db/schema';
import { eq } from 'drizzle-orm';
export async function getSiteContent() {
  try {
    const [record] = await getDb().select().from(settings).where(eq(settings.id, 'site')).limit(1);
    return record ? { ...defaultContent, ...JSON.parse(record.value) } : defaultContent;
  } catch (error) { console.error('Site content read failed', error); return defaultContent; }
}
