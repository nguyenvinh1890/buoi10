import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from './src/context/AppContext';
import Header from './src/components/Header';
import BottomTabBar from './src/components/BottomTabBar';
import Toast from './src/components/Toast';
import PostsScreen from './src/screens/PostsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { colors } from './src/styles/theme';

function MainNavigator() {
  const { activeTab } = useApp();

  // Đổi tiêu đề Header theo Tab hiện tại
  const getHeaderDetails = () => {
    switch (activeTab) {
      case 'favorites':
        return {
          title: '⭐ Mục yêu thích',
          subtitle: 'Danh sách bài viết được lưu trữ trong AsyncStorage',
        };
      case 'profile':
        return {
          title: '👤 Cá nhân & Avatar',
          subtitle: 'Tùy chỉnh ảnh đại diện với Image Picker',
        };
      case 'posts':
      default:
        return {
          title: '📰 Danh sách bài viết',
          subtitle: 'Tải 20 bài viết từ JSONPlaceholder API',
        };
    }
  };

  const headerDetails = getHeaderDetails();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor={colors.surface} />
      
      {/* Toast thông báo nổi */}
      <Toast />

      {/* Header đỉnh màn hình */}
      <Header
        title={headerDetails.title}
        subtitle={headerDetails.subtitle}
      />

      {/* Nội dung màn hình theo Tab */}
      <View style={styles.screenContainer}>
        {activeTab === 'posts' && <PostsScreen />}
        {activeTab === 'favorites' && <FavoritesScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </View>

      {/* Bottom Navigation Tab Bar */}
      <BottomTabBar />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainNavigator />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
