'use server';

import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest/client';
import { sendSignUpEmail, sendDailyNewsSummary } from '@/lib/inngest/functions';

const handler = serve({
  client: inngest,
  functions: [sendSignUpEmail, sendDailyNewsSummary],
  streaming: 'allow',
});

export const GET = handler.GET;
export const POST = handler.POST;
export const PUT = handler.PUT;

export const dynamic = 'force-dynamic';