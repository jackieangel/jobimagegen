import { createClient, LemonSqueezy } from '@lemonsqueezy/lemonsqueezy.js';

// Initialize Lemon Squeezy with your API key
const ls: LemonSqueezy = createClient('YOUR_API_KEY');

interface ExportLog {
  lastExport: number;
  count: number;
}

const EXPORTS_PER_WEEK = 1;
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const checkExportLimit = async (): Promise<boolean> => {
  try {
    // Get the license key from localStorage
    const licenseKey = localStorage.getItem('lemonSqueezyLicense');
    if (!licenseKey) {
      throw new Error('No license key found');
    }

    // Validate license with Lemon Squeezy
    const response = await ls.getLicenseKey(licenseKey);
    if (response.statusCode !== 200 || response.error) {
      throw new Error('Invalid license');
    }

    // Check local storage for export logs
    const storedLog = localStorage.getItem('exportLog');
    const now = Date.now();
    let exportLog: ExportLog;

    if (storedLog) {
      exportLog = JSON.parse(storedLog);
      // Reset count if a week has passed
      if (now - exportLog.lastExport > WEEK_IN_MS) {
        exportLog = { lastExport: now, count: 0 };
      }
    } else {
      exportLog = { lastExport: now, count: 0 };
    }

    // Check if user has exceeded weekly limit
    if (exportLog.count >= EXPORTS_PER_WEEK) {
      return false;
    }

    // Update export log
    exportLog.count += 1;
    exportLog.lastExport = now;
    localStorage.setItem('exportLog', JSON.stringify(exportLog));

    return true;
  } catch (error) {
    console.error('License validation error:', error);
    return false;
  }
}