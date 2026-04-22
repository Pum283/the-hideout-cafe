/**
 * Format giá tiền VND theo chuẩn hiển thị Việt Nam.
 */
export function formatVnd(value: number | undefined) {
  if (typeof value !== 'number') return ''
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(value)
}

