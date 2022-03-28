import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { PlanetsPage, CreatePlanetPage, CharactersPage, CreateCharacterPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={PlanetsPage} />
        <Route exact path='/planets/create' component={CreatePlanetPage} />
        <Route exact path='/characters' component={CharactersPage} />
        <Route exact path='/character/create' component={CreateCharacterPage} />
        <Route render={() => (
          <center>
            Page not found!<br />
            Seems like you're lost in space.<br />
            <Link to='/'>Follow this Guide.</Link>
          </center>
        )} />
      </Switch>
    </BrowserRouter>
  );
}



export default App;
