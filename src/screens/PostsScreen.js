import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';

export default function PostsScreen() {
  const {
    posts,
    favorites,
    isLoading,
    isRefreshing,
    refreshPosts,
    isFavorite,
    toggleFavorite,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'favorites' | 'unfavorited'

  // Lọc và tìm kiếm bài viết
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.id.toString().includes(searchQuery);

      if (!matchSearch) return false;

      if (filterMode === 'favorites') {
        return isFavorite(post.id);
      }
      if (filterMode === 'unfavorited') {
        return !isFavorite(post.id);
      }
      return true;
    });
  }, [posts, searchQuery, filterMode, isFavorite]);

  // Header của FlatList: Thanh tìm kiếm & bộ lọc
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm bài viết theo tiêu đề hoặc #ID..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, filterMode === 'all' && styles.filterChipActive]}
          onPress={() => setFilterMode('all')}
        >
          <Text
            style={[
              styles.filterChipText,
              filterMode === 'all' && styles.filterChipTextActive,
            ]}
          >
            Tất cả ({posts.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filterMode === 'favorites' && styles.filterChipActive,
          ]}
          onPress={() => setFilterMode('favorites')}
        >
          <Ionicons
            name="star"
            size={12}
            color={filterMode === 'favorites' ? '#FFFFFF' : colors.star}
          />
          <Text
            style={[
              styles.filterChipText,
              filterMode === 'favorites' && styles.filterChipTextActive,
            ]}
          >
            Đã thích ({favorites.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filterMode === 'unfavorited' && styles.filterChipActive,
          ]}
          onPress={() => setFilterMode('unfavorited')}
        >
          <Text
            style={[
              styles.filterChipText,
              filterMode === 'unfavorited' && styles.filterChipTextActive,
            ]}
          >
            Chưa thích ({Math.max(0, posts.length - favorites.length)})
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.counterRow}>
        <Text style={styles.counterText}>
          Hiển thị <Text style={styles.bold}>{filteredPosts.length}</Text> / {posts.length} bài viết từ Public API
        </Text>
        {isRefreshing ? (
          <Text style={styles.syncingText}>Đang cập nhật...</Text>
        ) : (
          <TouchableOpacity onPress={refreshPosts} style={styles.refreshIconBtn}>
            <Ionicons name="reload" size={14} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Đang tải 20 bài viết từ API...</Text>
        <Text style={styles.subLoadingText}>https://jsonplaceholder.typicode.com/posts</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
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
            icon="search-outline"
            title="Không tìm thấy bài viết"
            description={
              searchQuery
                ? `Không có bài viết nào khớp với từ khóa "${searchQuery}".`
                : 'Hiện tại chưa có bài viết nào trong danh mục này.'
            }
            buttonText={searchQuery ? 'Xóa từ khóa tìm kiếm' : 'Xem tất cả 20 bài viết'}
            onButtonPress={() => {
              setSearchQuery('');
              setFilterMode('all');
            }}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshPosts}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  subLoadingText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  headerContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.card,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginBottom: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingHorizontal: 2,
  },
  counterText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bold: {
    fontWeight: '700',
    color: colors.primary,
  },
  syncingText: {
    fontSize: 11,
    color: colors.primary,
    fontStyle: 'italic',
  },
  refreshIconBtn: {
    padding: 4,
  },
});
