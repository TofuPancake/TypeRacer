import React from 'react';
import './App.css';
import Home from './views/home/Home';
import { MemoryRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import Lobby from './views/lobby/Lobby';
import Game from './views/game/Game'
import EndScreen from './views/endScreen/EndScreen';
import Header from './views/components/header/Header';
import Profile from './views/profile/Profile'
import Leaderboard from './views/leaderboard/Leaderboard';

function App() {

  return (
    <div className='App'>
        <BrowserRouter>
          <Header/>
          <div className='App-body'>  
            <Switch>
              <Route path='/lobby'>
                <MemoryRouter>
                  <Switch>
                    <Route exact path='/results'>
                      <EndScreen />
                    </Route>
                    <Route exact path='/game'>
                      <Game />
                    </Route>
                    <Route path='*'>
                      <Lobby />
                    </Route>
                  </Switch>
                </MemoryRouter>
              </Route>
              <Route path='/profile'>
                <Profile/>
              </Route>
              <Route path='/leaderboard'>
                <Leaderboard />
              </Route>
              <Route path='*'>
                <Home />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
