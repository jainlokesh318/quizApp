import React, { useEffect, useMemo, useState } from 'react';
import confetti from "../images/confetti.svg"
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { backendUrl } from '../utils/Constants';
import axios from 'axios';
import Button from '../components/Button';

export default function Report() {
    const { quizId } = useParams()
    const [stats, setStats] = useState({})
    const history = useHistory();

    const submitQuiz = async () => {
        try {
            let res = await axios.post(`${backendUrl}/quiz/${quizId}/submit`);
            let statsData = res.data;
            setStats(statsData)
        }
        catch {
            history.push("/error")
        }
    }

    useEffect(() => {
        submitQuiz();
    }, [])


    return <div className='bg-violet-400 h-full flex flex-col justify-between'>
        <img src={confetti} />
        <div className='h-4/5 w-full bg-white flex flex-col items-center justify-between rounded-t-2xl p-5 gap-7 '>
            <div className='flex flex-col gap-7 w-full items-center mt-7'>
                <h1 className='font-bold text-4xl'>Your Result</h1>
                <div className='rounded-full border flex items-center justify-center h-[25vh] w-[25vh] aspect-square text-5xl font-bold'>
                    <span>{(stats.correct / stats.totalQuestions) * 100 || "0"}%</span>
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <div className='bg-green-200 p-4 rounded-xl w-full flex gap-5 items-center'>
                        <div className='bg-green-400 h-5 w-5 rounded-full'></div>
                        <span className='font-bold'>{stats.correct || "0"}</span>
                        Correct
                    </div>
                    <div className='bg-red-200 p-4 rounded-xl w-full flex gap-5 items-center'>
                        <div className='bg-red-400 h-5 w-5 rounded-full'></div>
                        <span className='font-bold'>{stats.totalQuestions - stats.correct || ""}</span>
                        Incorrect
                    </div>
                </div>
            </div>
            <Button buttonText="Start Again" className="w-full" onClick={_ => {
                history.replace('/')
            }} />
        </div>
    </div>
}