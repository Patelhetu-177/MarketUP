'use server';

import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest/client';
import { sendSignUpEmail, sendDailyNewsSummary } from '@/lib/inngest/functions';

export const dynamic = 'force-dynamic';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendSignUpEmail, sendDailyNewsSummary],
  streaming: 'allow',
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      cache: 'no-store',
    });
  },
});