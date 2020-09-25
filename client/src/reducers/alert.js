import { ALERT_FAIL, ALERT_CLEAR } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ALERT_FAIL:
      //  payload: { message, id },
      return [...state, action.payload];
    case ALERT_CLEAR:
      // return all alerts except the one matches with action.payload.id
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
