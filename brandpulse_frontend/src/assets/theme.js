// Discord Dark Theme for Vuetify
const customDarkTheme = {
    dark: true,
    colors: {
      // Main backgrounds
      background: '#313338',        // Discord main chat background
      surface: '#2B2D31',          // Discord secondary background (sidebars)
      'surface-bright': '#404249',  // Discord hover states
      'surface-light': '#383A40',   // Discord elevated surfaces
      'surface-variant': '#1E1F22', // Discord darkest background
      'on-surface-variant': '#B5BAC1', // Discord muted text
      
      // Primary (Discord Blurple)
      primary: '#5865F2',
      'primary-darken-1': '#4752C4',
      'primary-lighten-1': '#7289DA',
      
      // Secondary/Accent (Vibrant Orange)
      secondary: '#F14A00',
      'secondary-darken-1': '#C13A00',
      
      // Status colors
      error: '#ED4245',            // Discord red
      info: '#00A8FC',            // Discord link blue
      success: '#3BA55D',         // Discord green
      warning: '#FAA81A',         // Discord yellow
      
      // Additional Discord colors
      danger: '#ED4245',
      link: '#00A8FC',
      
      // Text colors
      'on-background': '#DBDEE1',  // Normal text
      'on-surface': '#DBDEE1',     // Normal text on surfaces
      'on-primary': '#FFFFFF',     // Text on primary color
      'on-secondary': '#FFFFFF',   // Text on secondary color
      'on-error': '#FFFFFF',
      'on-info': '#FFFFFF',
      'on-success': '#FFFFFF',
      'on-warning': '#000000',
    },
    variables: {
      'border-color': '#3A3C42',
      'border-opacity': 1,
      'high-emphasis-opacity': 1,
      'medium-emphasis-opacity': 0.70,
      'disabled-opacity': 0.38,
      'idle-opacity': 0.10,
      'hover-opacity': 0.08,
      'focus-opacity': 0.12,
      'selected-opacity': 0.16,
      'activated-opacity': 0.24,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.16,
      
      // Discord-specific variables
      'theme-kbd': '#1E1F22',
      'theme-on-kbd': '#DBDEE1',
      'theme-code': '#1E1F22',
      'theme-on-code': '#DBDEE1',
      
      // Rounded corners (Discord uses subtle rounding)
      'border-radius-root': '4px',
      'border-radius-sm': '2px',
      'border-radius-md': '4px',
      'border-radius-lg': '8px',
      'border-radius-xl': '12px',
      
      // Shadows
      'shadow-key-umbra-opacity': 0.24,
      'shadow-key-penumbra-opacity': 0.16,
      'shadow-key-ambient-opacity': 0.08,
    }
  }
  
  // Discord Light Theme (for users who prefer light mode)
  const customLightTheme = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#F2F3F5',
      'surface-bright': '#FFFFFF',
      'surface-light': '#E3E5E8',
      'surface-variant': '#EBEDEF',
      'on-surface-variant': '#5C5E66',
      
      primary: '#5865F2',
      'primary-darken-1': '#4752C4',
      'primary-lighten-1': '#7289DA',
      
      secondary: '#3BA55D',
      'secondary-darken-1': '#2D7D46',
      
      error: '#D83C3E',
      info: '#0078D4',
      success: '#3BA55D',
      warning: '#FAA81A',
      
      'on-background': '#313338',
      'on-surface': '#313338',
      'on-primary': '#FFFFFF',
      'on-secondary': '#FFFFFF',
      'on-error': '#FFFFFF',
      'on-info': '#FFFFFF',
      'on-success': '#FFFFFF',
      'on-warning': '#000000',
    },
    variables: {
      'border-color': '#E3E5E8',
      'border-opacity': 1,
      'high-emphasis-opacity': 0.87,
      'medium-emphasis-opacity': 0.60,
      'disabled-opacity': 0.38,
      'idle-opacity': 0.04,
      'hover-opacity': 0.04,
      'focus-opacity': 0.12,
      'selected-opacity': 0.08,
      'activated-opacity': 0.12,
      'pressed-opacity': 0.12,
      'dragged-opacity': 0.08,
      
      'theme-kbd': '#F2F3F5',
      'theme-on-kbd': '#313338',
      'theme-code': '#F2F3F5',
      'theme-on-code': '#313338',
      
      'border-radius-root': '4px',
      'border-radius-sm': '2px',
      'border-radius-md': '4px',
      'border-radius-lg': '8px',
      'border-radius-xl': '12px',
    }
  }
  
  // Export for use in main.js or plugin configuration
  export { customDarkTheme, customLightTheme }