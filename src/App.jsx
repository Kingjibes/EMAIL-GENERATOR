import React from 'react';
    import { Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import EmailGeneratorPage from '@/pages/EmailGeneratorPage';

    function App() {
      return (
        <>
          <Routes>
            <Route path="/" element={<EmailGeneratorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </>
      );
    }

    export default App;
