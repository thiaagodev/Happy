import React from 'react';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import Routes from './routes/index.routes';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>   
  );
}

export default App;
