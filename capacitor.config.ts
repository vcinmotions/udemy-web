import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shobha.udemyclone',
  appName: 'Smart Skills India',
  webDir: 'out',
  server: {
    url: 'https://udemy-web.vercel.app',
    cleartext: true,
  },
};

export default config;
