import Home from './screens/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Question from './screens/Question';
import PageNotFound from './screens/PageNotFound';

function App() {
  return (
    <div className="h-screen w-screen flex">
      <div className="m-auto border h-full flex w-full md:w-1/3 flex flex-col items-center justify-center">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/question/:quizId/:questionId" component={Question} />
            <Route path="*" component={PageNotFound} />
            {/* <Route path="/report/:quizId" component={Report} /> */}
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;


