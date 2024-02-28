import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
// https://github.com/thapatechnical/MERN2023
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import FooterPage from './pages/FooterPage'
import ErrorPage from './pages/ErrorPage'
import LogoutPage from './pages/LogoutPage'
import ServicePage from './pages/ServicePage'
import AdminPage from './pages/AdminPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminContactsPage from './pages/AdminContactsPage';
import AdminUpdatePage from './pages/AdminUpdatePage';
import AdminServiceListPage from './pages/AdminServiceListPage';
import AdminServiceCreatePage from './pages/AdminServiceCreatePage';
import AdminServiceUpdatePage from './pages/AdminServiceUpdatePage';

const App = () => {


  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/services' element={<ServicePage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<ErrorPage />} />

          <Route path='/admin' element={<AdminPage />}>
            <Route path='users' element={<AdminUsersPage />} />
            <Route path='contacts' element={<AdminContactsPage />} />
            <Route path='servicesList' element={<AdminServiceListPage />} />
            <Route path='users/:id/UserUpdate' element={<AdminUpdatePage />} />
            <Route path='serviceCreate' element={<AdminServiceCreatePage />} />
            <Route path='servicesList/:id/serviceUpdate' element={<AdminServiceUpdatePage />} />
          </Route>

        </Routes>
        <FooterPage />
      </Router>
    </>
  )
}

export default App
