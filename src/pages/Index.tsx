
import { useEffect, useState } from 'react';
import Map from '../components/Map';
import Navbar from '../components/Navbar';
import QRButton from '../components/QRButton';
import Analytics from '../components/Analytics';

const Index = () => {
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [showBusStops, setShowBusStops] = useState(false);
  const [showBuses, setShowBuses] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Add mobile viewport meta for better mobile display
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    return () => {
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const openAnalytics = () => {
    setShowAnalytics(true);
  };

  return (
    <div className="h-screen w-screen overflow-hidden mobile-app">
      <div className="relative h-full w-full">
        <Map 
          navbarExpanded={navbarExpanded} 
          showBusStops={showBusStops} 
          showBuses={showBuses} 
        />

        <QRButton />

        <Navbar 
          expanded={navbarExpanded} 
          onToggle={toggleNavbar} 
          onShowBusStops={setShowBusStops}
          onShowBuses={setShowBuses}
          onOpenAnalytics={openAnalytics}
        />

        <Analytics 
          isOpen={showAnalytics} 
          onClose={() => setShowAnalytics(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
