export const colors = {
  primary: '#4F46E5',        // Royal Indigo
  primaryDark: '#3730A3',
  primaryLight: '#EEF2FF',
  primaryBorder: '#C7D2FE',
  
  secondary: '#06B6D4',      // Cyan accent
  secondaryLight: '#ECFEFF',
  
  star: '#F59E0B',           // Amber Gold for favorite
  starLight: '#FEF3C7',
  
  danger: '#EF4444',         // Red
  dangerLight: '#FEE2E2',
  dangerDark: '#B91C1C',
  
  success: '#10B981',        // Green
  successLight: '#D1FAE5',
  
  background: '#F8FAFC',     // Clean slate bg
  surface: '#FFFFFF',        // Card white
  surfaceAlt: '#F1F5F9',
  
  text: '#0F172A',           // Dark slate text
  textSecondary: '#475569',  // Medium slate
  textMuted: '#94A3B8',      // Light muted text
  
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  
  shadow: 'rgba(15, 23, 42, 0.08)',
  shadowElevated: 'rgba(79, 70, 229, 0.15)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  floating: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
};
