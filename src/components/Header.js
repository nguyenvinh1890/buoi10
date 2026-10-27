import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function Header({ title, subtitle }) {
  const { avatarUri, activeTab, setActiveTab, favorites } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.rightSection}>
        {/* Badge số lượng yêu thích */}
        <TouchableOpacity
          style={[styles.badgeBtn, activeTab === 'favorites' && styles.badgeBtnActive]}
          onPress={() => setActiveTab('favorites')}
          activeOpacity={0.7}
        >
          <Ionicons
            name={favorites.length > 0 ? 'star' : 'star-outline'}
            size={18}
            color={favorites.length > 0 ? colors.star : colors.textMuted}
          />
          <Text style={[styles.badgeText, favorites.length > 0 && styles.badgeTextActive]}>
            {favorites.length}
          </Text>
        </TouchableOpacity>

        {/* Nút Avatar nhỏ dẫn đến màn hình Profile */}
        <TouchableOpacity
          style={[styles.avatarWrapper, activeTab === 'profile' && styles.avatarWrapperActive]}
          onPress={() => setActiveTab('profile')}
          activeOpacity={0.8}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={18} color={colors.primary} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 14,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.card,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  badgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeBtnActive: {
    backgroundColor: colors.starLight,
    borderColor: colors.star,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  badgeTextActive: {
    color: '#B45309',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarWrapperActive: {
    borderColor: colors.primary,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
