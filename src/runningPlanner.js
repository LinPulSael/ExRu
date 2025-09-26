import React, {useState} from 'react';
import Calendar from 'react-calendar';

import './runningPlanner.css';

// npm install react-calendar

export default function RunningPlanner() {
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [weeklyPlans, setWeeklyPlans] = useState({});
    const [dailyPlans, setDailyPlans] = useState({});
    const [newWeeklyPlan, setNewWeeklyPlan] = useState("");
    const [newDailyPlan, setNewDailyPlan] = useState("");
    const [showWeeklyInput, setShowWeeklyInput] = useState(false);
    //const [plans, setPlans] = useState({});

    /* 기존 1월부터 12월까지의 주차 계산하던 함수 공부를 위해 남겨놓기
    const getWeekNumber = (date) => {
        const firstDay = new Date(date.getFullYear(), 0, 1);
        const pastDay = (date-firstDay) /86400000;
        return Math.ceil((pastDay + firstDay.getDay()+1)/7);
    };
    */
    const getWeekNumber = (date) => {
        const day = date.getDate();
        return Math.ceil(day/7);
    } 

    const handleClickDay = (date) => {
        setSelectedDate(date);
        setSelectedWeek(getWeekNumber(date));
        setSelectedMonth(date.getMonth() + 1);
        setShowWeeklyInput(true);
    };

    const addWeeklyPlan =() => {
        const key = `${selectedMonth}-${selectedWeek}`;
        if(!newWeeklyPlan) return;
        setWeeklyPlans((prev) => ({
            ...prev,
            [key] : [...(prev[key] || []), newWeeklyPlan],
        }));
        setNewWeeklyPlan("");
    };

    const addDailyPlan = (date) => {
        
        if(!newDailyPlan) return;
        const key = date.toDateString();
        setDailyPlans((prev) => ({
            ...prev,
            [key] : [...(prev[key] || []), newDailyPlan],
        }));
        setNewDailyPlan("");
    };

    const tileClassName = ({date}) => {
        const key = date.toDateString();
        return dailyPlans[key] ? "has-plan" : null;
    };

    const handleKeyDown = (e) => {
        if(e.key=="Enter") {
            addWeeklyPlan();
            addDailyPlan();
        }
    }

    return (
       // header 컴포넌트를 따로 만들어 렌더링 예정
       /* locale 은 언어설정 , calendarType 은 시작 요일설정 */
       
       <div className="mainContainer">
            {showWeeklyInput && (
                <div className="weeklyPlanForm">
                    <h3> {selectedMonth} 월 {selectedWeek} 주차 러닝계획 </h3>
                    <input
                        value={newWeeklyPlan}
                        onChange={(e) => setNewWeeklyPlan(e.target.value)}
                        placeholder={`${selectedMonth}월 ${selectedWeek}주차 훈련계획 입력`}
                        onKeyDown={(e) => { if (e.key === "Enter") 
                            e.preventDefault();
                            addWeeklyPlan(); }}
                    />
                    <button onClick={addWeeklyPlan}>추가</button>
                </div>
            )}
                
            <div className="weeklyPlanList">
                
                
                <ul>
                    {(weeklyPlans[`${selectedMonth}-${selectedWeek}`] || []). map((plan,idx) =>(
                        <li key = {idx}> {plan} </li>
                    )
                    )}
                </ul>
            </div>
                
                <Calendar onClickDay={handleClickDay} tileClassName={tileClassName} 
                locale="ko-KR" calendarType="gregory"   /> 
                

                {selectedDate && (
                <div className="dailyPlanForm">
                    <input
                        value={newDailyPlan}
                        onChange={(e) => setNewDailyPlan(e.target.value)}
                        placeholder="오늘 훈련 입력"
                        onKeyDown={(e) => { if (e.key === "Enter") 
                            e.preventDefault();
                            addDailyPlan(selectedDate); }}
                    />
                    <button onClick={() => addDailyPlan(selectedDate)}>추가</button>
                </div>
            )}
                 </div>
                
    );
}