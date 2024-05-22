import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './components/Home'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Temples from './components/Temples'
import Waterfalls from './components/WaterFalls'
import Trekking from './components/Trekking'
import About from './components/About'
import Contact from './components/Contact'
import LocationForm from './components/LocationForm'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path = "/" Component={Home} />
      <Route exact path='locationform' Component={LocationForm}/>
      <Route exact path = "/login" Component={LogIn} />
      <Route exact path = "/register" Component={Register} />
      <Route exact path = "/temples" Component={Temples} />
      <Route exact path = "/waterfalls" Component = {Waterfalls} />
      <Route exact path = "/trekking" Component={Trekking} />
      <Route exact path = "/about" Component={About} />
      <Route exact path = "/contact" Component={Contact} />
    </Routes>
  </BrowserRouter>
)

export default App