import React from 'react';
import { StatusBar, View, Text, Platform, StyleSheet } from 'react-native';
// Nếu bạn muốn xử lý Safe Area một cách tổng quát cho mọi màn hình, bạn có thể import SafeAreaView
// import { SafeAreaView } from 'react-native';

// Định nghĩa các kiểu của StatusBarStyle để giúp code dễ đọc và tránh lỗi chính tả
// (Tùy chọn: nếu bạn dùng TypeScript, sẽ là các kiểu 'light-content' | 'dark-content' | 'default')
const STATUS_BAR_STYLES = {
  light: 'light-content',
  dark: 'dark-content',
  default: 'default',
};

// Component CustomStatusBar của bạn
const CustomStatusBar = ({
  backgroundColor, // Màu nền của StatusBar (chỉ áp dụng cho Android nếu translucent=false)
  barStyle = STATUS_BAR_STYLES.dark, // Màu của nội dung trên StatusBar: 'light-content', 'dark-content', 'default'
  translucent = false, // true: Status bar trong suốt, nội dung ứng dụng kéo dài ra sau nó
  // false: Status bar có màu nền, nội dung ứng dụng bắt đầu dưới nó
  // (Phổ biến hơn cho Android để điều khiển màu nền)
  hidden = false, // Ẩn hay hiện StatusBar
  // Bạn có thể thêm các props khác của StatusBar nếu cần
}) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar
        animated={true} // Hoạt ảnh chuyển đổi style/màu
        backgroundColor={backgroundColor} // Màu nền (chỉ Android)
        barStyle={barStyle} // Kiểu chữ/icon trên Status bar (iOS & Android)
        translucent={translucent} // Trong suốt hay không (iOS & Android)
        hidden={hidden} // Ẩn/hiện (iOS & Android)
      />
      {/* Phần Text "LightStatusBar" không liên quan trực tiếp đến việc điều khiển StatusBar API.
        Nếu bạn muốn hiển thị một cái gì đó bên dưới StatusBar và trong vùng an toàn,
        bạn sẽ đặt nó trong một component màn hình, được bọc bởi SafeAreaView.
        Component CustomStatusBar này chỉ nên tập trung vào việc cấu hình thanh trạng thái.
      */}
      {/* Ví dụ: Nếu bạn muốn một thanh header giả lập StatusBar trên Android khi translucent=true */}
      {/* {Platform.OS === 'android' && translucent && (
        <View style={{ height: StatusBar.currentHeight, backgroundColor: backgroundColor }} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    // Đối với iOS, StatusBar component tự xử lý vị trí.
    // Đối với Android, nếu `translucent` là `true`, bạn có thể cần một View có `height: StatusBar.currentHeight`
    // để đẩy nội dung xuống. Nhưng thường thì `StatusBar` tự xử lý tốt.
  },
});

export default CustomStatusBar;
