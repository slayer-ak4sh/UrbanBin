import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as websocket from '../services/websocket';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [bins, setBins] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [wsConnected, setWsConnected] = useState(false);

  const [selectedBin, setSelectedBin] = useState(null);

  const selectBin = useCallback((bin) => {
    setSelectedBin((prev) => (prev?.id === bin?.id ? null : bin));
  }, []);

  const clearSelectedBin = useCallback(() => setSelectedBin(null), []);

  useEffect(() => {
    if (isAuthenticated && token) {
      const shouldConnect = import.meta.env.VITE_ENABLE_WS !== 'false';
      
      if (!shouldConnect) {
        console.log('WebSocket disabled in development');
        return;
      }
      
      websocket.connect(
        token,
        () => {
          setWsConnected(true);
          
          websocket.subscribe('/topic/bins', (data) => {
            setBins(data);
          });
          
          websocket.subscribe('/topic/alerts', (data) => {
            setAlerts(prev => [data, ...prev].slice(0, 50));
          });
          
          websocket.subscribe('/topic/analytics', (data) => {
            setAnalytics(data);
          });
        },
        (error) => {
          console.error('WebSocket connection error:', error);
          setWsConnected(false);
        }
      );

      return () => {
        websocket.disconnect();
        setWsConnected(false);
      };
    }
  }, [isAuthenticated, token]);

  const value = {
    bins,
    setBins,
    alerts,
    setAlerts,
    analytics,
    setAnalytics,
    wsConnected,
    selectedBin,
    selectBin,
    clearSelectedBin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
