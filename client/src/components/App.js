import React from "react";
import Header from "./Header";

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}
export default App;
