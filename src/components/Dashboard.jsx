import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data from backend when the component mounts!
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/dashboard-data');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get the name of the most recently added user for the greeting
  const latestUser = users.length > 0 ? users[0].name.split(' ')[0] : 'Admin';

  return (
    <div className="flex h-screen bg-[#f4f7f6] font-sans text-gray-800 overflow-hidden">
      
      {/* LEFT SIDEBAR (Static UI from Figma) */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-hidden">
        
        {/* TOP ZONE: Logo and Navigation  */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 px-8 py-6 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full rounded-tl-none"></div>
            <span className="font-bold text-2xl tracking-wide text-gray-900">DIAG</span>
          </div>

          <nav className="px-4 space-y-1 pb-4">
            <div className="flex items-center gap-4 px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium cursor-pointer">
              <span className="text-xl">⌂</span> Dashboard
            </div>
            {[
              { name: 'Report', icon: '📄' },
              { name: 'Analytics', icon: '📈' },
              { name: 'Users', icon: '👥' },
              { name: 'Integrations', icon: '🧩' },
              { name: 'Settings', icon: '⚙️' }
            ].map(link => (
              <div key={link.name} className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <span className="text-xl">{link.icon}</span> {link.name}
              </div>
            ))}
          </nav>
        </div>

        {/* BOTTOM ZONE: Trial Banner  */}
        <div className="p-4 flex-shrink-0 mt-auto bg-white border-t border-gray-50">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm shadow-sm">🎖</div>
            <h4 className="text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">7-day free trial</h4>
            <p className="text-[10px] text-gray-500 mb-3 leading-snug px-1">Enjoy full access to all features. No commitments yet.</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              Choose a Plan
            </button>
          </div>
        </div>
        
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-10">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-medium text-gray-900">Welcome {latestUser}</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Search anything..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm w-64 outline-none focus:border-indigo-600" />
              <span className="absolute left-4 top-2 text-gray-400">🔍</span>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 cursor-pointer">🔔</div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-purple-500 rounded-full text-white flex items-center justify-center font-bold">{latestUser.charAt(0)}</div>
              <span className="font-medium text-gray-700">{latestUser} ⌄</span>
            </div>
          </div>
        </header>

        {/* Top Metrics Cards (Static Data) */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Total Revenue</h3>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">₦24000.00</span>
              <span className="text-sm font-medium text-green-500 mb-1">+20%</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Churned Revenue</h3>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">₦2,000.00</span>
              <span className="text-sm font-medium text-red-500 mb-1">-5%</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Active Users</h3>
            <div className="flex items-end gap-3">
              {/* Dynamically count users if we want! */}
              <span className="text-3xl font-bold text-gray-900">{users.length > 0 ? 400 + users.length : 400}</span>
              <span className="text-sm font-medium text-green-500 mb-1">+20%</span>
            </div>
          </div>
        </div>

        {/* Placeholder for Charts to match layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           
           {/* Mock Bar Chart (Top Performing Plans) */}
           <div className="col-span-2 h-72 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Performing Plans</h3>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full cursor-pointer">This Month ⌄</span>
              </div>
              
              {/* Fake Bars using Tailwind */}
              <div className="flex-grow flex items-end justify-around gap-4 px-4 border-b border-gray-100 pb-2">
                 <div className="w-16 bg-indigo-200 rounded-t-md h-[80%] hover:bg-indigo-300 transition-colors relative group">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Free</span>
                 </div>
                 <div className="w-16 bg-indigo-300 rounded-t-md h-[50%] hover:bg-indigo-400 transition-colors relative group">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Pro</span>
                 </div>
                 <div className="w-16 bg-indigo-400 rounded-t-md h-[30%] hover:bg-indigo-500 transition-colors relative group">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Business</span>
                 </div>
                 <div className="w-16 bg-indigo-500 rounded-t-md h-[40%] hover:bg-indigo-600 transition-colors relative group">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Enterprise</span>
                 </div>
              </div>
              {/* X-Axis Labels */}
              <div className="flex justify-around px-4 pt-3 text-xs text-gray-400 font-medium">
                 <span>Free</span>
                 <span>Pro</span>
                 <span>Business</span>
                 <span>Enterprise</span>
              </div>
           </div>

           {/* Mock Doughnut Chart (User Distribution) */}
           <div className="col-span-1 h-72 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col relative">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">User Distribution</h3>
              
              <div className="flex-grow flex flex-col items-center justify-center">
                 {/* CSS Trick for a Multi-colored Doughnut */}
                 <div className="relative w-36 h-36 rounded-full flex items-center justify-center" 
                      style={{ background: 'conic-gradient(#6366f1 0% 40%, #a855f7 40% 60%, #10b981 60% 80%, #cbd5e1 80% 100%)' }}>
                    {/* The inner white circle that makes it a doughnut */}
                    <div className="absolute w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                       <span className="text-xl font-bold text-gray-900">400</span>
                       <span className="text-[9px] text-gray-400 uppercase tracking-wide">Total Users</span>
                    </div>
                 </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-[#6366f1]"></div>Nigeria (40%)</div>
                 <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-[#a855f7]"></div>UK (20%)</div>
                 <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div>US (20%)</div>
                 <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-[#cbd5e1]"></div>Others (20%)</div>
              </div>
           </div>

        </div>

        {/* DYNAMIC DATA TABLE: Latest Signups */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-medium text-gray-900">Latest Signups</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Plan</th>
                  <th className="py-4 px-6">Joined</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="5" className="py-8 text-center text-gray-500">Loading users...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="5" className="py-8 text-center text-gray-500">No users found. Go do the onboarding!</td></tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span className="font-medium text-gray-900">{user.name || 'Anonymous User'}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">{user.email}</td>
                      <td className="py-4 px-6 text-gray-700 text-sm">{user.plan || 'Free'}</td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                         {/* Format the MongoDB date into "3 days ago" or a readable date */}
                         {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 
                            user.status === 'Trial expire' ? 'bg-red-100 text-red-700' : 
                            'bg-gray-100 text-gray-700'}`}>
                          {user.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}