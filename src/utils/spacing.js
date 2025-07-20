// src/utils/spacing.js

// Định nghĩa một hệ thống khoảng cách dựa trên bội số của một số cơ sở (ví dụ: 4 hoặc 8)
// Ở đây, chúng ta sẽ dùng 4 làm cơ sở để có nhiều mức độ chi tiết hơn.

const SPACING = {
  // Rất nhỏ
  xxs: 2, // 0.5 * 4
  xs: 4, // 1 * 4

  // Nhỏ
  s: 8, // 2 * 4

  // Trung bình
  m: 12, // 3 * 4 (giá trị bạn đã hỏi, rất phổ biến!)
  l: 16, // 4 * 4 (phổ biến cho padding màn hình)

  // Lớn
  xl: 20, // 5 * 4
  xxl: 24, // 6 * 4

  // Rất lớn
  xxxl: 32, // 8 * 4
  xxxxl: 40, // 10 * 4
  xxxxxl: 48, // 12 * 4

  // Các giá trị đặc biệt khác nếu cần (ví dụ: cho header, footer)
  headerHeight: 56,
  tabBarHeight: 60,
};

// Bạn có thể xuất ra một hàm tiện ích nếu muốn tính toán khoảng cách động
// Ví dụ: getSpacing(2) sẽ trả về 8 (2 * SPACING.xs)
const getSpacing = (multiplier = 1, base = SPACING.xs) => base * multiplier;

export { SPACING, getSpacing };
