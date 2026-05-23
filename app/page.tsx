const unlockContent = async () => {
  setStatus('loading');
  
  try {
    const response = await fetch('/api/premium', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Nếu server trả về 402 → x402 sẽ tự động trigger ví
    if (response.status === 402) {
      const data = await response.json();
      console.log("x402 request:", data);
      // Không cần làm gì thêm, trình duyệt + ví sẽ xử lý
      return;
    }

    if (response.ok) {
      const data = await response.json();
      setResult(data);
      setStatus('success');
    }
  } catch (error) {
    console.error(error);
    setStatus('error');
    alert('Có lỗi xảy ra. Vui lòng thử lại.');
  }
};
