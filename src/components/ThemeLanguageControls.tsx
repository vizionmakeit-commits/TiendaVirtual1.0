import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ThemeLanguageControls: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
      {/* Control de Tema */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
        aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-teal-600 hover:text-teal-700 transition-colors" />
        ) : (
          <Sun className="w-5 h-5 text-teal-600 hover:text-teal-700 transition-colors" />
        )}
      </button>

      {/* Control de Idioma */}
      <div className="relative group">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-1"
          aria-label="Cambiar idioma"
          title="Cambiar idioma"
        >
          <Globe className="w-5 h-5 text-teal-600 hover:text-teal-700 transition-colors" />
          <span className="text-xs font-medium text-teal-600 uppercase">
            {language}
          </span>
        </button>

        {/* Dropdown de idiomas */}
        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[100px]">
          <button
            onClick={() => setLanguage('es')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors first:rounded-t-lg ${
              language === 'es' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
            }`}
          >
            🇪🇸 Español
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors last:rounded-b-lg ${
              language === 'en' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
            }`}
          >
            🇺🇸 English
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeLanguageControls;