import React from "react"
import { useState,useEffect } from "react";
import { apiRequest } from "../api.jsx";
import img3 from "../assets/3.png";
import { useNavigate } from "react-router";




function UserDashboard(){
  const navigate=useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const fetchUser = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest(`/diagnostic/user/getUser/${localStorage.getItem("id")}`, "GET", null, token);
      setUser(data)
      console.log(data);
    } catch (err) {
      setError("Failed " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
    return(
        <div>
            <div className="flex flex-row justify-between h-100 mt-0.5">
                <div>
                    <img src={img3} alt="userImage" className="h-75"/>
                </div>
                <div className=" grow-80">
                    <div className="flex flex-col items-center  bg-gradient-to-r from-yellow-300 to-orange-500 rounded-lg ">
                        <h1 className=" rounded-lg h-12 w-100 text-2xl">Personal Details</h1>
                    </div>
                    <div className="flex flex-col text-gray-700 bg-gray-300 ">
                      <span className="text-4xl ml-1">Username: {user.username}</span><br />
                      <span className="text-4xl ml-1">Address : {user.address}</span><br />
                      <span className="text-4xl ml-1">Contact Number: {user.contact} </span><br />
                    </div>
                    <div className="flex flex-row  justify-between items-center ">
                      <button  onClick={()=>{navigate('/bookingList')}}  className=" flex grow-50 bg-red-500 rounded-lg  w-35  py-3 justify-center ml-2">
                        Booking Details
                      </button>
                      <button  onClick={()=>{navigate('/booking')}} className="bg-green-500 flex grow-50 justify-center rounded-lg py-3 w-35   mr-2">
                        Booking
                      </button>
                      <button  onClick={()=>{navigate('/allCenter')}} className="bg-blue-500 flex grow-50 justify-center rounded-lg py-3 w-35   mr-2">
                        All Center
                      </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard