import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const pageSize = 5;

export default function ClearanceOrder() {
  const [age, setAge] = React.useState("");
  const [data1, setData1] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getCleranceOrder`)
      .then((response) => {
        console.log(response.data.data);
        setData1(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleclick = (item) => {
    const data11 = {
      clerance_id: item.id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}CompleteCleranceOrder`,data11)
      .then((response) => {
        getdata();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleclick1212 = (item) => {
    const data11 = {
      clerance_id: item.id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}InprocessCleranceOrder`,data11)
      .then((response) => {
        getdata();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleclick121212 = (item) => {
    const data11 = {
      clerance_id: item.id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}StillToCleranceOrder`,data11)
      .then((response) => {
        getdata();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const filteredData = data1.filter((item) => {
    console.log(item);
    return (
      item?.clearance_number?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item?.client?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.goods_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || item?.port_of_entry_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
       item?.port_of_exit_name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  });
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (currentData) => {
    setCurrentPage(currentData);
  };
  const handleclickcleared = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getCleranceOrder?status=Cleared`)
      .then((response) => {
        console.log(response.data.data);
        setData1(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleinprocess = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}getCleranceOrder?status=In Process`)
      .then((response) => {
        console.log(response.data.data);
        setData1(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlestillclear = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}getCleranceOrder?status=Still to Clear`)
      .then((response) => {
        console.log(response.data.data);
        setData1(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="row manageFreight">
            <div className="d-flex justify-content-between">
              <h4 className="freight_hd">Order clearance</h4>
              <div className="d-flex align-items-center">
                <div className="dropdown me-2">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filter
                  </button>
                  <ul className="dropdown-menu">
                    <li className="filter_item">
                      <a className="dropdown-item" onClick={handleclickcleared}>
                        Cleared
                      </a>
                    </li>
                    <li className="filter_item">
                      <a className="dropdown-item" onClick={handleinprocess}>
                        In Process
                      </a>
                    </li>
                    <li className="filter_item">
                      <a className="dropdown-item" onClick={handlestillclear}>
                        Still to Clear
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <input
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="px-2 py-1 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped tableICon">
                  <tbody style={{ border: "none" }}>
                    {currentData &&
                      currentData.length > 0 &&
                      currentData.map((item, index) => {
                        console.log(item);
                        return (
                          <>
                            <tr className="border-bottom">
                              <td className="list_bd">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <p className="client_nm">
                                      {item.client_name}
                                    </p>
                                    <p className="fright_no mx-2 fs-6">
                                      {item?.clearance_number}
                                    </p>
                                  </div>
                                  <div className="">
                                    <p className="port_date">
                                      {new Date(
                                        item.created_at
                                      ).toLocaleDateString("en-GB")}
                                    </p>
                                  </div>
                                </div>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-md-3 ps-0">
                                      <div className="">
                                        <p className="origin">
                                          {item?.goods_desc}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-md-5">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <p className="origin">
                                          {item?.port_of_entry_name}
                                        </p>
                                        <div className="arrow">
                                          <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                        </div>
                                        <p className="origin">
                                          {item?.port_of_exit_name}
                                        </p>
                                        <p className="origin">
                                          {item?.freight}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="text-center"></div>
                                    </div>
                                    <div className="col-md-2 pe-0">
                                      <div className="text-end">
                                        <div className="dropdown">
                                          <a
                                            href=""
                                            type="button"
                                            className="act_btn dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            Action
                                          </a>
                                          <div className="dropdown-menu">
                                            <a className="dropdown-item det_page">
                                              <ul
                                                className="p-0 m-0"
                                                onChange={handleChange}
                                              >
                                                <li
                                                  className="page_list"
                                                  onClick={() => {
                                                    handleclick(item);
                                                  }}
                                                >
                                                  Cleared
                                                </li>
                                                <li
                                                  className="page_list"
                                                  onClick={() => {
                                                    handleclick1212(item);
                                                  }}
                                                >
                                                  In process
                                                </li>
                                                <li
                                                  className="page_list"
                                                  onClick={() => {
                                                    handleclick121212(item);
                                                  }}
                                                >
                                                  Still to clear
                                                </li>
                                              </ul>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  <p type="radio" className="input_user" />
                                  <label className="status">
                                    {item?.order_status == "Accepted" ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-secondary me-2"></span>
                                        <p className="text-secondary mb-0">
                                          Accepted
                                        </p>
                                      </div>
                                    ) : item.order_status == "Cleared" ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-success me-2"></span>
                                        <p className="text-success mb-0">
                                          Cleared
                                        </p>
                                      </div>
                                    ) : item.order_status == "In process" ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-primary me-2"></span>
                                        <p className="text-primary mb-0">
                                          In process
                                        </p>
                                      </div>
                                    ) : item.order_status ==
                                      "Still to clear" ? (
                                      <div className="d-flex align-items-center">
                                        <span className="dot bg-danger me-2"></span>
                                        <p className="text-danger mb-0">
                                          Still to clear
                                        </p>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
                <div className="text-center d-flex justify-content-end align-items-center">
                    <button
                      disabled={currentPage === 1}
                      className="bg_page"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <i class="fi fi-rr-angle-small-left page_icon"></i>
                    </button>
                    <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                      disabled={currentPage === totalPages}
                      className="bg_page"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i class="fi fi-rr-angle-small-right page_icon"></i>
                    </button>
                  </div>
                {/* <div className="mt-4">
                  <button
                    disabled={currentPage === 1}
                    className="btn pagePre"
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Previous
                  </button>
                  <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                  <button
                    className="btn btn-success pageNext"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ backgroundColor: "green", color: "white" }}
                  >
                    Next
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
