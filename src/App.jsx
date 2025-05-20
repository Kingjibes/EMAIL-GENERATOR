import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import EmailGeneratorPage from '@/pages/EmailGeneratorPage';

    function App() {
      return (
        <>
          <Routes>
            <Route path="/" element={<EmailGeneratorPage />} />
          </Routes>
          <Toaster />
        </>
      );
    }

    export default App;
