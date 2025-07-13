import {  useState,useEffect, useRef } from "react";
import React from "react";
import { apiRequest } from "../api";

function Booking(){
    const [testName, setTestName] = useState("Endoscopy");
    const [centerName, setCenterName] = useState("Uinque Clinic");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token=localStorage.getItem("token"); 
    const [list,setList]=useState([]);
    const [imageUrl,setImageUrl]=useState(null);
    const fileInputRef=useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
          await apiRequest(`/diagnostic/user/booking/${localStorage.getItem("id")}`, "POST", {testName,centerName,imageUrl}, token);          
        } catch (err) {
          setError("Failed " + err.message);
        }
    };

    const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageUrl(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please select a valid image file');
    }
  };

    const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

    


    const fetchCenterlist = async () => {
          setLoading(true);
          setError("");
            try {
              const data = await apiRequest("/diagnostic/user/getAllCenter", "GET", null, token);
              setList(data);
              console.log(data);
            } catch (err) {
              setError("Failed " + err.message);
            }
            setLoading(false);
        };
    
    useEffect(() => {
      fetchCenterlist();
    }, []);    
    
    
    


    return(
      <div>
        <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <span className='text-2xl'>🩺</span>
            <span className='front-bold text-xl'>Diagnostic Tests PlaceOrder</span>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="space-y-4 m-2">
      <select
        className="w-full border rounded px-3 py-2 bg-white text-gray-900"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
      >
      {list.map((center) => (
        <div key={center.id}>
          {center.tests.map((f)=>(
          <option key={f.id} value={f.name}>
            {f.name}
          </option>
        ))}
        </div>
      ))}

      </select>
    <select
        className="w-full border rounded px-3 py-2 bg-white text-gray-900"
        value={centerName}
        onChange={(e) => setCenterName(e.target.value)}
      >
      {list.map((center) => (
        <div key={center.id}>
          <option  value={center.name} >
            {center.name}
          </option>
        </div>
      ))}
    </select>

    <input
      className="w-full border rounded px-3 py-2 bg-white text-gray-900"
      type="file"
      accept="image/*"
      onChange={handleFileInput}
    />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Book Now
      </button>
    </form>
      </div>
    );
}

export default Booking