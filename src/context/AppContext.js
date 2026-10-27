import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { postsApi } from '../api/postsApi';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [avatarUri, setAvatarUri] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'favorites' | 'profile'
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  // Hiển thị thông báo phản hồi (Toast)
  const showToast = useCallback((message, type = 'info') => {
    setToast({ visible: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // 1. Tải dữ liệu ban đầu khi mở app: AsyncStorage (Favorites + Avatar) và API Posts
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);

        // Đọc dữ liệu từ AsyncStorage song song
        const [savedFavorites, savedAvatar] = await Promise.all([
          storageService.getFavorites(),
          storageService.getAvatarUri(),
        ]);

        setFavorites(savedFavorites || []);
        if (savedAvatar) {
          setAvatarUri(savedAvatar);
        }

        // Tải 20 bài viết từ API
        const apiResult = await postsApi.fetchPosts();
        if (apiResult.success) {
          setPosts(apiResult.data);
          if (apiResult.warning) {
            showToast(apiResult.warning, 'info');
          }
        }
      } catch (error) {
        console.error('[AppContext] Lỗi khởi tạo ứng dụng:', error);
        showToast('Có lỗi xảy ra khi khởi tạo dữ liệu.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [showToast]);

  // 2. Thao tác Pull-to-refresh
  const refreshPosts = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const apiResult = await postsApi.fetchPosts();
      if (apiResult.success) {
        setPosts(apiResult.data);
        showToast('Đã làm mới danh sách bài viết!', 'success');
      }
    } catch (error) {
      showToast('Lỗi khi làm mới dữ liệu.', 'error');
    } finally {
      setIsRefreshing(false);
    }
  }, [showToast]);

  // 3. Kiểm tra xem 1 bài viết đã được yêu thích chưa
  const isFavorite = useCallback(
    (postId) => {
      return favorites.some((item) => item.id === postId);
    },
    [favorites]
  );

  // 4. Thao tác Star/Favorite (Thêm hoặc bỏ thích) + Lưu vào AsyncStorage
  const toggleFavorite = useCallback(
    async (post) => {
      try {
        const exists = favorites.some((item) => item.id === post.id);
        let updated;
        if (exists) {
          updated = favorites.filter((item) => item.id !== post.id);
          setFavorites(updated);
          await storageService.saveFavorites(updated);
          showToast(`Đã bỏ bài #${post.id} khỏi yêu thích`, 'info');
        } else {
          updated = [post, ...favorites];
          setFavorites(updated);
          await storageService.saveFavorites(updated);
          showToast(`Đã thêm bài #${post.id} vào mục yêu thích! ⭐`, 'success');
        }
      } catch (error) {
        console.error('[AppContext] Lỗi khi toggle favorite:', error);
        showToast('Không thể lưu trạng thái yêu thích.', 'error');
      }
    },
    [favorites, showToast]
  );

  // 5. Xóa 1 bài viết khỏi mục yêu thích
  const removeFavorite = useCallback(
    async (postId) => {
      try {
        const updated = favorites.filter((item) => item.id !== postId);
        setFavorites(updated);
        await storageService.saveFavorites(updated);
        showToast(`Đã xóa bài viết khỏi mục yêu thích.`, 'info');
      } catch (error) {
        console.error('[AppContext] Lỗi khi remove favorite:', error);
      }
    },
    [favorites, showToast]
  );

  // 6. Xóa tất cả bài viết yêu thích
  const clearAllFavorites = useCallback(async () => {
    try {
      setFavorites([]);
      await storageService.clearAllFavorites();
      showToast('Đã xóa tất cả bài viết yêu thích.', 'info');
    } catch (error) {
      console.error('[AppContext] Lỗi khi clear favorites:', error);
    }
  }, [showToast]);

  // 7. Cập nhật ảnh đại diện Avatar + Lưu vào AsyncStorage
  const updateAvatar = useCallback(
    async (uri) => {
      try {
        setAvatarUri(uri);
        await storageService.saveAvatarUri(uri);
        showToast('Cập nhật ảnh đại diện thành công! 🎉', 'success');
      } catch (error) {
        console.error('[AppContext] Lỗi khi lưu avatar:', error);
        showToast('Không thể lưu ảnh đại diện.', 'error');
      }
    },
    [showToast]
  );

  // 8. Đặt lại ảnh đại diện mặc định
  const removeAvatar = useCallback(async () => {
    try {
      setAvatarUri(null);
      await storageService.removeAvatarUri();
      showToast('Đã đặt lại ảnh đại diện mặc định.', 'info');
    } catch (error) {
      console.error('[AppContext] Lỗi khi xóa avatar:', error);
    }
  }, [showToast]);

  const value = {
    posts,
    favorites,
    avatarUri,
    isLoading,
    isRefreshing,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    toast,
    showToast,
    hideToast,
    refreshPosts,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
    updateAvatar,
    removeAvatar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
