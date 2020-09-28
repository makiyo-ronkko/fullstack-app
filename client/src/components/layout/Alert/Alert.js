import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = (props) =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map((alert) => (
    <div key={alert.id} className='Alert'>
      <p>{alert.message}</p>
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
