
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar/Navbar';
import IssueDetail from './components/IssueDetail/IssueDetail';
import IssuePage from './components/IssuePage/IssuePage';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
      <Navbar />
       <Routes>
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/" element={<IssuePage />} />
        </Routes>
       
       <Toaster position="top-right" reverseOrder={false} />
    </div>
    </BrowserRouter>

  );
}

export default App;
