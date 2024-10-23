import React ,{useEffect, useState} from "react";
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {FaTwitter,FaLinkedin,FaGithub} from 'react-icons/fa'
import axios from "axios";
import { Outlet } from "react-router-dom";


function Blogs() {
  const {slug} = useParams();
  const [validSlug, setValidSlug] = useState(false);
  const [loading,setLoading] = useState(true);
  const [fullName,setFullName] = useState("");
  const [linkedin,setLinkedin] = useState("");    
  const [twitter,setTwitter] = useState("");
  const [data,setData] = useState("");


  const checkSlug = async () => {
    try {
        const token = localStorage.getItem('token');
        const tokenRes = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/authenticate`, { token });
        const res = await axios.post(`${import.meta.env.VITE_BACKEND}/auth//getUserInfo`, {
          email:tokenRes?.data?.email,
        });
        if (res.status === 200){
            // console.log(res.data);
            setData(res.data);
            setFullName(res.data.fullName);
            setLinkedin(res.data.linkedin);
            setTwitter(res.data.twitter);
          if (res.data.slug == slug) {
            setValidSlug(true);
        }
        setLoading(false);
        }
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(()=>{
    checkSlug();
  },[slug])


  if(loading){
    return<div>Loading...</div>
  }

  else if (validSlug) {
    return(
        <>
            <div className="p-2  h-[100vh] flex">
                <aside className="w-1/4 h-full border-r-2">
                    <div className="m-4 p-6 mt-8">
                        <div className="flex flex-col m-1 p-1">
                            <h1 className="text-2xl font-bold font-mono">{fullName}</h1>
                            <Link to={`/${slug}`} className="hover:underline cursor-pointer">Articles</Link>
                            <Link to={`/${slug}/about`} className="hover:underline cursor-pointer">About</Link>
                        </div>

                        <div className="flex">
                            <Link to={twitter} target="blank" className="m-1 text-xl" ><FaTwitter/></Link>
                            <Link to={linkedin} target="blank"  className="m-1 text-xl" ><FaLinkedin/></Link>
                            <Link to="https://github.com" target="blank" className="m-1 text-xl" ><FaGithub/> </Link>
                        </div>

                    </div>
                </aside>

                <div>
                    <Outlet context={data}/>
                </div>
            </div>
        </>
    )
  }

   return <div>This Slug is not registered or valid</div>;
}

export default Blogs;
