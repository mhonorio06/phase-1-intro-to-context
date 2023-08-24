// Your code here
 function createEmployeeRecord(row) {
    return {
            firstName: row[0],
            familyName: row[1],
            title: row[2],
            payPerHour: row[3],
            timeInEvents: [],
            timeOutEvents: [],
    }
}
function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord)
}
function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, formDate) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === formDate)
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === formDate)
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}
function wagesEarnedOnDate(employeeRecord, formDate) {
    return hoursWorkedOnDate(employeeRecord, formDate) * employeeRecord.payPerHour   
}
function allWagesFor(employeeRecord) {
    const allWages = employeeRecord.timeInEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date))
    return allWages.reduce((total, wage) => total + wage) 
}
function calculatePayroll(employeeRecords) {
    const sumForAllEmployees = employeeRecords.map(allWagesFor)
    return sumForAllEmployees.reduce((sum, employeeSum) => sum + employeeSum)
}