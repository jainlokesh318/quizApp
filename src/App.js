import Home from './screens/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Question from './screens/Question';
import PageNotFound from './screens/PageNotFound';

function App() {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="border p-5 h-full w-full md:w-[30rem]">
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


