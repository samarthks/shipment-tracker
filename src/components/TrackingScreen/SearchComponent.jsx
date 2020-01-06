import React, { Component } from "react";

class SearchComponent extends Component {
  state = { awbNumber: "" };

  handleInputChange = e => {
    const { value: awbNumber } = e.target;
    this.setState({ awbNumber });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.fetachAwb(this.state.awbNumber);
  };

  render() {
    return (
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="awbNumberInput">Enter AWB</label>
              <input
                type="text"
                className="form-control"
                id="awbNumberInput"
                placeholder="eg: 321119864, 321119865"
                value={this.state.awbNumber}
                onChange={this.handleInputChange}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
