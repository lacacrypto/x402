import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const payTo = process.env.PAY_TO;
  const price = process.env.DEFAULT_PRICE || '$0.1';
  const network = process.env.NETWORK || 'base';

  const networkId = network === 'base-sepolia' ? 'eip155:84532' : 'eip155:8453';

  // Header x402 chuẩn
  return new NextResponse(
    JSON.stringify({
      error: "Payment required",
      message: `Thanh toán ${price} USDC để xem nội dung premium`
    }),
    {
      status: 402,
      headers: {
        'Content-Type': 'application/json',
        'x402-payment-required': JSON.stringify({
          accepts: [
            {
              scheme: "exact",
              price: price,
              network: networkId,
              payTo: payTo,
              description: "Mở khóa nội dung premium trên Base",
              mimeType: "application/json"
            }
          ]
        })
      }
    }
  );
}
