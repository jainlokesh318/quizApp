import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../components/Button';
import { backendUrl } from '../utils/Constants';
import axios from 'axios';


function Question() {
    const history = useHistory();
    const { quizId, questionId } = useParams()
    const [question, setQuestion] = useState({
        description: "",
        options: []
    })

    // const submitQuestion = async () => {
    //     try {
    //         let res = await axios.post(`${backendUrl}/quiz/start`);

    //         let quizId = res.data.quizId || ""
    //         let questionId = res.data.question.questionId || ""

            //history.push(`/question/${quizId}/${questionId}`)
    //     }
    //     catch {
    //         // history.push("/error")
    //     }
    // }

    const getNextQuestion = async () => {
        try {
            let res = await axios.get(`${backendUrl}/quiz/${quizId}/nextQuestion`);
        
            let questionId = res.data.question.questionId || ""

            history.replace(`/question/${quizId}/${questionId}`)
            
         }
         catch {
             history.push("/error")
         }
    }

    const handleNextClick = async () => {
        //await submitQuestion();
        console.log("handleNextClick")
        await getNextQuestion();
    }

    const fetchCurrentQuestionDetails = async () => {
        try {
            const res = await axios.get(`${backendUrl}/${quizId}/${questionId}`);
            setQuestion(res.data.question)
        } catch {
            history.push("/error")
        }

    }

    useEffect(() => {
        fetchCurrentQuestionDetails();
    }, [questionId])

    const [selectedOptions, setSelectedOptions] = useState([]); // State to track selected options

    console.log("re-render", selectedOptions)
    return (
        <div className='w-full' key={questionId}>
            <h2>{question.description}</h2>
            <ul multiple={true} onChange={e => console.log(e.target.selectedOptions)}>
                {
                    question?.options.map(option =>
                        <li key={option} className={`flex item-center m-2 p-2 gap-2 border ${selectedOptions.includes(option) ? "border-green-500" : "border-gray-200"} border-2 rounded`}>
                            <input className='text-green-500' type='checkbox' key={option} checked={selectedOptions.includes(option)} value={option} onChange={e => {
                                if (selectedOptions.includes(option)) {
                                    setSelectedOptions(prev => prev.filter(item => item !== option))
                                } else {
                                    setSelectedOptions(prev => [...prev, e.target.value])
                                }
                            }} />
                            <label>{option}</label>
                        </li>
                    )
                }

            </ul>
            {/* <p>Selected Options: {selectedOptions.join(', ')}</p> */}
            <Button buttonText={"Next"} onClick={_ => handleNextClick()} />

        </div>
    );
}

export default Question;