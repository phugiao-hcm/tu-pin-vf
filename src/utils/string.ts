// utils/string.ts
export function toSlug(str: string): string {
  return str
    .normalize('NFD') // tách dấu
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .replace(/[^a-zA-Z0-9\s]/g, '') // bỏ ký tự đặc biệt (chỉ giữ chữ + số)
    .trim() // bỏ khoảng trắng 2 đầu
    .replace(/\s+/g, '-') // thay khoảng trắng = gạch ngang
    .toLowerCase() // viết thường
}
