import './App.css'
import Home from './pages/Home/home';
import Signup from './pages/Signup/Signup'
import Signin from './pages/SignIn/SignIn'
import { BrowserRouter , Routes, Route, Router } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard'
import Feature from './Components/Features/features';

const App=()=>{
  return(
    <BrowserRouter>

     <Routes>
       <Route path='/' element={<Home/>}/>
      
       <Route path='/signup' element={<Signup/>}/>
        
       <Route path='/signin' element={<Signin/>}/>

       <Route path="/admin-panel" element={<Dashboard/>}>
        <Route path='dashboard' element={<Feature/>}></Route>
       </Route>

     </Routes>

    </BrowserRouter>

   
  )
}

export default App;