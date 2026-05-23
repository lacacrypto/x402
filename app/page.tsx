'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const unlockContent = async () => {
    setStatus('loading');

    try {
      const response = await fetch('/api/premium', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 402) {
        // x402 sẽ tự động mở popup ví
        console.log('x402 Payment Required - Ví sẽ mở');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setStatus('success');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      alert('Lỗi kết nối. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-gray-900 rounded-3xl p-8 border border-gray-700 text-center">
          <h1 className="text-3xl font-bold mb-2">🔐 x402 Payment</h1>
          <p className="text-gray-400 mb-8">Thanh toán USDC trên Base</p>

          <div className="bg-gray-800 rounded-2xl p-6 mb-8">
            <p className="text-gray-400">Nội dung Premium</p>
            <p className="text-3xl font-bold text-green-400 mt-1">$0.1 USDC</p>
          </div>

          <button
            onClick={unlockContent}
            disabled={status === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-lg font-medium transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Đang xử lý...' : 'Mở khóa ngay bằng x402'}
          </button>

          {status === 'success' && result && (
            <div className="mt-6 bg-green-900/50 border border-green-500 p-6 rounded-2xl text-left">
              <h3 className="font-bold text-green-400 mb-3">{result.title}</h3>
              <pre className="text-sm whitespace-pre-wrap text-gray-300">{result.content}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
