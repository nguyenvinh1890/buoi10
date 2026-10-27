import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';

function PostCard({ post, isFavorite, onToggleFavorite }) {
  // Viết hoa chữ cái đầu cho tiêu đề
  const formattedTitle = post.title
    ? post.title.charAt(0).toUpperCase() + post.title.slice(1)
    : '';

  return (
    <View style={[styles.card, isFavorite && styles.cardFavorited]}>
      {/* Hàng trên cùng: Badge ID, tác giả và nút Star */}
      <View style={styles.topRow}>
        <View style={styles.badgeGroup}>
          <View style={styles.idBadge}>
            <Text style={styles.idBadgeText}>#{post.id}</Text>
          </View>
          <View style={styles.authorBadge}>
            <Ionicons name="person-circle-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.authorBadgeText}>Tác giả #{post.userId}</Text>
          </View>
        </View>

        {/* Nút bấm Star/Favorite */}
        <TouchableOpacity
          style={[styles.favoriteBtn, isFavorite && styles.favoriteBtnActive]}
          onPress={() => onToggleFavorite(post)}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={22}
            color={isFavorite ? colors.star : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Tiêu đề bài viết */}
      <Text style={styles.title} numberOfLines={2}>
        {formattedTitle}
      </Text>

      {/* Nội dung bài viết */}
      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>

      {/* Hàng dưới cùng: Trạng thái & hành động */}
      <View style={styles.bottomRow}>
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isFavorite ? colors.star : colors.borderDark },
            ]}
          />
          <Text style={[styles.statusText, isFavorite && styles.statusTextFavorited]}>
            {isFavorite ? 'Đã lưu trong Yêu thích' : 'Chưa lưu'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.actionTag, isFavorite ? styles.actionTagFavorited : styles.actionTagDefault]}
          onPress={() => onToggleFavorite(post)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? 'checkmark-circle' : 'add-circle-outline'}
            size={14}
            color={isFavorite ? '#B45309' : colors.primary}
          />
          <Text style={[styles.actionTagText, isFavorite ? styles.actionTagTextFavorited : styles.actionTagTextDefault]}>
            {isFavorite ? 'Bỏ thích' : 'Lưu bài'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(PostCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardFavorited: {
    borderColor: colors.primaryBorder,
    backgroundColor: '#FAF5FF', // Subtle warm highlight
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  idBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  idBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  authorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    gap: 4,
  },
  authorBadgeText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  favoriteBtn: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  favoriteBtnActive: {
    backgroundColor: colors.starLight,
    borderColor: '#FDE68A',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
    marginBottom: 6,
  },
  body: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  statusTextFavorited: {
    color: '#B45309',
    fontWeight: '600',
  },
  actionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  actionTagDefault: {
    backgroundColor: colors.primaryLight,
  },
  actionTagFavorited: {
    backgroundColor: colors.starLight,
  },
  actionTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionTagTextDefault: {
    color: colors.primary,
  },
  actionTagTextFavorited: {
    color: '#B45309',
  },
});
