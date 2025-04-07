export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  card: {
    background: string;
    shadow: string;
    shadowHover: string;
  };
}

export interface Typography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    none: number;
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Spacing {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  64: string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface Theme {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Default theme
export const defaultTheme: Theme = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#f5f5f5',
    accent: '#3b82f6',
    background: '#ffffff',
    text: {
      primary: '#1a1a1a',
      secondary: '#4b5563',
      muted: '#6b7280',
    },
    card: {
      background: '#ffffff',
      shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      shadowHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    64: '16rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

// Dark theme variant
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    primary: '#f5f5f5',
    secondary: '#1a1a1a',
    accent: '#60a5fa',
    background: '#121212',
    text: {
      primary: '#f5f5f5',
      secondary: '#d1d5db',
      muted: '#9ca3af',
    },
    card: {
      background: '#1e1e1e',
      shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
      shadowHover: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
    },
  },
};

// Current active theme
export const activeTheme = defaultTheme; 