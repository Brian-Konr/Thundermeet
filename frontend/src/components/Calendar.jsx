import ScheduleSelector from "react-schedule-selector";
import { useState, useEffect } from "react";

export default function Calendar() {
    //params
    let startTime = 0; //form's start hour
    let endTime = 4; //form's end hour
    let type = 'date'; //form's display type: weekday or date

    const [schedule, setSchedule] = useState([]);
    const [format, setFormat] = useState('M/D');
    const [priority, setPriority] = useState(false);
    const [normalDay, setNormalDay] = useState([]);
    const [priorityDay, setPriorityDay] = useState([]);

    useEffect(() => {
        if(type == 'weekday'){
            setFormat('ddd');
        }
      }, []);

    const handleChange = (newSchedule) => {
        console.log(newSchedule);
        let cancelCell = schedule[schedule.length-1];
        setSchedule(newSchedule);
        const exist = (element) => element == newSchedule[newSchedule.length-1];

        if(!priority){
            // console.log("normal:", newSchedule[newSchedule.length-1]);

            //以免觸動畫面其他地方，會啟動handleChange 來重複添加
            if((newSchedule[newSchedule.length-1])!= (normalDay[normalDay.length-1])){
                //add
                if(!normalDay.some(exist)){
                    setNormalDay(normalDay => [...normalDay, newSchedule[newSchedule.length-1]]);
                }
                //remove
                else{
                    // console.log("cancel:", cancelCell);
                    setNormalDay(normalDay.filter(item => item !== cancelCell));
                }
            }
        }else{
            // console.log("priority:", newSchedule[newSchedule.length-1]);

            //以免觸動畫面其他地方，會啟動handleChange 來重複添加
            if((newSchedule[newSchedule.length-1])!= (priorityDay[priorityDay.length-1])){
                //add
                if(!priorityDay.some(exist)){
                    setPriorityDay(priorityDay => [...priorityDay, newSchedule[newSchedule.length-1]]);
                }
                //remove
                else{
                    // console.log("cancel:", cancelCell);
                    setPriorityDay(priorityDay.filter(item => item !== cancelCell));
                }               
            }
        }
    };

    const clickPriority = () => {
        console.log("priority brush");
        setPriority(true);
    };

    const clickNormal = () => {
        console.log("normal brush");
        setPriority(false);
    };

    useEffect(() => {
        console.log("normal:",normalDay);
        console.log("priority:",priorityDay);
      }, [normalDay, priorityDay]);

    return (
        <div>
            <div style={{width: "5vw", height: "5vh", background: '#FFFF33', marginLeft: '3vw', marginTop: '3vh'}} onClick={clickPriority}></div>
            <div style={{width: "5vw", height: "5vh", background: '#FCFFCA', marginLeft: '3vw', marginTop: '2vh'}} onClick={clickNormal}></div>
            <div style={{width: "5vw", height: "5vh", border: '1px solid black', marginLeft: '3vw', marginTop: '2vh'}}></div>
            <div style={{width: "500px",height: "150px", border: '1px solid black', overflow: 'hidden', marginLeft: '10vw', marginTop: '-18vh'}}>
                <ScheduleSelector
                selection={schedule}
                numDays={7}
                minTime={startTime}
                maxTime={endTime}
                startDate={new Date()}
                dateFormat={format}
                timeFormat='H'
                onChange={handleChange}
                rowGap="3px"
                renderDateCell={(date, selected, refSetter) => {
                    const filter = (element) => element.getTime() == date.getTime();
                    return (
                        (priorityDay.findIndex(filter) != -1)? 
                        <div style={{ width: "60px",height: "20px", border: '1px solid black', background: '#FFFF33' }} ref={refSetter} />:
                        <div style={{ width: "60px",height: "20px", border: '1px solid black', background: selected ? "#FCFFCA" : "#FFF" }} ref={refSetter}/>
                    );
                }}
                />
            </div>
        </div>
    );
}

