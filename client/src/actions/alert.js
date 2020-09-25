import { ALERT_FAIL, ALERT_CLEAR } from './types';
import { v4 as uuidv4 } from 'uuid';

// Dispatch alert message and type
export const alert = (message) => (dispatch) => {
  const id = uuidv4();
  // call ALERT_FAIL reducer
  dispatch({
    type: ALERT_FAIL,
    payload: { message, id },
  });
};
