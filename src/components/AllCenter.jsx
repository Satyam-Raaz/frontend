import React from "react"
import { useState ,useEffect} from "react";
import { apiRequest } from "../api";




function AllCenter(){
    const [centerlist, setCenterlist] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const fetchCenterlist = async () => {
        setLoading(true);
        setError("");
        try {
          const data = await apiRequest("/diagnostic/admin/getAllCenter", "GET", null, token);
          setCenterlist(data);
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
        <>
        <section className='py-16 bg-gray-100 w-full'>
          <h2 className='text-3xl font-bold text-center mb-10 '>All Centers</h2>
          <div className='flex flex-wrap justify-center gap-6 w-full'>
            {centerlist.map((s)=>(
              <div key={s.id} className='bg-white rounded-xl p-6 w-64 flex flex-col items-center'>
                <div className='text-4xl mb-2 text-blue-600'>{s.name}</div>
                <h3 className='font-bold text-xl mb-2'>{s.address}</h3>
                <ul className='font-semibold text-sm list-inside list-disc'>
                  {s.tests.map((f)=>(
                    <li key={f.id}><span className="text-green-600">{f.name}</span><span>{"--"}</span><span className="text-red-500">${f.price}</span></li>

                  ))}
                </ul>
              </div>

            ))}
          </div>
        </section>
        </>
    )
}

export default AllCenter