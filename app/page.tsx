'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const unlockContent = async () => {
    setStatus('loading');
    
    try {
      const res = await fetch('/api/premium', { method: 'GET' });
      
      if (res.status === 402) {
        setStatus('error');
        alert('Vui lòng thanh toán x402 để xem nội dung!');
        return;
      }

      const data = await res.json();
      setResult(data);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      alert('Lỗi kết nối');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-900 rounded-3xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-2">🔐 x402 Payment</h1>
        <p className="text-center text-gray-400 mb-8">Thanh toán bằng USDC trên Base</p>

        <div className="bg-gray-800 rounded-2xl p-6 mb-8">
          <p className="text-sm text-gray-400 mb-1">Nội dung Premium</p>
          <p className="text-2xl font-semibold">$0.05 USDC</p>
        </div>

        <button
          onClick={unlockContent}
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-lg font-medium transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Đang xử lý thanh toán...' : 'Mở khóa ngay bằng x402'}
        </button>

        {status === 'success' && result && (
          <div className="mt-6 bg-green-900/30 border border-green-500 p-6 rounded-2xl">
            <h3 className="font-bold text-green-400 mb-3">{result.title}</h3>
            <pre className="text-sm whitespace-pre-wrap">{result.content}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
