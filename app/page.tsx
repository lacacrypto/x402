'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('idle');

  const unlockContent = () => {
    setStatus('loading');
    // Trigger mạnh nhất cho x402
    window.location.href = '/api/premium';
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-900 rounded-3xl p-10 text-center border border-gray-700">
        <h1 className="text-4xl font-bold mb-2">🔐 x402 Payment</h1>
        <p className="text-gray-400 mb-8">Thanh toán USDC trên Base</p>
        
        <div className="bg-gray-800 rounded-2xl p-6 mb-8">
          <p className="text-gray-400">Nội dung Premium</p>
          <p className="text-4xl font-bold text-green-400 mt-1">$0.1 USDC</p>
        </div>

        <button
          onClick={unlockContent}
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl text-xl font-medium disabled:opacity-50"
        >
          {status === 'loading' ? 'Đang mở ví...' : 'Mở khóa ngay bằng x402'}
        </button>
      </div>
    </div>
  );
}
