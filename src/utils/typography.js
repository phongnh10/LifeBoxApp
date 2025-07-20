// src/utils/typography.js

const FONT_SIZES = {
  display: 48, // Rất lớn, cho các điểm nhấn đặc biệt
  h1: 36, // Tiêu đề lớn nhất
  h2: 28, // Tiêu đề cấp 2
  h3: 24, // Tiêu đề cấp 3 (thường dùng cho tiêu đề màn hình)
  h4: 20, // Tiêu đề cấp 4 (tiêu đề card, section)
  bodyLarge: 18, // Nội dung chính lớn
  bodyRegular: 16, // Nội dung chính mặc định (rất quan trọng)
  bodySmall: 14, // Nội dung phụ, chú thích, thông tin nhỏ
  caption: 12, // Chú thích rất nhỏ
  button: 16, // Chữ trên nút bấm (thường bằng bodyRegular)
};

const FONT_WEIGHTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

// Bạn cũng có thể định nghĩa khoảng cách dòng (lineHeight)
const LINE_HEIGHTS = {
  body: 24, // khoảng 1.5 lần fontsize cho bodyRegular 16px
  heading: 32,
};

export { FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS };
