import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../components/Button';
import { backendUrl } from '../utils/Constants';
import axios from 'axios';
import MultiSelectRadioOptions from '../components/MultiSelectRadioOptions';


function Question() {
    const [selectedAnswers, setSelectedAnswers] = useState([]); // State to track selected options
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

    const handleAnswerSelection = e => {
        let currentOption = e.target.value
        if (selectedAnswers.includes(currentOption)) {
            setSelectedAnswers(prev => prev.filter(item => item !== currentOption))
        } else {
            setSelectedAnswers(prev => [...prev, currentOption])
        }
    }

    return (
        <div className='w-full' key={questionId}>
            <h2>{question?.description}</h2>
            <MultiSelectRadioOptions options={question?.options} onChange={handleAnswerSelection} />
            <Button buttonText={"Next"} disabled={selectedAnswers.length === 0} onClick={_ => handleNextClick()} />

        </div>
    );
}

export default Question;