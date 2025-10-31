import {
    GET_TECHS,
    ADD_TECH,
    DELETE_TECH,
    SET_LOADING,
    TECHS_ERROR
  } from './types';
  
  // Get techs from server
  export const getTechs = () => async dispatch => {
    try {
      dispatch(setLoading());
  
      const res = await fetch('/techs');
      if (!res.ok) {
        throw new Error(`Failed to fetch techs: ${res.status} ${res.statusText}`.trim());
      }
      const data = await res.json();
  
      dispatch({
        type: GET_TECHS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.message
      });
    }
  };
  
  // Add technician to server
  export const addTech = tech => async dispatch => {
    try {
      dispatch(setLoading());
  
      const res = await fetch('/techs', {
        method: 'POST',
        body: JSON.stringify(tech),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        throw new Error(`Failed to add tech: ${res.status} ${res.statusText}`.trim());
      }
      const data = await res.json();
  
      dispatch({
        type: ADD_TECH,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.message
      });
    }
  };
  
  export const deleteTech = id => async dispatch => {
    try {
      dispatch(setLoading());
  
      const res = await fetch(`/techs/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error(`Failed to delete tech: ${res.status} ${res.statusText}`.trim());
      }
  
      dispatch({
        type: DELETE_TECH,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.message
      });
    }
  };
  
  // Set loading to true
  export const setLoading = () => {
    return {
      type: SET_LOADING
    };
  };