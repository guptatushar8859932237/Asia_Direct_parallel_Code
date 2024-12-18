import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Modal } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const pageSize = 5;

export default function MAnageshipments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [countries, setcountries] = useState([]);
  const [inputdata, setInputdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [options, setOptions] = useState([]);
  const [freight1, setFreight1] = useState([]);
  const navigate = useNavigate();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = data.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const openModal1 = () => {
    navigate("/Admin/addshipment");
  };
 
  useEffect(() => {
    getcountry();
  }, []);
  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setcountries(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };
  useEffect(() => {
    getwarehouse();
  }, []);
  const getwarehouse = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getShipment`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  
  const openModal2 = (id) => {
    const getuser = data.filter((item) => {
      return item.id === id;
    });
    console.log(getuser);
    const getsingleuser = getuser[0];
    setInputdata((prevData) => ({
      ...prevData,
      ATD: getsingleuser.ATD,
      ETD: getsingleuser.ETD,
      assign_shipment: getsingleuser.assign_shipment,
      assign_shipment_id: getsingleuser.assign_shipment_id,
      carrier: getsingleuser.carrier,
      container: getsingleuser.container,
      destination_agent: getsingleuser.destination_agent,
      freight: getsingleuser.freight,
      id: getsingleuser.id,
      load: getsingleuser.load,
      origin_agent: getsingleuser.origin_agent,
      port_of_discharge: getsingleuser.port_of_discharge,
      port_of_loading: getsingleuser.port_of_loading,
      release_type: getsingleuser.release_type,
      seal: getsingleuser.seal,
      status: getsingleuser.status,
      vessel: getsingleuser.vessel,
      waybill: getsingleuser.waybill,
      assign_shipment:getsingleuser.assign_shipment,
      assign_shipment_id:getsingleuser.assign_shipment_id
    }));
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const handleFileChange1 = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  const apiupdatepost = () => {
    const dataupdate = {
      shipment_id: inputdata.id,
      waybill: inputdata.waybill,
      freight: inputdata.freight,
      carrier: inputdata.carrier,
      vessel: inputdata.vessel,
      ETD: inputdata.ETD,
      ATD: inputdata.ATD,
      status: inputdata.status,
      origin_agent: inputdata.origin_agent,
      port_of_loading: inputdata.port_of_loading,
      port_of_discharge: inputdata.port_of_discharge,
      destination_agent: inputdata.destination_agent,
      load: inputdata.destination_agent,
      release_type: inputdata.release_type,
      container: inputdata.container,
      seal: inputdata.seal,
      assign_shipment:inputdata.assign_shipment,
      assign_shipment_id:inputdata.assign_shipment_id
    };
    console.log("Request Data:", dataupdate);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}UpdateShipment`, dataupdate)
      .then((response) => {
        try {
          console.log("Response Data:", response.data);
          closeModal2();
          toast.success("Shipment Update successfully");
        } catch (err) {
          console.error("Error in then block:", err);
          throw err;
        }
      })
      .catch((error) => {
        console.error("Error Response:", error.response);
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.log("Error:", error.message);
        }
      });
  };
  const deletewarehouse = (id) => {
    const datadelete = {
      shipment_id: id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}DeleteShipment`, datadelete)
      .then((response) => {
        toast.success(response.data.message);
        getwarehouse();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getbatch = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}AllBatchNumbers`)
      .then((response) => {
        console.log(response.data.data);
        setOptions(response.data.data);
      });
  };
  const getorderid = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}AllFreightOrderNumbers`)
      .then((response) => {
        console.log(response.data.data);
        setFreight1(response.data.data);
      });
  };

  useEffect(() => {
    getorderid();
    getbatch();
  }, []);
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row  manageFreight">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="freight_hd">Shipments List</h4>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="mx-2">
                        <button onClick={openModal1}>Add Shipment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive mt-2">
                <table className="table table-striped tableICon">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Waybill</th>
                      <th>Freight</th>
                      <th>Vessel</th>
                      <th>POL</th>
                      <th>POD</th>
                      <th>ETD</th>
                      <th>ATD</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentdata &&
                      currentdata.length > 0 &&
                      currentdata.map((item, index) => {
                        console.log(item);
                        return (
                          <>
                            <tr key={item.id}>
                              <td>{startIndex + index + 1}</td>
                              <td>{item.waybill}</td>
                              <td>{item.freight}</td>
                              <td>{item.vessel}</td>
                              <td>{item.port_of_loading}</td>
                              <td>{item.port_of_discharge}</td>
                              <td>{item.ETD}</td>
                              <td>{item.ATD}</td>
                              <td>{item.status}</td>
                              <td>
                                <FaEdit
                                  onClick={() => {
                                    openModal2(item.id);
                                  }}
                                  style={{
                                    color: "rgb(27 34 69)",
                                    marginRight: "10px",
                                    width: "20px",
                                    height: "15px",
                                    cursor: "pointer",
                                  }}
                                />
                                <AiFillDelete
                                  onClick={() => {
                                    deletewarehouse(item.id);
                                  }}
                                  style={{
                                    color: "rgb(27 34 69)",
                                    marginRight: "10px",
                                    width: "20px",
                                    height: "15px",
                                    cursor: "pointer",
                                  }}
                                />
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
                  <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                  <button
                    disabled={currentPage === totalPage}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <i class="fi fi-rr-angle-small-right page_icon"></i>
                  </button>
                </div>
                <Modal
                  open={isModalOpen2}
                  onClose={closeModal2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    className="warehouse_modal"
                    sx={{
                      position: "absolute",
                      overflow: "scroll",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      height: 700,
                      width: 950,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <div className="row">
                      <h5 className="">Update Shipment Detail / Form</h5>
                      <div className="col-3">
                        <label className="ware_label">Waybill</label>
                        <input
                          type="text"
                          placeholder="Waybill"
                          value={inputdata.waybill}
                          onChange={handleFileChange1}
                          className="mb-3 border ps-2 py-2 rounded w-100"
                          name="waybill"
                        />
                      </div>
                      <div className="col-3">
                        <label className="ware_label">Freight</label>
                        <select
                          type="text"
                          name="freight"
                          value={inputdata.freight}
                          placeholder="freight"
                          onChange={handleFileChange1}
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        >
                          <option>Select...</option>
                          <option value="Sea">Sea</option>
                          <option value="Air">Air</option>
                          <option value="Road">Road</option>
                        </select>
                      </div>

                      <div className="col-3">
                        <label className="ware_label">Vessel</label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.vessel}
                          name="vessel"
                          placeholder="vessel"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>

                      <div className="col-3">
                        <label className="ware_label">Carrier</label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.carrier}
                          name="carrier"
                          placeholder="carrier"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                      <div className="col-3">
                        <label className="ware_label">ETD</label>
                        <input
                          type="date"
                          onChange={handleFileChange1}
                          name="ETD"
                          placeholder="ETD"
                          value={inputdata.ETD}
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                      <div className="col-3">
                        <label className="ware_label">ATD</label>
                        <input
                          type="date"
                          onChange={handleFileChange1}
                          placeholder="ATD"
                          value={inputdata.ATD}
                          name="ATD"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                      <div className="col-3">
                        <label className="ware_label">Origin Agent</label>
                        <select
                          className="form-control mb-3 py-2"
                          onChange={handleFileChange1}
                          name="origin_agent"
                          value={inputdata.origin_agent}
                        >
                          <option>Select...</option>
                          <option value="DHL">DHL</option>
                          <option value="Fedex">Fedex</option>
                          <option value="SACO CFR">SACO CFR</option>
                          <option value="Contra Consolidations">
                            Contra Consolidations
                          </option>
                          <option value="Afristar">Afristar</option>
                          <option value="Asia Direct - Africa">
                            Asia Direct - Africa
                          </option>
                        </select>
                      </div>
                      <div className="col-3">
                        <label className="ware_label">Status</label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.status}
                          name="status"
                          placeholder="status"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <label className="ware_label">Port of Loading</label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.port_of_loading}
                          name="port_of_loading"
                          placeholder="port_of_loading"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                      <div className="col-3">
                        <label className="ware_label">Port of Discharge</label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.port_of_discharge}
                          name="port_of_discharge"
                          placeholder="port_of_discharge"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                      <div className="col-3">
                        <label className="ware_label">Destination Agent</label>
                        <select
                          className="mb-3 border ps-2 py-2 rounded w-100"
                          name="destination_agent"
                          onChange={handleFileChange1}
                          value={inputdata.destination_agent}
                        >
                          <option>Select...</option>
                          <option value="Asia Direct">Asia Direct</option>
                          <option value="Shenzhen Nimbus Shipping">
                            Shenzhen Nimbus Shipping
                          </option>
                          <option value="Shenzhen Portline">
                            Shenzhen Portline
                          </option>
                          <option value="OBD Logistics">OBD Logistics</option>
                        </select>
                      </div>
                      <div className="col-3">
                        <label className="ware_label">Load</label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.load}
                          name="load"
                          placeholder="load"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <label className="ware_label">Release Type</label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.release_type}
                          name="release_type"
                          placeholder="Release Type"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                      <div className="col-3">
                        <label className="ware_label">Container number </label>
                        <input
                          type="text"
                          onChange={handleFileChange1}
                          value={inputdata.container}
                          name="container"
                          placeholder="container"
                          className="mb-3 border ps-2 py-2 rounded w-100"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <h5 className="my-3">Assign Shipment</h5>
                      <div className="col-3">
                        <p>Assign Shipment</p>
                        <select
                          type="text"
                          placeholder="warehouse name"
                          onChange={handleFileChange1}
                          className="mb-3 border ps-2 py-3 rounded w-100"
                          name="assign_shipment"
                          value={inputdata.assign_shipment}
                        >
                          <option>Select...</option>
                          <option value="1">Freight / order</option>
                          <option value="2">Groupage / Batch</option>
                        </select>
                      </div>
                      {inputdata.assign_shipment === "1" ? (
                        <div className="col-4">
                          <label className="ware_label">Freight</label>
                          <select onChange={handleFileChange1} name="assign_shipment_id" className="mb-3 border ps-2 py-3 rounded w-100" value={inputdata.assign_shipment_id} >
                            <option>Select...</option>

                            {freight1 &&
                              freight1.length > 0 &&
                              freight1.map((item, index) => {
                                console.log(item)
                                return (
                                  <>
                                    <option key={index} value={item.order_id}>
                                      {item.freight_number} /{" "}
                                      {item.order_number}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      ) : (
                        <div className="col-4">
                          <div className="">
                          <label className="ware_label">Batch</label>
                          <select onChange={handleFileChange1} name="assign_shipment_id" className="mb-3 border ps-2 py-3 rounded w-100" value={inputdata.assign_shipment_id} >
                            <option>Select...</option>

                            {options &&
                              options.length > 0 &&
                              options.map((item, index) => {
                                console.log(item)
                                return (
                                  <>
                                    <option key={index} value={item.batch_id}>
                                  {item.batch_number} 
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center mt-2">
                      <Button variant="contained" onClick={apiupdatepost}>
                        Update Warehouse
                      </Button>
                    </div>
                  </Box>
                </Modal>

                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
