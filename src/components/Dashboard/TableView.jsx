import React, { Component } from "react";

import AWBTable from "./Table";
import Pagination from "./Pagination";

class TableView extends Component {
  //   state = {};
  render() {
    const {
      history,
      nextPage,
      previousPage,
      currentPage,
      totalPages,
      deleteAwb
    } = this.props;

    return (
      <div className="container">
        <div className=" p-2 d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => history.push("dashboard/add")}
          >
            Add AWB
          </button>

          <Pagination
            nextPage={nextPage}
            previousPage={previousPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
        <AWBTable
          headers={this.props.headers}
          data={this.props.awbList}
          history={history}
          deleteAwb={deleteAwb}
        />
      </div>
    );
  }
}

export default TableView;
