import React, { Component } from "react";
import { connect } from "react-redux";

export default (OriginalComponent) => {
  class MixedComponent extends Component {
    checkUser() {
      if (!this.props.isAuth && !this.props.jwtToken) {
        this.props.history.push("/");
      }
    }

    componentDidMount() {
      this.checkUser();
    }

    componentDidUpdate() {
      this.checkUser();
    }
    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapSateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token,
    };
  }

  return connect(mapSateToProps)(MixedComponent);
};
