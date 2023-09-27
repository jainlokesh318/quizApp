import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../components/Button';
import { backendUrl } from '../utils/Constants';
import axios from 'axios';
import MultiSelectRadioOptions from '../components/MultiSelectRadioOptions';
import confetti from "../images/confetti.svg"


function Question() {
    const [selectedAnswers, setSelectedAnswers] = useState([]); // State to track selected options
    const history = useHistory();
    const { quizId, questionId } = useParams()
    const [question, setQuestion] = useState({
        description: "",
        options: []
    })

    const submitQuestion = async () => {
        try {
            let res = await axios.post(`${backendUrl}/quiz/start`);
        }
        catch {
            history.push("/error")
        }
    }

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

    const handleAnswerSelection = e => {
        let currentOption = e.target.value
        if (selectedAnswers.includes(currentOption)) {
            setSelectedAnswers(prev => prev.filter(item => item !== currentOption))
        } else {
            setSelectedAnswers(prev => [...prev, currentOption])
        }
    }

    useEffect(() => {
        fetchCurrentQuestionDetails();
    }, [questionId])

    return (
        <div className='bg-violet-400 h-full flex flex-col justify-between ' key={questionId}>
            <img src={confetti} />
            <div className='h-4/5 w-full bg-white flex flex-col justify-end rounded-t-2xl p-5 gap-5'>
                <div className='overflow-scroll flex flex-col gap-5'>
                    <h2 className='font-bold text-xl'>{question?.description}</h2>
                    <MultiSelectRadioOptions options={question?.options} onChange={handleAnswerSelection} />
                </div>
                <Button buttonText={"Next"} disabled={selectedAnswers.length === 0} onClick={handleNextClick} />
            </div>
        </div>
    );
}

export default Question;