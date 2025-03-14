import { Outlet } from "react-router-dom"
import Footer_card from "./components/Layout/Footer_card"
import Navbar from "./components/Layout/Navbar"



function App() {
  return (
    <div>
      <Navbar />  
      <Outlet />
      <Footer_card />
    </div>
  )
}

export default App
