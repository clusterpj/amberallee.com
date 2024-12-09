This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production Deployment

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/amberallee
POSTGRES_URL=postgresql://user:password@localhost:5432/amberallee
POSTGRES_PRISMA_URL=postgresql://user:password@localhost:5432/amberallee
POSTGRES_URL_NON_POOLING=postgresql://user:password@localhost:5432/amberallee

# Authentication
COREBILL_API_URL=https://api.corebill.com
JWT_SECRET=your-jwt-secret

# Next.js
NEXT_PUBLIC_APP_URL=https://amberallee.com
```
### Production Build

1. Install dependencies:
```bash
pnpm install
```
2. Build the application:
```bash
pnpm run build
```
3. Start the production server:
```bash
pnpm start
```
### Using PM2 (Recommended)

1. Install PM2 globally:
```bash
npm install -g pm2
```
2. Start the application with PM2:
```bash
pm2 start npm --name "amberallee" -- start
pm2 save
pm2 startup
```
### Nginx Configuration

1. Copy the Nginx configuration file:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/amberallee.com
sudo ln -s /etc/nginx/sites-available/amberallee.com /etc/nginx/sites-enabled/
```
2. Test and restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```
### SSL Configuration

1. Install Certbot:
```bash
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```
2. Obtain SSL certificate:
```bash
sudo certbot --nginx -d amberallee.com -d www.amberallee.com
```
### Systemd Service

1. Copy the service file:
```bash
sudo cp amberallee.service /etc/systemd/system/
```
2. Start and enable the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable amberallee
sudo systemctl start amberallee
```
### Monitoring

Monitor your application using PM2:
```bash
pm2 monit
```
View logs:
```bash
# Application logs
sudo journalctl -u amberallee
# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
