import React, { Component } from "react";

class AddEditAwb extends Component {
  state = {
    ...this.props.formFields.reduce((acc, curr) => {
      acc[curr.name] = "";
      return acc;
    }, {})
  };

  handleInputChange = e => {
    const { name: filedName, value: fieldValue } = e.target;
    this.setState({ [filedName]: fieldValue });
  };

  handleSubmit = () => {
    const searchString = this.props.location && this.props.location.search;

    if (searchString) {
      let awbNo = "";
      awbNo = searchString.slice(
        searchString.indexOf("=") + 1,
        searchString.length
      );
      this.props.onSubmit({ ...this.state, awbNo });
    } else {
      this.props.onSubmit(this.state);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card mt-3">
          <div className="card-body">
            {this.props.formFields.map((field, index) => (
              <div className="form-group" key={field.name + index}>
                <label htmlFor={field.name + index}>{field.label}</label>
                <input
                  type="text"
                  className="form-control"
                  id={field.name + index}
                  name={field.name}
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>
            ))}

            <div className="text-center">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                {this.props.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEditAwb;
