import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@lab05_favorites';
const AVATAR_STORAGE_KEY = '@lab05_avatar_uri';

export const storageService = {
  /**
   * Lấy danh sách các bài viết yêu thích từ AsyncStorage
   */
  async getFavorites() {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (jsonValue != null) {
        const parsed = JSON.parse(jsonValue);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (e) {
      console.error('[storageService] Lỗi khi đọc favorites từ AsyncStorage:', e);
      return [];
    }
  },

  /**
   * Lưu danh sách các bài viết yêu thích vào AsyncStorage
   */
  async saveFavorites(favorites) {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, jsonValue);
      return true;
    } catch (e) {
      console.error('[storageService] Lỗi khi lưu favorites vào AsyncStorage:', e);
      return false;
    }
  },

  /**
   * Thêm 1 bài viết vào danh sách yêu thích
   */
  async addFavorite(post) {
    try {
      const current = await this.getFavorites();
      const exists = current.some((item) => item.id === post.id);
      if (!exists) {
        const updated = [post, ...current];
        await this.saveFavorites(updated);
        return updated;
      }
      return current;
    } catch (e) {
      console.error('[storageService] Lỗi khi thêm favorite:', e);
      return [];
    }
  },

  /**
   * Xóa 1 bài viết khỏi danh sách yêu thích bằng ID
   */
  async removeFavorite(postId) {
    try {
      const current = await this.getFavorites();
      const updated = current.filter((item) => item.id !== postId);
      await this.saveFavorites(updated);
      return updated;
    } catch (e) {
      console.error('[storageService] Lỗi khi xóa favorite:', e);
      return [];
    }
  },

  /**
   * Xóa toàn bộ danh sách bài viết yêu thích
   */
  async clearAllFavorites() {
    try {
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
      return [];
    } catch (e) {
      console.error('[storageService] Lỗi khi xóa tất cả favorites:', e);
      return [];
    }
  },

  /**
   * Lấy URI của ảnh đại diện từ AsyncStorage
   */
  async getAvatarUri() {
    try {
      const uri = await AsyncStorage.getItem(AVATAR_STORAGE_KEY);
      return uri || null;
    } catch (e) {
      console.error('[storageService] Lỗi khi đọc avatar URI từ AsyncStorage:', e);
      return null;
    }
  },

  /**
   * Lưu URI ảnh đại diện vào AsyncStorage
   */
  async saveAvatarUri(uri) {
    try {
      if (uri) {
        await AsyncStorage.setItem(AVATAR_STORAGE_KEY, uri);
      } else {
        await AsyncStorage.removeItem(AVATAR_STORAGE_KEY);
      }
      return true;
    } catch (e) {
      console.error('[storageService] Lỗi khi lưu avatar URI vào AsyncStorage:', e);
      return false;
    }
  },

  /**
   * Xóa ảnh đại diện khỏi AsyncStorage
   */
  async removeAvatarUri() {
    try {
      await AsyncStorage.removeItem(AVATAR_STORAGE_KEY);
      return true;
    } catch (e) {
      console.error('[storageService] Lỗi khi xóa avatar URI:', e);
      return false;
    }
  },
};
