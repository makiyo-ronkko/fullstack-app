import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = (props) =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map((alert) => (
    <div key={alert.id} className='Alert'>
      <div className={`Alert-content Alert-${alert.type}`}>{alert.message}</div>
    </div>
  ));
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
//  payload: { message, id },

export default connect(mapStateToProps)(Alert);
