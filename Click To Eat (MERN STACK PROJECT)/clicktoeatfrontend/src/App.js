
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { CartProvider } from './Components/ContextReducer';
import MyOrder from './Screens/MyOrder';

//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      
      <div>
      <Routes>
        <Route exact path='/' element={<Home></Home>} ></Route>
        <Route exact path='/login' element={<Login></Login>} ></Route>
        <Route exact path='/register' element={<Register></Register>} ></Route>
        <Route exact path='/myorder' element={<MyOrder></MyOrder>} ></Route>
      </Routes>
      </div>
      
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
