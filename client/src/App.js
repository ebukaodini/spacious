import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PlanetsPage, CreatePlanetPage, CharactersPage, CreateCharacterPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={PlanetsPage} />
        <Route exact path='/planets/create' component={CreatePlanetPage} />
        <Route exact path='/characters' component={CharactersPage} />
        <Route exact path='/character/create' component={CreateCharacterPage} />
        <Route render={() => (<>Error 404<br />Sorry!</>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
