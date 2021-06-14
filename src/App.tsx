import { Route } from 'react-router-dom';
import { Main } from './main'

function App() {
  return (
    <div>
      <Route path="/" component={Main} exact />
    </div>
  );
}

export default App;
