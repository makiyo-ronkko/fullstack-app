import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import './Alert.css';

interface Alerts {
	message: string;
	id: string;
	type: string;
}

interface AlertProps {
	alerts: Alerts[];
}

const Alert: FC<AlertProps> = ({ alerts }): JSX.Element => {
	return (
		<Fragment>
			{alerts !== null &&
				alerts.length > 0 &&
				alerts.map((alert) => (
					<div key={alert.id} className='Alert'>
						<div className={`Alert-content Alert-${alert.type}`}>
							{alert.message}
						</div>
					</div>
				))}
		</Fragment>
	);
};

const mapStateToProps = (state: any) => ({
	alerts: state.alert,
});
//  payload: { message, id },

export default connect(mapStateToProps)(Alert);
