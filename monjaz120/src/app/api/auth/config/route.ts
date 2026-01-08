import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const gid = process.env.GOOGLE_CLIENT_ID || null;
    const msid = process.env.MICROSOFT_CLIENT_ID || null;

    // Additionally check whether the Microsoft provider module is actually available.
    // Use a filesystem check under process.cwd() to avoid static bundler resolution which
    // can cause "Module not found" warnings during build when require.resolve is used.
    const fs = await import('fs');
    const path = await import('path');
    const providersDir = path.join(process.cwd(), 'node_modules', 'next-auth', 'providers');
    const microsoftPaths = [
      path.join(providersDir, 'microsoft.js'),
      path.join(providersDir, 'microsoft.cjs'),
      path.join(providersDir, 'microsoft', 'index.js'),
    ];
    // Also accept the presence of 'azure-ad' provider as an acceptable fallback
    const azurePath = path.join(providersDir, 'azure-ad.js');
    let microsoftModuleAvailable = false;
    try {
      for (const p of microsoftPaths) {
        if (fs.existsSync(p)) {
          microsoftModuleAvailable = true;
          break;
        }
      }
      if (!microsoftModuleAvailable && fs.existsSync(azurePath)) {
        microsoftModuleAvailable = true; // we can use azure-ad as fallback
      }
    } catch (e) {
      microsoftModuleAvailable = false;
    }

    const microsoftConfigured = !!msid && microsoftModuleAvailable;

    return NextResponse.json({
      googleConfigured: !!gid,
      googleHint: gid ? `${gid.slice(0,6)}...` : null,
      microsoftConfigured: microsoftConfigured,
      microsoftHint: msid ? `${msid.slice(0,6)}...` : null,
      microsoftModuleAvailable,
    });
  } catch (e) {
    return NextResponse.json({ googleConfigured: false, microsoftConfigured: false });
  }
}

