import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const payTo = process.env.PAY_TO || '';

  return new NextResponse(
    JSON.stringify({ message: "Payment Required" }),
    {
      status: 402,
      headers: {
        'Content-Type': 'application/json',
        'x402-payment-required': JSON.stringify({
          accepts: [{
            scheme: "exact",
            price: "$0.1",
            network: "eip155:8453",
            payTo: payTo,
            description: "Unlock premium content"
          }]
        })
      }
    }
  );
}
