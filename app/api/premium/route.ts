import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const payTo = process.env.PAY_TO;
  const network = process.env.NETWORK || 'base';
  const price = process.env.DEFAULT_PRICE || '$0.1';

  // Trả về thông tin yêu cầu thanh toán x402
  return new NextResponse(
    JSON.stringify({
      title: "Nội dung Premium",
      content: `Chúc mừng! Bạn đã thanh toán ${price} USDC thành công qua x402.\n\nĐây là nội dung đặc biệt chỉ người trả phí mới xem được.`,
    }),
    {
      status: 402,  // Quan trọng: Trả về 402 để kích hoạt x402
      headers: {
        'Content-Type': 'application/json',
        'x402-payment-required': JSON.stringify({
          accepts: [{
            scheme: "exact",
            price: price,
            network: network === 'base-sepolia' ? 'eip155:84532' : 'eip155:8453',
            payTo: payTo,
            description: "Mở khóa nội dung premium",
          }]
        })
      }
    }
  );
}
