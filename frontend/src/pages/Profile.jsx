// src/Profile.js
import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../AuthService";
// const user = {
//   _id: { $oid: "66710afea9d20783b2836e0a" },
//   name: "murali",
//   email: "lambda@gmail.com",
//   password: "1718684414051",
//   solved: [],
//   badges: [],
//   verified: true,
//   picture: "",
//   createdAt: { $date: "2024-06-18T04:20:14.064Z" },
//   updatedAt: { $date: "2024-06-18T04:20:14.064Z" },
//   __v: 0,
// };

function Profile() {
    const [user,setUser]=useState({
        name:"",
        email:"",
        picture:"",
        createdAt:{},
        updatedAt:{},
        badges:[],
        solved:[],
        verified:false,

    })
    useEffect(()=>{
        const anonymous=async()=>{
            try{
                console.log(AuthService.gettoken())
            const respo=await axios.post(`${process.env.baseurl}/api/actions/profile`,{},{headers:{token:AuthService.gettoken()}})
                if(respo.data.ok){
                    const temp={...user,...respo.data.userdata}
                    console.log(temp)
                    setUser(temp)
                    console.log(respo.data)
                }else{
                    console.log(respo.data.msg)
                }
            }catch(err){
                console.log(err)
            }
        

        }
        anonymous()
        
    },[])

    useEffect(()=>{console.log(user)},[user])
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center space-x-4">
          {user.picture ? (
            <img
              className="w-16 h-16 rounded-full"
              src={user.picture}
              alt="Profile"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.verified && (
              <span className="text-green-500 text-sm font-semibold">Verified</span>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
          <ul className="mt-2 text-gray-600">
            <li>
              <strong>Created At:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </li>
            <li>
              <strong>Updated At:</strong>{" "}
              {new Date(user.updatedAt).toLocaleDateString()}
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Badges</h2>
          <ul className="mt-2 text-gray-600">
            {user.badges.length > 0 ? (
              user.badges.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))
            ) : (
              <li>No badges earned yet.</li>
            )}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Solved Problems</h2>
          <ul className="mt-2 text-gray-600">
            {user.solved.length > 0 ? (
              <li>{user.solved.length} Problems Solved</li>
            ) : (
              <li>No problems solved yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
