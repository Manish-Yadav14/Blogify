import React, { useState } from 'react'
import axios from 'axios';


function Profile() {
    const [name,setName] = useState("");
    const [slug,setSlug] = useState("");
    const [linkedin,setLinkedin] = useState("");
    const [twitter,setTwitter] = useState("");
    const [bio,setBio] = useState("");

    const handleProfileUpdation = async (e)=>{
      e.preventDefault(); 
      try {
        const token = localStorage.getItem('token');
        const tokenRes = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/authenticate`, { token });
        const res = await axios.post(`${import.meta.env.VITE_BACKEND}/blogs/updateProfile`,{email:tokenRes?.data?.email,fullName:name,slug,linkedin,twitter,bio});
        if(res.status ===200){
          alert('Profile Updated Sucessfully');
          console.log("Profile Updated Sucessfully",res.data.slug);
          setName('');
          setSlug(res.data.slug);
          setLinkedin('');
          setTwitter('');
          setBio('');
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className='px-4 mt-2 w-1/2'>
        <h1 className='p-1 text-xl font-semibold'>Profile</h1>
        <form action="/" method="POST" className="mt-2  overflow-y-auto overscroll-y-auto " style={{scrollbarWidth:'none'}}>
            <div className="space-y-5 w-full">
              <div>
                  <div className="flex my-2">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 pl-1"
                    >
                      {" "}
                      Name{" "}
                    </label>
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Name"
                    required
                  ></input>
              </div>
              
              <div>
                <div className="flex flex-col items-start justify-start ">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 pl-1"
                  >
                    {" "}
                    Slug{" "}
                  </label>
                  <p
                    href="#"
                    title=""
                    className="text-xs text-gray-500 py-1 pl-1"
                  >
                    {" "}
                    Your site will go live on blog.btw.so{" "}
                  </p>
                </div>
                <div className="mt-2">
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Slug"
                    required
                  ></input>
                </div>
              </div>
              
              <div>
                <div className="flex my-2">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 pl-1"
                  >
                    {" "}
                    Linkedin{" "}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Linkedin"
                  ></input>
                </div>
              </div>

              <div>
                <div className="flex my-2">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 pl-1"
                  >
                    {" "}
                    Twitter{" "}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Twitter"
                  ></input>
                </div>
              </div>

              <div>
                <div className="flex my-2">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 pl-1"
                  >
                    {" "}
                    Bio{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="flex h-20 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Bio"
                  ></textarea>
                </div>
              </div>

              {/* <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Slug{" "}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Slug"
                  ></input>
                </div>
              </div> */}

              <div>
                <button
                  onClick={handleProfileUpdation}
                  type="submit"
                  className="mb-3 w-[80px] inline-flex items-center justify-center rounded-md bg-black p-2 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Save 
                </button>
              </div>

            </div>
          </form>
    </div>
  )
}

export default Profile