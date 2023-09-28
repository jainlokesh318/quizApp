import Home from './screens/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Question from './screens/Question';
import PageNotFound from './screens/PageNotFound';
import Report from './screens/Report';

function App() {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="border h-full w-full md:w-[30rem]">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/question/:quizId/:questionId" component={Question} />
            <Route path="/report/:quizId" component={Report} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;


