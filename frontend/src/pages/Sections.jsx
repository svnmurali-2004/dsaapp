import {useState,useEffect}from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import {useLoader} from '../context/LoaderContext'
import { useNavigate } from 'react-router-dom';
import AuthService from '../AuthService';
import { set } from 'mongoose';
// const section = [
//     { name: 'Section 1', questionsSolved: 8, totalQuestions: 10 },
//     { name: 'Section 2', questionsSolved: 5, totalQuestions: 10 },
//     { name: 'Section 3', questionsSolved: 7, totalQuestions: 10 },
// ];

const Sections = () => {

    const [sections,setSections]=useState([])
    const {loaderdispatcher}=useLoader()

    useEffect(()=>{
        try{
        const fetchSections=async()=>{
            console.log(AuthService.gettoken())
            loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
            const respo=await axios.post(`${process.env.baseurl}/api/actions/getsections`,{},{headers:{token:AuthService.gettoken()}})
            loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
            console.log(respo.data.questionsset)
            setSections(respo.data.questionsset)
        }
        fetchSections()
    }catch(err){
        loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
        console.log(err)
    }
    },[])

    const navigate=useNavigate()

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
            {sections.map((section, index) => {
                const percentage = (section.questionsSolved / section.totalQuestions) * 100;
                return (
                    <div
                        key={index}
                        onClick={()=>navigate(`/sections/${section._id}`)}
                        className="flex flex-row justify-between items-center p-6 bg-white rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >

                        <h3 className="mb-4 text-lg font-semibold text-gray-700 lg:text-[30px] lg:text-bold">{section._id.charAt(0).toUpperCase()+section._id.slice(1)}</h3>
                        <div className="w-32 h-32">
                            <CircularProgressbar
                                value={percentage}
                                text={`${section.questionsSolved}/${section.totalQuestions}`}
                                styles={buildStyles({
                                    textColor: '#4a4a4a',
                                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                                    trailColor: '#d6d6d6',
                                })}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Sections;
