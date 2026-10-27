import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function BottomTabBar() {
  const { activeTab, setActiveTab, favorites, avatarUri } = useApp();

  const tabs = [
    {
      key: 'posts',
      label: 'Bài viết',
      icon: 'document-text',
      iconOutline: 'document-text-outline',
    },
    {
      key: 'favorites',
      label: 'Yêu thích',
      icon: 'star',
      iconOutline: 'star-outline',
      badge: favorites.length,
    },
    {
      key: 'profile',
      label: 'Tài khoản',
      icon: 'person',
      iconOutline: 'person-outline',
      hasAvatar: true,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {tab.hasAvatar && avatarUri ? (
                <View
                  style={[
                    styles.miniAvatarWrapper,
                    isActive && styles.miniAvatarWrapperActive,
                  ]}
                >
                  <Image source={{ uri: avatarUri }} style={styles.miniAvatar} />
                </View>
              ) : (
                <Ionicons
                  name={isActive ? tab.icon : tab.iconOutline}
                  size={24}
                  color={isActive ? colors.primary : colors.textMuted}
                />
              )}

              {/* Badge số lượng cho tab Yêu thích */}
              {tab.badge !== undefined && tab.badge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </Text>
                </View>
              ) : null}
            </View>

            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {tab.label}
            </Text>

            {isActive ? <View style={styles.activePill} /> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    ...shadows.floating,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  tabItemActive: {},
  iconContainer: {
    position: 'relative',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabLabelInactive: {
    color: colors.textMuted,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: colors.star,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  miniAvatarWrapper: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderDark,
  },
  miniAvatarWrapperActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  miniAvatar: {
    width: '100%',
    height: '100%',
  },
  activePill: {
    position: 'absolute',
    bottom: -6,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
