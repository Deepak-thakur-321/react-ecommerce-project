import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AllReactRouters from './Components/AllReactRouters';

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/react-ecommerce-project">
        <AllReactRouters></AllReactRouters>
      </BrowserRouter>


    </div>
  )
}

export default App