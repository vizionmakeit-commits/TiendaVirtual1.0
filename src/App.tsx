import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ThemeLanguageControls from './components/ThemeLanguageControls';
import MarketplacePage from './components/MarketplacePage';
import StorefrontPage from './components/StorefrontPage';

function App() {
  const [selectedSubdomain, setSelectedSubdomain] = useState<string | null>(null);

  const handleBusinessSelect = (subdomain: string) => {
    setSelectedSubdomain(subdomain);
  };

  const handleBackToMarketplace = () => {
    setSelectedSubdomain(null);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ThemeLanguageControls />
        {selectedSubdomain ? (
          <StorefrontPage 
            subdomain={selectedSubdomain}
            onBackToMarketplace={handleBackToMarketplace}
          />
        ) : (
          <MarketplacePage onBusinessSelect={handleBusinessSelect} />
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;