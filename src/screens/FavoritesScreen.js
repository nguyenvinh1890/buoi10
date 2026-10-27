import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';

export default function FavoritesScreen() {
  const {
    favorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    setActiveTab,
  } = useApp();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClearAll = () => {
    setShowConfirmModal(false);
    clearAllFavorites();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerInfo}>
        <View style={styles.starIconWrapper}>
          <Ionicons name="star" size={20} color={colors.star} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Bài viết đã lưu</Text>
          <Text style={styles.headerSubtitle}>
            Tự động đồng bộ cục bộ bằng AsyncStorage ({favorites.length} bài)
          </Text>
        </View>
      </View>

      {favorites.length > 0 ? (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => setShowConfirmModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={14} color={colors.danger} />
          <Text style={styles.clearBtnText}>Xóa tất cả</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => `fav-${item.id}`}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            icon="star-outline"
            title="Chưa có bài viết yêu thích nào"
            description="Bạn có thể đánh dấu sao (⭐) bất kỳ bài viết nào ở màn hình Danh sách để lưu trữ vào AsyncStorage."
            buttonText="Khám phá 20 bài viết ngay"
            onButtonPress={() => setActiveTab('posts')}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal xác nhận xóa tất cả bài viết yêu thích */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="alert-circle" size={36} color={colors.danger} />
            </View>

            <Text style={styles.modalTitle}>Xác nhận xóa tất cả?</Text>
            <Text style={styles.modalDescription}>
              Bạn có chắc chắn muốn xóa toàn bộ {favorites.length} bài viết khỏi danh sách yêu thích và bộ nhớ AsyncStorage không?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.cancelBtnText}>Hủy bỏ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteConfirmBtn}
                onPress={handleClearAll}
              >
                <Text style={styles.deleteConfirmBtnText}>Xác nhận xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  starIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.starLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.dangerLight,
    gap: 4,
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.danger,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    ...shadows.floating,
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  modalDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  deleteConfirmBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.danger,
    alignItems: 'center',
  },
  deleteConfirmBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
