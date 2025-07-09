import { useState,useEffect } from 'react'
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import Login from './Login';
import Signup from './Signup';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
    const [role, setRole] = useState(
    localStorage.getItem("role")?.toLowerCase() || "guest"
  );
  const [currentPage, setCurrentPage] = useState("home");

  const handleSignup = () => {
    setAuthMode("login");
  };

  const handleLogin = (data) => {
    setRole(data.role.toLowerCase());
    setShowAuth(false);
    setCurrentPage(data.role.toLowerCase());
  };

  const handleLogout = () => {
    setRole("guest");
    setCurrentPage("home");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
  };

    useEffect(() => {
    if (role === "user") setCurrentPage("user");
    else if (role === "admin") setCurrentPage("admin");
    else setCurrentPage("home");
  }, [role]);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-screen">
      {/*Header*/}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <span className='text-2xl'>🩺</span>
            <span className='front-bold text-xl'>Diagnostic Center PlaceOrder</span>
          </div>
          <div>
            {role === "guest" ? (
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
                onClick={() => setShowAuth(true)}
              >
                Login/Signup
              </button>
            ) : (
              <button
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            </div>
        </div>
      </header>

      <main className="flex-1 w-full overflow-y-auto">
        {currentPage === "user" ? (
          <UserDashboard />
        ) : currentPage === "admin" ? (
          <AdminDashboard />
        ) : (
          <>
          <section className="py-16 w-full bg-gray-100 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-1 flex flex-col justify-center items-start max-w-xl px-6">
            <h2 className="text-4xl font-bold mb-2 text-gray-900">
              Get Quick Book ,<br />
              <span className="inline-block border-b-4 border-yellow-400 pb-1">
                Low fares
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 mt-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id consequatur rerum placeat amet quia ullam consequuntur, laboriosam non quod quos dolore dicta molestiae, incidunt, eos explicabo ab natus dignissimos aut.
            </p>
            <button className='bg-gray-900 text-white font-semibold px-8 py-3 rounded flex items-center gap-2 hover:bg-gray-800 transition'>
              Login to Booking  a Test<span className='ml-2' ></span>
            </button>
          </div>
          <div className="flex-1 flex justify-center items-center max-w-lg px-6">
            <img src={img1} alt="Services" className="rounded-2xl object-cover w-full h-80" />
          </div>
        </section>

        {/* About section  */}
        <section className='py-16 w-full bg-white flex flex-col md:flex-row items-center justify-center gap-12'>
          <div className='flex-1 flex justify-center items-center max-w-lg px-6 order-1 md:order-none'>
            <img src={img2} alt="safety For All" className='rounded-2xl object-cover w-full h-80'/>
          </div>
          <div className='flex-1 flex flex-col justify-center items-start max-w-xl px-6 order-2 md:order-none'>
            <h1 className='text-4xl font-bold mb-4 text-gray-400'>
              Save Your Life
              <div className='text-xl text-gray-700 mb-4'></div>
            </h1>
            <p className='text-xl text-gray-700 mb-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde consequuntur repudiandae nulla adipisci laborum. Sint itaque iusto, quam cum quaerat nemo recusandae quod quis, esse quae impedit voluptates cumque cupiditate.
            </p>
            <a href="#" 
            className='text-blue-700 text-lg font-semibold hover:underline flex items-center'
            >Know More <span className='ml-1'>&gt;</span>
            </a>
          </div>
        </section>


          </>
        )}

      </main>

      {showAuth && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 '>
          <div className='bg-white rounded-xl p-8 w-full max-w-md relative'>
            <h2 className='text-2xl font-bold mb-4'>
              {authMode ==="login"? "Login":"Sign Up"}
            </h2>
            <div className='flex gap-2 mb-4'>
              <button className={`flex-1 py-2 rounded ${
                authMode === "login"? "bg-blue-600 text-white":"bg-gray-200 text-gray-900"
              }`}
              onClick={()=>setAuthMode("login")}>Login
              </button>
              <button className={`flex-1 py-2 rounded ${
                authMode==="signup"?"bg-blue-600 text-white":"bg-gray-200 text-gray-900"
              }`}
              onClick={()=>setAuthMode("signup")}>Sign Up
              </button>
            </div>
            {authMode === "login" ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Signup onSignup={handleSignup} />
            )}<button className='absolute top-2 right-2 text-gray-900 bg-white rounded-full w-8 h-8 flex items-center justify-center text-2xl'
            onClick={()=>setShowAuth(false)}>X
              
            </button>

          </div>
        </div>
      )}
      

      <footer className='bg-gray-900 text-white py-4 text-center mt-auto '>
        &copy; 2025 DiagnosticCenter. All rights reserved.
      </footer>

    </div>
  )
}

export default App
