import { useState, useEffect } from 'react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState('1a'); 
  
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '',
    name: '', role: '', teamSize: 'Just me',
    workspaceName: '', invitedEmails: '',
    focus: '', plan: 'Free' 
  });

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (step === 1 && subStep === '1b' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, step, subStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Specialized handler for Team Size to automatically assign the billing plan
  const handleTeamSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      teamSize: size,
      plan: size === 'Just me' ? 'Free' : 'Premium'
    }));
  };

  const handleCreateAccount = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please check and try again!");
      return;
    }
    if (formData.password.length < 6) {
      alert("Please enter a password of at least 6 characters.");
      return;
    }
    setSubStep('1b'); // If everything is good, move to verification!
  };

  const handleDigitChange = (index, value) => {
    if (value.length > 1) return; 
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value !== '' && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  // Navigation logic for Step 3 based on team size selection
  const handleStep3aContinue = () => {
    if (formData.teamSize === 'Just me') {
      setStep(4); // Skip invites if solo
    } else {
      setSubStep('3b'); // Show invites if team
    }
  };

  const handleBackFromStep4 = () => {
    if (formData.teamSize === 'Just me') {
      setStep(3);
      setSubStep('3a');
    } else {
      setStep(3);
      setSubStep('3b');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://oban-backend.onrender.com/api/users/onboarding', {
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
        const errorData = await response.json();
        alert("Backend Error: " + errorData.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Network Error: Could not reach the backend at https://oban-backend.onrender.com.");
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

        <div className="relative space-y-8">
          <div className="absolute left-[15px] top-4 h-[12rem] w-[2px] bg-gray-200 z-0"></div>
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
        
        {/* STEP 1a: CREATE ACCOUNT */}
        {step === 1 && subStep === '1a' && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">Let's start with the basics</h2>
              <span className="text-gray-400 font-medium">1/4</span>
            </div>
            <p className="text-gray-500 mb-8">Enter your email and set a secure password. This helps us keep your account safe and ready for future logins.</p>

            <div className="space-y-5 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your email address" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Create password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Create your password" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
            </div>

            <div className="mt-8">
              <button onClick={handleCreateAccount} className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Create Account
              </button>
              
              <div className="text-center mt-4 text-sm text-gray-500">
                Already have an account? <span onClick={onComplete} className="text-indigo-600 font-medium cursor-pointer hover:underline">Log in</span>
              </div>
              
              <div className="relative flex items-center py-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* MOCK GOOGLE AUTH: Skips directly to Step 2 */}
              <button onClick={() => setStep(2)} className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with google
              </button>
            </div>
          </div>
        )}

        {/* STEP 1b: VERIFY EMAIL */}
        {step === 1 && subStep === '1b' && (
          <div className="flex flex-col h-full animate-fade-in">
            <button onClick={() => setSubStep('1a')} className="text-gray-500 flex items-center gap-2 mb-8 hover:text-gray-800 transition-colors w-fit">
              <span>‹</span> Back
            </button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-medium text-gray-900">Verify Email address</h2>
              <span className="text-gray-400 font-medium">1/4</span>
            </div>
            <p className="text-gray-500 mb-8">A six digit verification code has been sent to your email address, enter it here to verify your account</p>
            <div className="flex gap-4 mb-4 justify-center">
              {verificationCode.map((digit, index) => (
                <input key={index} id={`digit-${index}`} type="text" maxLength="1" value={digit} onChange={(e) => handleDigitChange(index, e.target.value)} className="w-14 h-14 text-center text-2xl font-medium border border-gray-200 rounded-lg outline-none focus:border-indigo-600 transition-all" />
              ))}
            </div>
            <div className="text-right text-sm text-gray-500 mb-8 pr-4">
              Didn't get Code? <span className={`font-medium ${countdown === 0 ? 'text-indigo-600 cursor-pointer' : 'text-gray-400'}`}>
                {countdown === 0 ? 'Resend now' : `Resend code in ${countdown} sec`}
              </span>
            </div>
            <div className="mt-auto">
              <button onClick={() => setStep(2)} className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Verify</button>
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
            <p className="text-gray-500 mb-8">We'd love to know your name and role so we can tailor the experience to how you work best, whether you are solo or with a team.</p>
            <div className="space-y-6 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What should we call you?</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="eg., Opeyemi Sam" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What's your role?</label>
                <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="eg., DevOps Developer" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Are you working solo or with a team?</label>
                <div className="space-y-4">
                  {['Just me', '2–10 teammates', '11–50 teammates', '50+ teammates'].map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="radio" name="teamSize" value={size} checked={formData.teamSize === size} onChange={() => handleTeamSizeChange(size)} className="peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-indigo-600 cursor-pointer" />
                        <div className="absolute w-3 h-3 bg-indigo-600 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className="text-gray-700">{size}</span>
                      {size !== 'Just me' && <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full ml-auto">Premium</span>}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={() => { setStep(1); setSubStep('1b'); }} className="px-6 py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={() => { setStep(3); setSubStep('3a'); }} className="flex-1 bg-indigo-600 text-white py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Continue</button>
            </div>
          </div>
        )}

        {/* STEP 3a: WORKSPACE NAME */}
        {step === 3 && subStep === '3a' && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">Create your workspace</h2>
              <span className="text-gray-400 font-medium">3/4</span>
            </div>
            <p className="text-gray-500 mb-8">Name your workspace to keep things organized.</p>
            <div className="space-y-6 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What's the name of your workspace?</label>
                <input type="text" name="workspaceName" value={formData.workspaceName} onChange={handleInputChange} placeholder="eg., Alpha Hub" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all" />
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={() => setStep(2)} className="px-6 py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={handleStep3aContinue} className="flex-1 bg-indigo-600 text-white py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Continue</button>
            </div>
          </div>
        )}

        {/* STEP 3b: INVITE TEAMMATES (Only shown if teamSize !== 'Just me') */}
        {step === 3 && subStep === '3b' && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-medium text-gray-900">Invite teammates by email</h2>
              <span className="text-gray-400 font-medium">3/4</span>
            </div>
            <p className="text-gray-500 mb-8">Add their email addresses so they can join your workspace right away.</p>
            <div className="space-y-6 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Email Address?</label>
                <textarea name="invitedEmails" value={formData.invitedEmails} onChange={handleInputChange} placeholder="eg., pete@gmail.com, john@jane.com (separate with commas)" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-600 transition-all resize-none h-32" />
              </div>
            </div>
            <div className="mt-8 flex gap-4 items-center">
              <button onClick={() => setSubStep('3a')} className="px-6 py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={() => setStep(4)} className="px-6 py-3.5 text-indigo-600 font-medium hover:underline ml-auto">Skip for later</button>
              <button onClick={() => setStep(4)} className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Continue</button>
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
            <p className="text-gray-500 mb-8">Choose a use case so we can recommend the right tools and templates to get you started faster. You can always change this later.</p>
            
            <div className="grid grid-cols-2 gap-4 flex-grow content-start">
              {[
                { name: 'Manage projects or tasks', icon: '📋' },
                { name: 'Collaborate with my team', icon: '💬' },
                { name: 'Track performance or KPIs', icon: '📈' },
                { name: 'Design workflows or systems', icon: '⚙️' },
                { name: 'Just exploring for now', icon: '👀' }
              ].map(focusItem => (
                <label key={focusItem.name} className={`border p-5 rounded-xl cursor-pointer transition-all ${formData.focus === focusItem.name ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-gray-200 hover:border-indigo-300'}`}>
                  <input type="radio" name="focus" value={focusItem.name} checked={formData.focus === focusItem.name} onChange={handleInputChange} className="hidden" />
                  <div className="text-2xl mb-2">{focusItem.icon}</div>
                  <span className={`block font-medium text-sm ${formData.focus === focusItem.name ? 'text-indigo-800' : 'text-gray-700'}`}>{focusItem.name}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-8 flex items-center gap-4 pt-4 border-t border-gray-100">
              <button onClick={handleBackFromStep4} className="px-6 py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={handleSubmit} className="px-4 py-3.5 text-indigo-600 font-medium hover:underline ml-auto">Skip for later</button>
              <button onClick={handleSubmit} className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">Finish Onboarding</button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}