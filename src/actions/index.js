// import our relevant services
import getTasksData from '../services/getTasksData';
import addDatesToCalendarFromCron from '../services/addDatesToCalendarFromCron';
import addTaskDurationInMinutes from '../services/addTaskDurationInMinutes';
// some syntactic sugar here for us to auto-complete action types elsewhere
export const GET_TASKS = 'GET_TASKS';
export const UPDATE_CALENDAR = 'UPDATE_CALENDAR';
export const SET_CURRENT_DATE = 'SET_CURRENT_DATE';

export const getTasks = () => dispatch => {
  // promise from our service axios call to tasks endpoint 
  getTasksData()
  .then((response) => {
    //service to update tasks array with duration in minutes
    return addTaskDurationInMinutes(response.data);
  })
  .then((response) => {
    dispatch({ type: GET_TASKS, payload: response });
  })
  .catch((error) => {
    console.log(error);
  });
};

export const updateCalendarFromTasksCron = (currentTaskList, currentCalendar) => dispatch => {
  addDatesToCalendarFromCron(currentTaskList, currentCalendar)
    .then((response) => {
      //service to update tasks array with parsed Cron interval
      dispatch({ type: UPDATE_CALENDAR, payload: response });
    })
    .catch((error) => {
      console.log(error);
    });
}