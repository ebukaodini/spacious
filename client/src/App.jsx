import { Switch, Route, Link, useLocation } from 'react-router-dom'
import { PlanetsPage, CharactersPage, CreatePlanetPage, CreateCharacterPage } from './pages'

function App() {

  // NOTE:
  // This modal routing approach is not the possible best approach
  // This is just an 'Ad hoc' approach

  const { pathname, state } = useLocation()

  let previousComponent;
  switch (localStorage.getItem('lastPath')) {
    case '/characters':
      previousComponent = CharactersPage
      break;

    default:
      previousComponent = PlanetsPage
      break;
  }

  let modalComponent;
  if (state && state.modal) {
    switch (pathname) {
      case '/planets/create':
        modalComponent = CreatePlanetPage
        break;
      case '/characters/create':
        modalComponent = CreateCharacterPage
        break;
      default:
        break;
    }
  } else {
    localStorage.setItem('lastPath', pathname)
  }

  return (
    <>

      <Switch>

        <Route exact path='/' component={PlanetsPage} />
        <Route exact path='/characters' component={CharactersPage} />
        <Route exact path='/planets/create' component={previousComponent} />
        <Route exact path='/characters/create' component={previousComponent} />

        <Route render={() => (
          <center>
            Page not found!<br />
            Seems like you're lost in space.<br />
            <Link to='/'>Follow this Portal.</Link>
          </center>
        )} />

      </Switch>

      {
        (state && state.modal) && modalComponent()
      }


    </>
  );
}



export default App;
