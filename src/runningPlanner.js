import React, {useState} from 'react';
import Calendar from 'react-calendar';

import './runningPlanner.css';

// npm install react-calendar

export default function RunningPlanner() {
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
    const [plans, setPlans] = useState({});

    const getWeekNumber = (date) => {
        const firstDay = new Date(date.getFullYear(), 0, 1);
        const pastDay = (date-firstDay) /86400000;
        return Math.ceil((pastDay + firstDay.getDay()+1)/7);
    };
        
    const handleClickDay = (date) => {
        setSelectedWeek(getWeekNumber(date));
        setSelectedMonth(date.getMonth() + 1);
    };

    const addPlan = (plan) => {
        const key = `${selectedMonth}-${selectedWeek}`;
        setPlans((prev) => ({
            ...prev,
            [key] : [...(prev[selectedWeek,selectedMonth] || []), plan],
        }));

    };
    return (
       // header 컴포넌트를 따로 만들어 렌더링 예정
       
       <div className="mainContainer">
            <Calendar onClickDay={handleClickDay} />
            {selectedWeek && selectedMonth && (
                <div className="calendarContainer">
                    <h2> {selectedMonth}월 {selectedWeek} 주차 계획 </h2>
                    <ul>
                        {(plans[selectedWeek,selectedMonth] || []). map((p,idx) =>(
                            <li key = {idx}> {p} </li>
                        ))}
                    </ul>
                    <button onClick={()=> addPlan("러닝 5km")}> 일정 추가 </button>
                </div>
                )}
            </div>
    );
}