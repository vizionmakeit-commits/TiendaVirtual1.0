import React from 'react';
import { useState } from 'react';
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
    <>
      {selectedSubdomain ? (
        <StorefrontPage 
          subdomain={selectedSubdomain}
          onBackToMarketplace={handleBackToMarketplace}
        />
      ) : (
        <MarketplacePage onBusinessSelect={handleBusinessSelect} />
      )}
    </>
  );
}

export default App;