# Hi there!  Welcome to my DIAG Onboarding Project

Thanks for taking the time to review my technical assessment. I built this full-stack onboarding flow and dashboard to showcase not just my ability to translate Figma to code, but also how I think about user experience and data flow. 

You can test the live application right here:
 **https://obanlogistics-task.vercel.app/**

*(Note: The backend is hosted on a free Render tier, so it might take 30-50 seconds to "wake up" when you first submit the form!)*
🔗 **Backend API URL:** https://oban-backend.onrender.com
🔗 **Backend Source Code:** https://github.com/peter-sp-1/obanlogistics_task_backend

---

###  My Approach & UX Decisions
Instead of just building a static UI, I wanted this to feel like a real production application. Here are a few extra details I implemented:

* **Smart Conditional Routing:** I wanted to reduce friction for solo users. If you select "Just me" for the team size, the app intelligently skips the "Invite Teammates" step entirely and automatically assigns you a "Free" plan in the database.
* **Security & Validation:** I added a client-side check to ensure the "Create Password" and "Confirm Password" fields match before letting the user proceed.
* **Zero-Dependency Charts:** Instead of installing a heavy charting library like Chart.js just to fill the dashboard placeholders, I built custom, fully responsive Bar and Doughnut charts using pure Tailwind CSS and HTML `conic-gradients`. 
* **Seamless Mobile Experience:** I reworked the dashboard layout for mobile devices, converting the fixed sidebar into a sleek slide-out drawer so the data tables and charts stack cleanly on smaller screens.

###  What I Used
* **Frontend:** React.js (Vite) and Tailwind CSS.
* **Backend:** Node.js, Express.js, and MongoDB (Mongoose).
* **State Management:** Handled locally within React components to keep the flow lightweight and fast.

---

###  Want to run it locally?

1. **Clone the repo:** `git clone https://github.com/peter-sp-1/obanlogistics_task`
2. **Install dependencies:** `npm install`
3. **Run the app:** `npm run dev`

*If you are running the backend locally as well, just swap out the Render URL in `Onboarding.jsx` and `Dashboard.jsx` back to `http://localhost:5000`.*

Thanks again for reviewing my work. I really enjoyed building this!
