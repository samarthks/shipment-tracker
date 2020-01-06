import React from "react";

const AWBTable = ({ headers, data, history, deleteAwb }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <tr key={`${data}+${index}`}>
            <th>{index + 1}</th>
            <td>{data.awbNo}</td>
            <td>{data.courierCompany}</td>
            <td>{data.status}</td>
            <td>
              <button
                type="button"
                className="btn mx-2 btn-outline-primary"
                onClick={() =>
                  history.push(`dashboard/addtrack?awbNo=${data.awbNo}`)
                }
              >
                Add Tracking
              </button>
              <button
                type="button"
                className="btn mx-2 btn-outline-danger"
                onClick={() => deleteAwb(data.awbNo)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AWBTable;
