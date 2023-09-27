import Button from '../components/Button';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { backendUrl } from '../utils/Constants';

function Home() {
    let history = useHistory();

    const startQuiz = async () => {
        try {
        let res = await axios.get(`${backendUrl}/quiz/start`);
       
        let quizId = res.data.quizId || ""
        let questionId = res.data.question.questionId || ""
       
        history.push(`/question/${quizId}/${questionId}`)
        }
        catch{
            history.push("/error")
        }
    }

    return (
        <Button buttonText={"Start"} onClick={_ => startQuiz()} />
    );
}

export default Home;
