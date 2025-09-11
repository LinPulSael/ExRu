import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Weightpage from './weight';
import RunningPlanner from './runningPlanner';

function Home() {
    const navigate = useNavigate();
    const [now, setNow] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setNow(new Date());
      }, 1000);
    
      return () => clearInterval(timer);
  },[]);
    
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  const formatNumber = (num) => (num <10 ? `0${num}` : num);
  return (
    <div className="App">
      <header className="App-header">
        <h2> 근력과 유산소 두 마리 토끼 잡기 To-do list </h2>
        
      </header>

      <main className="ButtonBox">
        <div className="mainBox">
          <button className = "weightButton" onClick={()=> navigate('/weight')}> 웨이트 트레이닝 바로가기</button>  
          <button className = "runningPlannerButton" onClick={()=> navigate('/runningPlanner')}> 러닝 주차별 계획 바로가기 </button>
          
        </div>
        
        <div className ="currentTime">
            현재시각 : {`${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}
          </div>
          </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weight" element={<Weightpage />} />
        <Route path="/runningPlanner" element={<RunningPlanner />} />
      </Routes>
    </Router>
  )
}

export default App;
