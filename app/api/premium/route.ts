import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const payTo = process.env.PAY_TO;
  const price = process.env.DEFAULT_PRICE || '$0.05';

  // x402 middleware sẽ tự xử lý
  return NextResponse.json({
    title: "✅ Nội dung Premium",
    content: `Chúc mừng! Bạn đã thanh toán ${price} USDC thành công qua x402.\n\nĐây là nội dung đặc biệt chỉ người trả phí mới xem được.\n\nThời gian: ${new Date().toLocaleString('vi-VN')}`,
  });
}
