import React, { useState } from 'react';
import { StoreProvider } from './store';
import { LanguageProvider } from './i18n/LanguageContext';
import { Layout } from './components/Layout';
import { MySpace } from './views/MySpace';
import { PublicLibrary } from './views/PublicLibrary';
import { ProfileView } from './views/Profile';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'myspace' | 'library' | 'profile'>('myspace');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      <div className="w-full h-full animate-in fade-in duration-500">
        {currentView === 'myspace' && <MySpace />}
        {currentView === 'library' && <PublicLibrary />}
        {currentView === 'profile' && <ProfileView />}
      </div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </LanguageProvider>
  );
};

export default App;