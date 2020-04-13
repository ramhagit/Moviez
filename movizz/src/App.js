import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ItemDetail from './components/ItemDetail/ItemDetail';

const App = () => {
  

  return (
      <div>
          <BrowserRouter>
              <div>
                  <Route path='/' exact component={() => <Home />} />
                  <Route path='/movie/:id' exact component={ItemDetail} />
              </div>
          </BrowserRouter>
      </div>
  );
};

export default App;
