import { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', password: '',
    name: '', role: '', teamSize: 'Just me',
    workspaceName: '', invitedEmails: '',
    focus: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // The function that sends our data to the backend!
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          invitedEmails: formData.invitedEmails.split(',').map(email => email.trim()).filter(e => e)
        })
      });

      if (response.ok) {
        onComplete(); 
      } else {
        // If it fails, read the error from the backend and alert us!
        const errorData = await response.json();
        alert("Backend Error: " + errorData.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Network Error: Could not reach the backend at localhost:5000.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
      
      {/* LEFT SIDEBAR: Progress Tracker */}
      <div className="md:col-span-4 pl-4 mt-8">
        <h1 className="text-4xl font-medium mb-4 text-gray-900">Let's get you set up in<br/>just 4 steps</h1>
        <p className="text-gray-500 mb-12 text-sm leading-relaxed pr-8">
          We'll keep it short and simple, just what we need to personalize your experience.
        </p>

        {/* REVISED DYNAMIC STEPPER UI */}
        <div className="relative space-y-8">
          {/* Background gray line */}
          <div className="absolute left-[15px] top-4 h-[12rem] w-[2px] bg-gray-200 z-0"></div>
          
          {/* Dynamic filled indigo line ( 4rem per step) */}
          <div 
            className="absolute left-[15px] top-4 w-[2px] bg-indigo-600 z-0 transition-all duration-500 ease-in-out" 
            style={{ height: `${(step - 1) * 4}rem` }}
          ></div>

          {['Create Your Account', 'Tell Us About You', 'Set Up Your Workspace', 'Choose Your Focus'].map((title, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div key={index} className="relative flex items-center gap-4 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300
                  ${isActive || isCompleted ? 'bg-indigo-600 text-white border-none' : 'bg-white text-gray-400 border border-gray-300'}`}>
                  {stepNumber}
                </div>
                <span className={`text-sm transition-colors duration-300 ${isActive || isCompleted ? 'text-indigo-600 font-medium' : 'text-gray-400'}`}>
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE: Dynamic Form Container */}
      <div className="md:col-span-8 bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 min-h-[600px] flex flex-col">
        
        {/* STEP 1: CREATE ACCOUNT */}
        {step === 1 && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">Let's start with the basics</h2>
              <span className="text-gray-400 font-medium">1/4</span>
            </div>
            <div className="space-y-5 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your email address" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Create password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Create your password" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
            </div>
            <div className="mt-8">
              <button onClick={nextStep} className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Create Account</button>
            </div>
          </div>
        )}

        {/* STEP 2: TELL US ABOUT YOU */}
        {step === 2 && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">Who's joining us?</h2>
              <span className="text-gray-400 font-medium">2/4</span>
            </div>
            <div className="space-y-6 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What should we call you?</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Peter Samuel" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What's your role?</label>
                <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="e.g., DevOps Engineer" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={prevStep} className="px-6 py-3.5 border border-gray-300 rounded-lg font-medium">Back</button>
              <button onClick={nextStep} className="flex-1 bg-indigo-600 text-white py-3.5 rounded-lg font-medium">Continue</button>
            </div>
          </div>
        )}

        {/* STEP 3: WORKSPACE */}
        {step === 3 && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">Create your workspace</h2>
              <span className="text-gray-400 font-medium">3/4</span>
            </div>
            <p className="text-gray-500 mb-8">Name your workspace and invite teammates. You can always add more later.</p>
            <div className="space-y-6 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What's the name of your workspace?</label>
                <input type="text" name="workspaceName" value={formData.workspaceName} onChange={handleInputChange} placeholder="e.g., Alpha Base" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invite teammates by email</label>
                <textarea name="invitedEmails" value={formData.invitedEmails} onChange={handleInputChange} placeholder="e.g., opeolu@gmail.com, jane@doe.com, temi12@gmail.com (separate with commas)" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all resize-none h-24" />
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={prevStep} className="px-6 py-3.5 border border-gray-300 rounded-lg font-medium">Back</button>
              <button onClick={nextStep} className="flex-1 bg-indigo-600 text-white py-3.5 rounded-lg font-medium">Continue</button>
            </div>
          </div>
        )}

        {/* STEP 4: FOCUS */}
        {step === 4 && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">What do you want to achieve?</h2>
              <span className="text-gray-400 font-medium">4/4</span>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {['Manage projects or tasks', 'Collaborate with my team', 'Track performance or KPIs', 'Design workflows or systems', 'Just exploring for now'].map(focusType => (
                <label key={focusType} className={`border p-4 rounded-lg cursor-pointer transition-all ${formData.focus === focusType ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                  <input type="radio" name="focus" value={focusType} checked={formData.focus === focusType} onChange={handleInputChange} className="hidden" />
                  <span className={`block font-medium text-sm ${formData.focus === focusType ? 'text-indigo-800' : 'text-gray-700'}`}>{focusType}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={prevStep} className="px-6 py-3.5 border border-gray-300 rounded-lg font-medium">Back</button>
              <button onClick={handleSubmit} className="flex-1 bg-indigo-600 text-white py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Finish Onboarding</button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}