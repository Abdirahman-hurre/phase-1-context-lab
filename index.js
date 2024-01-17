/* Your Code Here */
// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Function to create employee records from an array of arrays
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  // Function to create time-in events
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date,
    };
  
    this.timeInEvents.push(timeInEvent);
  
    return this;
  }
  
  // Function to create time-out events
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    };
  
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const timeInHour = Math.floor(timeInEvent.hour / 100);
      const timeOutHour = Math.floor(timeOutEvent.hour / 100);
  
      const hoursWorked = timeOutHour - timeInHour;
      return hoursWorked;
    } else {
      return 0;
    }
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    const hoursWorked = this.hoursWorkedOnDate(date);
    const payOwed = hoursWorked * this.payPerHour;
    return payOwed;
  }
  
  // Function to calculate total wages for all dates worked
  function allWagesFor() {
    return this.timeInEvents
      .filter((timeInEvent) =>
        this.timeOutEvents.some(
          (timeOutEvent) => timeOutEvent.date === timeInEvent.date
        )
      )
      .reduce((sum, timeInEvent) => sum + this.wagesEarnedOnDate(timeInEvent.date), 0);
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employeeArray) {
    return employeeArray.reduce(
      (totalPayroll, employee) => totalPayroll + employee.allWagesFor(),
      0
    );
  }
  


  