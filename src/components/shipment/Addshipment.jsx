import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Addshipment() {
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);
  const [freight, setFreight] = useState([]);
  const [resdata, setResdata] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const navigate = useNavigate();
  const handleFileChange1 = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        setFreight(response.data.data);
      });
  };
  useEffect(() => {
    getorderid();
    getbatch();
  }, []);
  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
    console.log("Selected option:", newValue);
    postapigettabdata(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setSelectedOption1(newValue);
    console.log(newValue);
    postapigettabdata1(newValue);
  };
  const postapigettabdata = (newValue) => {
    const data222 = {
      type: "2",
      id: newValue.batch_id,
    };
    console.log(data222);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getAssignShipmentList`, data222)
      .then((response) => {
        setResdata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const postapigettabdata1 = (newValue) => {
    const data222 = {
      type: "1",
      id: newValue.order_id,
    };
    console.log(data222);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getAssignShipmentList`, data222)
      .then((response) => {
        console.log(response.data);
        setResdata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const addshipemnt = () => {
    const adddata = {
      waybill: data.shipment_waybill1,
      freight: data.shipment_freight,
      carrier: data.shipment_carrier,
      vessel: data.shipment_vessel,
      ETD: data.shipment_etd,
      ATD: data.shipment_atd,
      status: data.shipment_status,
      origin_agent: data.shipment_originagent,
      port_of_loading: data.shipment_placeofloading,
      port_of_discharge: data.shipment_placeofdelivery,
      destination_agent: data.shipment_destinationagent,
      load: data.shipment_Load,
      release_type: data.shipment_relesetype,
      container: data.shipment_containerno,
      seal: data.shipment_sealno,
      assign_shipment: data.shipment_waybill === "freight" ? 1 : 2,
      assign_shipment_id:
        data.shipment_waybill === "freight"
          ? selectedOption1.order_id
          : selectedOption.batch_id,
    };
    console.log(selectedOption);
    console.log(selectedOption1);
    console.log(adddata);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}AddShipment`, adddata)
      .then((response) => {
        navigate("/Admin/manage-shipment");
        toast.success(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <p className="fs-3 fw-500">Shipment details / Form</p>
              <div className="col-4">
                <label className="ware_label">Waybill</label>
                <input
                  type="text"
                  placeholder="Waybill"
                  onChange={handleFileChange1}
                  className="mb-3 border ps-2 py-2 rounded w-100"
                  name="shipment_waybill1"
                />
              </div>
              <div className="col-4">
                <label className="ware_label">Freight</label>
                <select
                  name="shipment_freight"
                  placeholder="Freight"
                  onChange={handleFileChange1}
                  className="mb-3 border ps-2 py-2 rounded w-100"
                >
                  <option>Select...</option>
                  <option>Sea</option>
                  <option>Air</option>
                  <option>Land</option>
                </select>
              </div>
              <div className="col-4">
                <label className="ware_label">Carrier</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_carrier"
                  placeholder="Carrier"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label className="ware_label">Vessel</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_vessel"
                  placeholder="Vessel"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
              <div className="col-4">
                <label className="ware_label">ETD</label>
                <input
                  type="date"
                  onChange={handleFileChange1}
                  name="shipment_etd"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
              <div className="col-4">
                <label className="ware_label">ATD</label>
                <input
                  type="date"
                  onChange={handleFileChange1}
                  name="shipment_atd"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label className="ware_label">Release Type</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_relesetype"
                  placeholder="Release Type"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
              <div className="col-4">
                <label className="ware_label">Origin Agent</label>
                <select
                  className="form-control mb-3 py-2"
                  onChange={handleFileChange1}
                  name="shipment_originagent"
                >
                  <option>Select...</option>
                  <option>DHL</option>
                  <option>Fedex</option>
                  <option>SACO CFR</option>
                  <option>Contra Consolidations</option>
                  <option>Afristar</option>
                  <option>Asia Direct - Africa</option>
                </select>
              </div>
              <div className="col-4">
                <label className="ware_label">Place of Loading</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_placeofloading"
                  placeholder="Place of Loading"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label className="ware_label">Place of Delivery</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_placeofdelivery"
                  placeholder="Place of Delivery"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
              <div className="col-4">
                <label className="ware_label">Destination Agent</label>
                {/* <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_atd"
                  placeholder="Destination Agent"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                /> */}
                <select
                  className="mb-3 border ps-2 py-2 rounded w-100"
                  name="shipment_destinationagent"
                  onChange={handleFileChange1}
                >
                  <option>Select...</option>
                  <option>Asia Direct</option>
                  <option>Shenzhen Nimbus Shipping</option>
                  <option>Shenzhen Portline</option>
                  <option>OBD Logistics</option>
                </select>
              </div>
              <div className="col-4">
                <label className="ware_label">Load</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_Load"
                  placeholder="Load"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label className="ware_label">Container No.</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_containerno"
                  placeholder="Container No."
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
              <div className="col-4">
                <label className="ware_label">Seal No.</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_sealno"
                  placeholder="Seal No."
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
              <div className="col-4">
                <label className="ware_label">Status</label>
                <input
                  type="text"
                  onChange={handleFileChange1}
                  name="shipment_status"
                  placeholder="Email address"
                  className="mb-3 border ps-2 py-2 rounded w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <p className="fs-3 fw-500 ">Assign Shipments</p>
              <div className="col-4">
                <label className="ware_label">Assign Shipment</label>
                <select
                  type="text"
                  placeholder="warehouse name"
                  onChange={handleFileChange1}
                  className="mb-3 border ps-2 py-3 rounded w-100"
                  name="shipment_waybill"
                >
                  <option>Select...</option>
                  <option value="freight">Freight / order</option>
                  <option value="batch">Groupage / Batch</option>
                </select>
              </div>
              {data.shipment_waybill === "freight" ? (
                <div className="col-4">
                  <label className="ware_label">Freight</label>
                  <Box sx={{ width: 300 }}>
                    <Autocomplete
                      options={freight}
                      getOptionLabel={(option) =>
                        `${option.freight_number || "N/A"} / ${
                          option.order_number || "N/A"
                        }`
                      }
                      filterOptions={(options, state) =>
                        options.filter(
                          (option) =>
                            (option.freight_number &&
                              option.freight_number
                                .toLowerCase()
                                .includes(state.inputValue.toLowerCase())) ||
                            (option.order_number &&
                              option.order_number
                                .toLowerCase()
                                .includes(state.inputValue.toLowerCase()))
                        )
                      }
                      value={selectedOption1}
                      onChange={handleChange1}
                      renderOption={(props, option) => (
                        <li {...props}>
                          {option.freight_number || "N/A"} /{" "}
                          {option.order_number || "N/A"}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search & Select"
                          variant="outlined"
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.freight_number === value?.freight_number &&
                        option.order_number === value?.order_number
                      }
                    />
                  </Box>
                </div>
              ) : (
                <div className="col-4">
                  <label className="ware_label">Batch</label>
                  <Box sx={{ width: 300 }}>
                    <Autocomplete
                      options={options}
                      getOptionLabel={(option) => option.batch_number}
                      value={selectedOption}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search & Select"
                          variant="outlined"
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                    />
                  </Box>
                </div>
              )}
              <div className="col-4">
                <button
                  className=" mt-4 btn btn-secondary w-50"
                  onClick={addshipemnt}
                >
                  Add Shipment
                </button>
              </div>
            </div>
            <div className="table-responsive mt-2">
              <table className="table mt-4 table-striped tableICon">
                <thead>
                  <tr>
                    <th scope="col">Sr.No.</th>
                    {data.shipment_waybill === "freight" ? (
                      <th scope="col">Freight / Order No. </th>
                    ) : (
                      <th scope="col">Batch No </th>
                    )}

                    <th className="col-2" scope="col-2">
                      Client Name
                    </th>
                    <th scope="col"> HAWB / Tracking</th>
                    <th scope="col">Total Weight </th>
                    <th scope="col">Total CBM</th>
                    <th scope="col">Nature of Goods</th>
                  </tr>
                </thead>
                <tbody style={{ border: "none" }}>
                  {resdata &&
                    resdata.length > 0 &&
                    resdata.map((item, index) => {
                      console.log(item);
                      return (
                        <>
                          <tr className="border-bottom" key={index}>
                            <th>{index + 1}</th>
                            {data.shipment_waybill === "freight" ? (
                              <td>
                                {item.freight_number} / {item.order_number}
                              </td>
                            ) : (
                              <td>{item.batch_number}</td>
                            )}
                            <td className="">{item.client_name} </td>
                            {/* <td >{item.client_ref}</td> */}
                            <td></td>
                            <td>{item.weight}</td>
                            <td>{item.dimensions}</td>
                            <td>{item.nature_of_goods}</td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
