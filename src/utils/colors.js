// Bảng màu cơ bản
const BASE_COLORS = {
  white: '#FFFFFF',
  black: '#000000',

  // Các sắc độ xám
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

  // ✅ 4 màu chính dùng trong toàn bộ UI
  success: '#10B981', // Xanh lá – màu chính
  warning: '#F59E0B', // Vàng cam – màu phụ
  error: '#EF4444', // Đỏ – badge / alert
  info: '#3B82F6', // Xanh dương – icon
};

// Màu ngữ nghĩa dùng trong app
const COLORS = {
  // Nền
  backgroundPrimary: BASE_COLORS.white,
  backgroundSecondary: BASE_COLORS.gray200,
  backgroundDark: BASE_COLORS.gray900,
  backgroundWhite: BASE_COLORS.white,

  // Chữ
  textPrimary: BASE_COLORS.gray900,
  textSecondary: BASE_COLORS.gray600,
  textInverse: BASE_COLORS.white,
  textError: BASE_COLORS.error,
  textSuccess: BASE_COLORS.success,

  // ✅ Màu nút chính và phụ
  buttonPrimary: BASE_COLORS.success, // ✅ Xanh lá (primary)
  buttonPrimaryText: BASE_COLORS.white,

  buttonSecondary: BASE_COLORS.warning, // ✅ Vàng cam (secondary)
  buttonSecondaryText: BASE_COLORS.black,

  // Input
  inputBorder: BASE_COLORS.gray300,
  inputBackground: BASE_COLORS.white,
  inputText: BASE_COLORS.gray900,

  // Viền
  borderLight: BASE_COLORS.gray200,
  borderDark: BASE_COLORS.gray700,

  // ✅ Icon chính dùng màu xanh info
  iconPrimary: BASE_COLORS.info,
  iconSecondary: BASE_COLORS.gray500,

  // ✅ Badge màu đỏ (error)
  badge: BASE_COLORS.error,

  // Overlay
  overlay: 'rgba(0,0,0,0.5)',
};

export { BASE_COLORS, COLORS };
