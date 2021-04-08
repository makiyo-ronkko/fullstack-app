import { Dispatch } from 'react';
import { CALL_ALERT, ALERT_CLEAR } from './types';
import { v4 as uuidv4 } from 'uuid';

interface AlertProps {
	type: string;
	payload:
		| {
				message?: string;
				type?: string;
				id: string;
		  }
		| string;
}

// Dispatch alert message and type
export const alert = (message: string, type: string, timeout = 2000) => (
	dispatch: Dispatch<AlertProps>
) => {
	const id = uuidv4();
	// call CALL_ALERT reducer
	dispatch({
		type: CALL_ALERT,
		payload: { message, type, id },
	});

	// to avoid multiple alert messages on click
	// to remove alert, payload is only id
	setTimeout(() => dispatch({ type: ALERT_CLEAR, payload: id }), timeout);
};
