import logo from './logo.svg';
import './App.scss';
import { Route } from 'react-router-dom';
import { Main } from './Main'
import { Event } from './Event'

function App() {
  return (
    <div>
      <Route path="/" component={Main} exact />
      <Route path="/event" component={Event} exact />
    </div>
  );
}

export default App;
