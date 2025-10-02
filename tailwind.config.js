/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Colores base
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        
        // Superficies
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        
        // Colores primarios
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
        
        // Colores secundarios
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        
        // Colores silenciados
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        
        // Colores de acento
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        
        // Colores destructivos
        destructive: {
          DEFAULT: 'oklch(var(--destructive))',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        
        // Elementos de interfaz
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring))',
        
        // Colores de gráficos
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))',
        },
        
        // Sidebar específico
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar-background))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))',
        },
        
        // Colores semánticos
        success: {
          DEFAULT: 'oklch(var(--success))',
          foreground: 'oklch(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'oklch(var(--warning))',
          foreground: 'oklch(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'oklch(var(--info))',
          foreground: 'oklch(var(--info-foreground))',
        },
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-surface': 'var(--gradient-surface)',
      },
      
      // Sombras personalizadas
      boxShadow: {
        'brand-sm': 'var(--shadow-sm)',
        'brand-md': 'var(--shadow-md)',
        'brand-lg': 'var(--shadow-lg)',
        'brand-xl': 'var(--shadow-xl)',
      },
      
      // Anillos de foco personalizados
      ringColor: {
        'brand': 'var(--focus-ring)',
      },
    },
  },
  plugins: [],
};
