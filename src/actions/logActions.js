import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

// export const getLogs = () => {
//   return async dispatch => {
//     setLoading();

//     const res = await fetch('/logs');
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data
//     });
//   };
// };

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    dispatch(setLoading());

    const res = await fetch('/logs');
    if (!res.ok) {
      throw new Error(`Failed to fetch logs: ${res.status} ${res.statusText}`.trim());
    }
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

// Add new log
export const addLog = log => async dispatch => {
  try {
    dispatch(setLoading());

    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`Failed to add log: ${res.status} ${res.statusText}`.trim());
    }
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
}; 

// Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    dispatch(setLoading());

    const res = await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error(`Failed to delete log: ${res.status} ${res.statusText}`.trim());
    }

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

// Update log on server
export const updateLog = log => async dispatch => {
  try {
    dispatch(setLoading());

    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to update log: ${res.status} ${res.statusText}`.trim());
    }

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

// Search server logs
export const searchLogs = text => async dispatch => {
  try {

    
    const res = await fetch(`/logs?q=${text}`);
    if (!res.ok) {
      throw new Error(`Failed to search logs: ${res.status} ${res.statusText}`.trim());
    }
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.message
    });
  }
};

// Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};