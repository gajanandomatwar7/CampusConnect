//hardcoded slots so that can be compared to know whether the status is expired or not 

const slots=[
    {start: "09:00", end:"10:00"},
    {start: "10:15", end:"11:15"},
    {start: "11:15", end:"12:15"},
    {start: "13:15", end:"14:15"},
    {start: "14:15", end:"15:15"},
    {start: "15:30", end:"16:30"},
    {start: "16:30", end:"17:30"},

];
const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
};

//we do no have different value called updatedTime but instead we can directly use the createdAt time from db
//curTime from the servers instance
const checkValidity=(curTime,updatedTime)=>{
    const current = toMinutes(curTime);
    const updated = toMinutes(updatedTime);

    const slot = slots.find(s => {
        const start = toMinutes(s.start);
        const end = toMinutes(s.end);
        return updated >= start && updated <= end;
    });

    if (!slot) return false;

    const start = toMinutes(slot.start);
    const end = toMinutes(slot.end);

    return current >= start && current <= end;
};

module.exports=checkValidity;