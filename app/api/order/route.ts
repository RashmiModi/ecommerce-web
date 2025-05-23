// pages/api/transactions.ts

import type { NextApiRequest, NextApiResponse } from 'next';

import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://api.razorpay.com/v1/payments', {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching payments:', errorText);
      return res.status(500).json({ error: 'Failed to fetch payments' });
    }

    const data = await response.json();

  
  } catch (error) {
    console.error('Error upserting payments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}