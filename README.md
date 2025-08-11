# AetherStore

A minimal Telegram Mini App store with payments.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `__local.env` file in the project root and provide the required secrets:
   ```bash
   BOT_TOKEN=<your BotFather token>
   PAYMENT_PROVIDER_TOKEN=<your payment provider token>
   ```
   The repository includes `__local.env` as an example.
3. Start the development server:
   ```bash
   vercel dev
   ```
   The app will be available at `http://localhost:3000`.

## Environment Variables

- **BOT_TOKEN** – Telegram Bot token obtained from @BotFather.
- **PAYMENT_PROVIDER_TOKEN** – Telegram payment provider token (use the test token for development).

## Deployment

1. Log in to Vercel and initialize the project if needed:
   ```bash
   vercel login
   vercel
   ```
2. Add the environment variables to your Vercel project:
   ```bash
   vercel env add BOT_TOKEN
   vercel env add PAYMENT_PROVIDER_TOKEN
   ```
3. Deploy the project:
   ```bash
   vercel --prod
   ```

## Troubleshooting

- **Missing tokens** – If `/api/create-invoice` returns errors like `Telegram API Error: 401 Unauthorized`, ensure `BOT_TOKEN` and `PAYMENT_PROVIDER_TOKEN` are defined locally or in Vercel.
- **Telegram script issues** – If `Telegram.WebApp` is undefined or the checkout button does nothing, confirm you're running the app inside the Telegram in-app browser or include the Telegram script:
  ```html
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  ```
- **General debugging** – Check server logs with `vercel logs <deployment>` and browser console errors for more details.

