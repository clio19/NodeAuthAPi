import React, { Component } from "react";
// REDUX
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
// OAUTH
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import * as actions from "../redux/actions";

// Custom input
import CustomInput from "./CustomInput";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  async onSubmit(formData) {
    console.log("onSubmit() got called");
    console.log("formData", formData);
    // We need to call some actioncreator
    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                label="Enter your email"
                placeholder="example@example.com"
                type="text"
                id="email"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                label="Enter your password"
                placeholder="your password"
                type="password"
                id="password"
                component={CustomInput}
              />
            </fieldset>

            {this.props.errorMessage ? (
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Sing Up
            </button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign up using third-party services
            </div>

            <FacebookLogin
              appId=""
              textButton="Facebook"
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            <GoogleLogin
              clientId=""
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
