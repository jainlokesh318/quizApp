import Button from '../components/Button';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { backendUrl } from '../utils/Constants';
import upraised from "../images/upraised.svg"

function Home() {
    let history = useHistory();

    const startQuiz = async () => {
        try {
            let res = await axios.get(`${backendUrl}/quiz/start`);

            let quizId = res.data.quizId || ""
            let questionId = res.data.question.questionId || ""

            history.push(`/question/${quizId}/${questionId}`)
        }
        catch {
            history.push("/error")
        }
    }

    return (
        <div className='flex flex-col justify-between items-center h-full w-full p-5' >
            <img src={upraised} className='h-10' />
            <div className='rounded-full border flex items-center justify-center h-[30vh] w-[30vh] aspect-square text-4xl font-bold  text-red-500 shadow-xl'>
                <span>Quiz</span>
            </div>
            <Button buttonText={"Start"} className={"w-full"} onClick={_ => startQuiz()} />
        </div>
    );
}

export default Home;
