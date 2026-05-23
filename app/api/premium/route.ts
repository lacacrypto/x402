import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const payTo = process.env.PAY_TO;
  const price = process.env.DEFAULT_PRICE || '$0.1';
  const network = process.env.NETWORK || 'base';

  const chainId = network === 'base-sepolia' ? 'eip155:84532' : 'eip155:8453';

  return new NextResponse(
    JSON.stringify({
      title: "Noi dung Premium",
      content: `Chuc mung! Ban da thanh toan ${price} USDC thanh cong qua x402.\n\nDay la noi dung dac biet chi nguoi tra phi moi xem duoc.`
    }),
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
            description: "Mo khoa noi dung premium",
          }]
        })
      }
    }
  );
}
