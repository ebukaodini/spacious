import { Switch, Route, Link } from 'react-router-dom'
import { PlanetsPage, CharactersPage } from './pages'

function App() {

  return (
    <>
      <Switch>

        <Route exact path='/' component={PlanetsPage} />
        <Route exact path='/characters' component={CharactersPage} />
        <Route render={() => (
          <center>
            Page not found!<br />
            Seems like you're lost in space.<br />
            <Link to='/'>Follow this Portal.</Link>
          </center>
        )} />

      </Switch>
    </>
  );
}



export default App;
