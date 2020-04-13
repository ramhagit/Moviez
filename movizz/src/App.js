import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ItemDetail from './components/ItemDetail/ItemDetail';

const App = () => {
  const [data, setData] = useState([]);

  return (
      <div>
          <BrowserRouter>
              <div>
                  <Route path='/' exact component={() => <Home dataProp={data} setDataFunc={setData}/>} />
                  <Route path='/movie/:id' exact component={ItemDetail} />
              </div>
          </BrowserRouter>
      </div>
  );
};

export default App;
