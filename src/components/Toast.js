import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast, hideToast } = useApp();

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);

  if (!toast.visible) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={20} color={colors.success} />;
      case 'error':
        return <Ionicons name="alert-circle" size={20} color={colors.danger} />;
      default:
        return <Ionicons name="information-circle" size={20} color={colors.primary} />;
    }
  };

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.container}
        onPress={hideToast}
        activeOpacity={0.9}
      >
        {getIcon()}
        <Text style={styles.message} numberOfLines={2}>
          {toast.message}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A', // Slate dark banner
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    maxWidth: '90%',
    gap: spacing.sm,
    ...shadows.floating,
    borderWidth: 1,
    borderColor: '#334155',
  },
  message: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
    flexShrink: 1,
  },
});
