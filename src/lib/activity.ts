import { supabase } from '@/integrations/supabase/client';

export type ActivityType =
  | 'auth_login'
  | 'auth_register'
  | 'auth_logout'
  | 'location_select'
  | 'brand_select'
  | 'category_select'
  | 'product_search'
  | 'product_view'
  | 'product_compare'
  | 'ai_query';

type ActivityPayload = Record<string, string | number | boolean | null | undefined>;

export async function logActivity(type: ActivityType, payload: ActivityPayload = {}) {
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) return;

  await supabase.from('activity_events').insert({
    user_id: userId,
    event_type: type,
    payload,
  });
}
