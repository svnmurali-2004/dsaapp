// src/Profile.js
import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../AuthService"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import {useLoader} from "../context/LoaderContext"
function Profile() {
  const { login, setLogin } = useLogin();
  const {loader,loaderdispatcher}=useLoader()
    const [user, setUser] = useState({
        name: "",
        email: "",
        picture: "",
        createdAt: {},
        updatedAt: {},
        badges: [],
        solved: [],
        verified: false,
    });
    const navigate=useNavigate()
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = AuthService.gettoken();
                console.log(token);
                loaderdispatcher({type:"FETCH_STARTED",payload:"fetchstarted"})
                const response = await axios.post(`${process.env.baseurl}/api/actions/profile`, {}, {
                    headers: { token }
                });
                loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetchended"})
                if (response.data.ok) {
                    const temp = { ...user, ...response.data.userdata };
                    console.log(temp);
                    setUser(temp);
                    console.log(response.data);
                } else {
                    console.log(response.data.msg);
                }
            } catch (err) {
                loaderdispatcher({type:"FETCH_ERROR",payload:"fetcherror"})
                console.log(err);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => { console.log(user); console.log(user.picture); }, [user]);

    const handleLogout = () => {
        AuthService.logout(); // Assuming this method clears the token
        setLogin(false);
        navigate("/"); // Redirect to login page or home page
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center space-x-4">
                    {user.picture ? (
                        <img
                            className="w-16 h-16 rounded-full"
                            src={`${user.picture}`}
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
                <div className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
