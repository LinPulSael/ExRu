import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';

import './runningPlanner.css';

// npm install react-calendar

export default function RunningPlanner() {
    const [selectedWeek, setSelectedWeek] = useState(null); 
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
    const [selectedDate, setSelectedDate] = useState(null); //날짜 세기
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
        const week = getWeekNumber(date);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setSelectedDate(date);
        setSelectedWeek(week);
        setSelectedMonth(month);
        
        const key = `${month}-${week}`;
        setShowWeeklyInput(!weeklyPlans[key]);
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

    useEffect(() => {
        const key = `${selectedMonth}-${selectedWeek}`;
        if(weeklyPlans[key] ?.length > 0) {
            setShowWeeklyInput(false);
        }

    }, [weeklyPlans, selectedMonth, selectedWeek]);

    return (
       // header 컴포넌트를 따로 만들어 렌더링 예정
       /* locale 은 언어설정 , calendarType 은 시작 요일설정 */
       
       <div className="mainContainer">
            <h1 className="tt"> 러닝 주차별 계획 세우기 </h1>
            {selectedWeek && (
                <div className="weeklyPlanForm">
                    <h3 className="monthWeekPlan">
                        {selectedMonth} 월 {selectedWeek} 주차 훈련 계획
                    </h3>
                    {showWeeklyInput && (
                        <form onSubmit={(e)=>{
                        e.preventDefault();
                        addWeeklyPlan();}} 
                        className="weeklyPlanForm">
                        <input value={newWeeklyPlan}
                        onChange={(e) => setNewWeeklyPlan(e.target.value)}
                        placeholder={`${selectedMonth}월 ${selectedWeek}주차 훈련계획 입력`}
                        className="weeklyTrainingInput"
                        />
                        <button type="submit" className="weeklyTrainingSubmit">추가</button>
                        </form>
                        )}
                
                        
                <ul className="weeklyPlanList">
                    {(weeklyPlans[`${selectedMonth}-${selectedWeek}`] || []). map((plan,idx) =>(
                        <li key = {idx}> {plan} </li>
                    ))}
                </ul>
            </div>
            )}
                
                <Calendar onClickDay={handleClickDay} tileClassName={tileClassName} 
                locale="ko-KR" calendarType="gregory"   /> 
            {selectedDate && (
                <div className="dailyPlanForm">
                    <h3 className="resultOfDay">{selectedMonth} 월 {selectedDate.getDate()} 일 훈련 내용</h3>
                    <input value={newDailyPlan}
                    onChange={(e) => setNewDailyPlan(e.target.value)}
                    placeholder="오늘 훈련 입력"
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addDailyPlan(selectedDate);
                            }
                        }}
                    className="dailyPlanInput"
                    />
                <button onClick={() => addDailyPlan(selectedDate)}
                className="dailyPlanButton">추가</button>

                <ul className="dailyPlanList">
                    {(dailyPlans[selectedDate.toDateString()] || []).map((plan, idx) => (
                        <li key={idx}>{plan}</li>
                        )
                    )}
                </ul>
        </div>
      )}
    </div>
  );
}