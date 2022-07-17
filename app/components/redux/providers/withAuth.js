import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from '../actions/authActions';

const withAuth = (WrappedComponent) => {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withAuth;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login,
      logout,
    },
    dispatch,
  );

function mapStateToProps(state) {
  const { user } = state.authReducer;
  return { user };
}
