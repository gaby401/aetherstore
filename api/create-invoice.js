// api/create-invoice.js

import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load secrets from __local.env instead of default .env
dotenv.config({ path: '__local.env' }); // or '.aetherstore.env'

const BOT_TOKEN = process.env.BOT_TOKEN;
const PAYMENT_PROVIDER_TOKEN = process.env.PAYMENT_PROVIDER_TOKEN;
const CURRENCY = 'ILS';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).send('Method Not Allowed');
  }

  try {
    const { cart, user } = request.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return response.status(400).json({ error: 'Cart is invalid or empty.' });
    }

    if (!user || !user.id) {
      return response.status(400).json({ error: 'User information is missing.' });
    }

    const prices = cart.map(item => ({
      label: item.name,
      amount: item.price * 100 // smallest unit (Agorot)
    }));

    const invoicePayload = {
      title: 'AetherStore Purchase',
      description: `Your order of ${cart.length} items.`,
      payload: `aetherstore-order-${user.id}-${Date.now()}`,
      provider_token: PAYMENT_PROVIDER_TOKEN,
      currency: CURRENCY,
      prices: prices,
    };

    const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`;
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoicePayload)
    });

    const data = await apiResponse.json();

    if (data.ok) {
      response.status(200).json({ invoiceLink: data.result });
    } else {
      console.error('Telegram API Error:', data);
      response.status(500).json({ error: 'Failed to create Telegram invoice.', details: data.description });
    }

  } catch (error) {
    console.error('Server Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}
