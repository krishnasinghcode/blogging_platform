import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import NotFound from './components/NotFound'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/* Handles undefined routes */}
      </Routes>
    </Router>
    </>
  )
}

export default App
