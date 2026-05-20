import { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard'; // Import our new component

function App() {
  const [isDashboard, setIsDashboard] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar - Only show if we are NOT on the dashboard */}
      {!isDashboard && (
        <header className="px-8 py-4 bg-white flex items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full rounded-tl-none"></div>
            <span className="font-bold text-xl tracking-wide">DIAG</span>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main>
        {isDashboard ? (
           <Dashboard />
        ) : (
           <Onboarding onComplete={() => setIsDashboard(true)} />
        )}
      </main>
    </div>
  );
}

export default App;