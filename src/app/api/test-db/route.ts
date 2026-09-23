import { NextResponse } from 'next/server';
import net from 'net';

export const dynamic = 'force-dynamic';

export async function GET() {
  const host = '162.241.148.163';
  const port = 3306;

  // 1. Get outbound IP of the Vercel function
  let outboundIp = 'unknown';
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    outboundIp = ipData.ip;
  } catch (e: any) {
    outboundIp = `Error fetching IP: ${e.message}`;
  }

  // 2. Test raw TCP socket to 162.241.148.163:3306
  const tcpResult = await new Promise<{ success: boolean; timeMs: number; error?: string }>((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    socket.setTimeout(8000);

    socket.connect(port, host, () => {
      const timeMs = Date.now() - start;
      socket.destroy();
      resolve({ success: true, timeMs });
    });

    socket.on('timeout', () => {
      const timeMs = Date.now() - start;
      socket.destroy();
      resolve({ success: false, timeMs, error: 'TCP connection timed out after 8000ms (firewall dropped packets)' });
    });

    socket.on('error', (err) => {
      const timeMs = Date.now() - start;
      resolve({ success: false, timeMs, error: `Socket error: ${err.message}` });
    });
  });

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    host,
    port,
    vercelOutboundIp: outboundIp,
    tcpResult,
    diagnosis: tcpResult.success
      ? 'TCP port 3306 is reachable from this Vercel server.'
      : `TCP port 3306 is BLOCKED or DROPPED by host ${host}. In cPanel, go to "Remote MySQL" and add "%" to the access list, and ensure port 3306 is open in the server firewall.`,
  });
}
