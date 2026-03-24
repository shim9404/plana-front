import { Route, Routes } from "react-router-dom"
import HomePage from "./view/pages/HomePage"
import PlanPage from "./view/pages/PlanPage"
import Mypage from "./view/pages/Mypage"
import MyTripPage from "./view/pages/MyTripPage"
import AdminPage from "./view/pages/AdminPage"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' exact={true} element={<HomePage />} />
        <Route path='/plan' exact={true} element={<PlanPage />} />
        <Route path='/mypage' exact={true} element={<Mypage />} />
        <Route path='/mytrip' exact={true} element={<MyTripPage />} />
        <Route path='/admin' exact={true} element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App
