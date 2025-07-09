import { useState } from "react";
import { apiRequest } from "./api.jsx";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const  [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await apiRequest("/auth/register", "POST", {
        username,
        password,
        address,
        contactNo,
        role,
      });
      setSuccess("Signup Successful");
      onSignup && onSignup(); //handleSignup()
    } catch (err) {
      setError("Signup failed" + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full border rounded px-3 py-2 bg-white text-gray-900"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded px-3 py-2 bg-white text-gray-900"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full border rounded px-3 py-2 bg-white text-gray-900"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
     <input
        type="number"
        placeholder="Contact Number"
        className="w-full border rounded px-3 py-2 bg-white text-gray-900"
        value={contactNo}
        onChange={(e) => setContactNo(e.target.value)}
        required
      />
      
      <select
        className="w-full border rounded px-3 py-2 bg-white text-gray-900"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
}