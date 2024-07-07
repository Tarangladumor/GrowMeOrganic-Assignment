import './App.css'
import UserInfoForm from './components/FirstPage/UserInfoForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TablePage from './components/secondPage/Index';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserInfoForm />} />
          <Route path="/table-page" element={<ProtectedRoute><TablePage/></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
