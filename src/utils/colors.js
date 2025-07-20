// src/utils/colors.js

// Định nghĩa bảng màu cơ bản của bạn
const BASE_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Màu sắc chủ đạo (Primary)
  primary50: '#EEF2FF',
  primary100: '#E0E7FF',
  primary200: '#C7D2FE',
  primary300: '#A5B4FC',
  primary400: '#818CF8',
  primary500: '#6366F1', // Màu chủ đạo chính
  primary600: '#4F46E5',
  primary700: '#4338CA',
  primary800: '#3730A3',
  primary900: '#312E81',

  // Màu sắc phụ (Accent/Secondary)
  accent50: '#FEE2E2',
  accent100: '#FECACA',
  accent200: '#FCA5A5',
  accent300: '#F87171',
  accent400: '#EF4444',
  accent500: '#DC2626', // Màu phụ chính
  accent600: '#B91C1C',
  accent700: '#991B1B',
  accent800: '#7F1D1D',
  accent900: '#630B0B',

  // Màu trạng thái
  success: '#10B981', // Xanh lá
  warning: '#F59E0B', // Vàng cam
  error: '#EF4444', // Đỏ
  info: '#3B82F6', // Xanh dương
};

// Định nghĩa màu sắc theo ngữ cảnh (Semantic Colors)
// Đây là cách tốt nhất để quản lý màu sắc, vì bạn có thể thay đổi theme
// (ví dụ: dark mode) mà không cần thay đổi từng màu cụ thể trong component.
const COLORS = {
  // Màu nền
  backgroundPrimary: BASE_COLORS.white, // Nền chính của ứng dụng
  backgroundSecondary: BASE_COLORS.gray50, // Nền cho các card, section
  backgroundDark: BASE_COLORS.gray900, // Nền tối (dành cho dark mode)

  // Màu chữ
  textPrimary: BASE_COLORS.gray900, // Chữ chính
  textSecondary: BASE_COLORS.gray600, // Chữ phụ, mô tả
  textInverse: BASE_COLORS.white, // Chữ trên nền tối
  textError: BASE_COLORS.error,
  textSuccess: BASE_COLORS.success,

  // Màu cho các thành phần UI
  buttonPrimary: BASE_COLORS.primary500, // Màu nền nút chính
  buttonPrimaryText: BASE_COLORS.white, // Màu chữ nút chính
  buttonSecondary: BASE_COLORS.gray200, // Màu nền nút phụ
  buttonSecondaryText: BASE_COLORS.gray700, // Màu chữ nút phụ

  inputBorder: BASE_COLORS.gray300,
  inputBackground: BASE_COLORS.white,
  inputText: BASE_COLORS.gray900,

  // Màu đường viền
  borderLight: BASE_COLORS.gray200,
  borderDark: BASE_COLORS.gray700,

  // Màu icon
  iconPrimary: BASE_COLORS.primary600,
  iconSecondary: BASE_COLORS.gray500,

  // Các màu khác tùy theo nhu cầu
  badge: BASE_COLORS.accent500,
  overlay: 'rgba(0,0,0,0.5)',
};

export { BASE_COLORS, COLORS };
