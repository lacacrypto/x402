import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const payTo = process.env.PAY_TO;
  const price = process.env.DEFAULT_PRICE || '$0.1';
  const chainId = 'eip155:8453'; // Base Mainnet

  return new NextResponse(
    JSON.stringify({ message: "Payment Required" }),
    {
      status: 402,
      headers: {
        'Content-Type': 'application/json',
        'x402-payment-required': JSON.stringify({
          accepts: [{
            scheme: "exact",
            price: price,
            network: chainId,
            payTo: payTo,
            description: "Unlock premium content",
          }]
        })
      }
    }
  );
}
