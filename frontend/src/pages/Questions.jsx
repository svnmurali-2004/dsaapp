import { useState } from 'react';

// Mock data (simulate fetching from an API)
import axios from 'axios';
import { useEffect } from 'react';
import AuthService from '../AuthService';
import {useLoader} from '../context/LoaderContext'
import { useParams } from 'react-router-dom'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// const questions123 = [
//     {
//         "_id": "1",
//         "title": "Count Digits",
//         "qlink": "https://www.codingninjas.com/studio/problems/count-digits_8416387?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf",
//         "sollink": "abc",
//         "difficulty": "easy",
//         "description": "we should count the no of digits basic problem",
//         "section": "arrays"
//     },
//     {
//         "_id": "2",
//         "title": "Reverse Array",
//         "qlink": "https://www.codingninjas.com/studio/problems/reverse-array_8592165?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf",
//         "sollink": "",
//         "difficulty": "medium",
//         "description": "Reverse the elements of an array in-place.",
//         "section": "arrays"
//     },
//     {
//         "_id": "3",
//         "title": "Find Maximum",
//         "qlink": "https://www.codingninjas.com/studio/problems/find-maximum_8144325?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf",
//         "sollink": "",
//         "difficulty": "easy",
//         "description": "Find the maximum element in an array.",
//         "section": "arrays"
//     },
//     {
//         "_id": "4",
//         "title": "Merge Arrays",
//         "qlink": "https://www.codingninjas.com/studio/problems/merge-arrays_8244356?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf",
//         "sollink": "",
//         "difficulty": "hard",
//         "description": "Merge two sorted arrays into a single sorted array.",
//         "section": "arrays"
//     },
//     {
//         "_id": "5",
//         "title": "Find Median",
//         "qlink": "https://www.codingninjas.com/studio/problems/find-median_8123556?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf",
//         "sollink": "",
//         "difficulty": "medium",
//         "description": "Find the median of two sorted arrays.",
//         "section": "arrays"
//     }
// ];

const Questions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {loader,loaderdispatcher}=useLoader()
    const [questions,setQuestions]=useState([])
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    let {sectionid}=useParams()
    

    // const markAsSolved = (id) => {
    //     // Logic to mark question as solved (can be implemented)
    //     console.log(`Question ${id} marked as solved.`);
    // };

    // Function to filter questions based on search term
    const filteredQuestions = questions.filter((question) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const markAsSolved=async(questionid,index)=>{        
            try{
                loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
                const respo =await axios.post(`${process.env.baseurl}/api/actions/markassolved`,{questionid},{headers:{token:AuthService.gettoken()}});
                loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
                if(respo.data.ok){
                    const temparray=questions
                    temparray[index].solved=true
                    setQuestions(temparray)
                    console.log(respo.data,"from mark as solved")
                    console.log("successfully marked as solved")
                } 
            }catch(err){
                loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
                console.log(err);
            }
    }

    const markAsUnSolved = async(questionsid,index)=>{
        try{
            loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
            const respo =await axios.post(`${process.env.baseurl}/api/actions/markasunsolved`,{questionsid},{headers:{token:AuthService.gettoken()}});
            loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
            if(respo.data.ok){
                const temparray=questions
                temparray[index].solved=false
                setQuestions(temparray)
                console.log(respo.data,"from mark as unsolved")
                console.log("successfully marked as unsolved")
            }
        }catch(err){
            loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
            console.log(err)
        }
    }

    useEffect(()=>{
        try{
        const fetchQuestions=async()=>{            
            loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
            const respo=await axios.post(`${process.env.baseurl}/api/actions/sections/`+sectionid,{},{headers:{token:AuthService.gettoken()}})
            loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
            console.log(respo.data.questionsset)
            setQuestions(respo.data.questionsset.questions)
        }
        fetchQuestions()
    }catch(err){
        loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
        console.log(err)
    }
    },[])

    return (
        <div className="p-6">
            {/* Search input */}
            <div className="flex items-center mb-6 cursor-pointer" onClick={()=>window.history.back()} >
                <ArrowBackIcon className="cursor-pointer"/>
                <h1 className="text-2xl font-semibold text-gray-800">Questions</h1>
            </div>
            <input
                type="text"
                placeholder="Search by title or difficulty..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4 w-full"
            />

            {/* Grid of questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuestions.map((question,index) => (
                    <div key={question._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{question.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{question.description}</p>
                        <div className="flex items-center justify-between mb-4 flex-wrap">
                            <span className={`px-2 py-1 text-xs font-semibold text-white ${getDifficultyColor(question.difficulty)} rounded-md mb-2 md:mb-0`}>
                                {question.difficulty}
                            </span>
                            <div className="flex">
                                <a href={question.qlink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-2">View Problem</a>
                                {question.sollink && (
                                    <a href={question.sollink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 mr-2">View Solution</a>
                                )}
                            </div>
                        </div>
                        {question.solved&&
                        <button
                            onClick={() => markAsUnSolved(question._id,index)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Mark as unSolved
                        </button>
                            }
                        {!question.solved&&
                        <button onClick={() => markAsSolved(question._id,index)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                    >
                        Mark as Solved
                    </button>
                        
                        }

                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to get difficulty color
const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy':
            return 'bg-green-500';
        case 'medium':
            return 'bg-yellow-500';
        case 'hard':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};

export default Questions;
