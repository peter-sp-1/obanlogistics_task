import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from your backend when the component mounts!
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
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between h-full">
        <div>
          {/* Fake Logo */}
          <div className="flex items-center gap-3 px-8 py-6 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full rounded-tl-none"></div>
            <span className="font-bold text-2xl tracking-wide text-gray-900">DIAG</span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-2">
            <div className="flex items-center gap-4 px-4 py-3 text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600 font-medium cursor-pointer">
              <span className="text-xl">⌂</span> Dashboard
            </div>
            {['Report', 'Analytics', 'Users', 'Integrations', 'Settings'].map(link => (
              <div key={link} className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <span className="text-xl">📊</span> {link}
              </div>
            ))}
          </nav>
        </div>

        {/* Free Trial Banner */}
        <div className="m-6 p-5 bg-gray-50 border border-gray-100 rounded-xl text-center">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">🎖</div>
          <h4 className="font-bold text-gray-900 mb-2">You're on a 7-day free trial</h4>
          <p className="text-xs text-gray-500 mb-4">Enjoy full access to all features. No limits, no commitments yet.</p>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Choose a Plan</button>
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
        <div className="grid grid-cols-3 gap-6 mb-8">
           <div className="col-span-2 h-64 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">
              [Charts Placeholder - Static UI]
           </div>
           <div className="col-span-1 h-64 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">
              [Doughnut Chart Placeholder]
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