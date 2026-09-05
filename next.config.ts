import type { NextConfig } from 'next';
const config: NextConfig = { poweredByHeader: false, devIndicators: false, trailingSlash: true, ...(process.env.CLOUDFLARE_BUILD === '1' ? { output: 'export' as const } : {}) };
export default config;
