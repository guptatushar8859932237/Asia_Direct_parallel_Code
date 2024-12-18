import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function WarehouseDetails() {
  const location = useLocation();

  const info = location.state.data;
  console.log(info);
  const navigate = useNavigate();
  const [apidata, setApidata] = useState([]);

  const postassiandata = () => {
    const data = {
      warehouse_assign_order_id: info.warehouse_assign_order_id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getWarehouseOrderProduct`, data)
      .then((response) => {
        console.log(response.data.data);
        setApidata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    postassiandata();
  }, []);
  const handleclicknav = () => {
    navigate("/Admin/WarehouseOrder");
  };
  return (
    <div className="wpWrapper sidebar123">
      <div className="container-fluid">
        <div className="formDetails">
          <div className="row">
            <div className="col-lg-12">
              <div>
                <ArrowBackIcon
                  onClick={handleclicknav}
                  className="text-dark"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <h4 className="det_hd">Warehouse Full Details</h4>
              </div>
            </div>
          </div>
          <div className="details_box">
            <div className="row justify-content-center">
              <div className="col-md-4 ps-0 pe-4">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Warehouse Details</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div className="table-responsive">
                        <table className="det_show">
                          <tbody>
                            <tr>
                              <td className="fright_num">
                                <p className="client_para1">Freight number:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.freight_number}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Date:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {new Date(info.date).toLocaleDateString(
                                    "en-GB"
                                  )}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Client:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.client_name}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Client Ref:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.client_ref_name}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Groupage:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.batch_number}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Costs Estimates</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div className="table-responsive">
                        <table className="det_show">
                          <thead>
                            <tr>
                              <td className="ship_hd1"></td>
                              <td className="ship_hd2">Warehouse</td>
                              <td className="ship_hd3">Other</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className="client_para1">Collection</p>
                              </td>
                              <td>
                                <p className="client_para1"></p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.costs_to_collect}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Warehouse</p>
                              </td>
                              <td>
                                <p className="client_para1"></p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.warehouse_cost}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1 mb-3">Dispatch</p>
                              </td>
                              <td>
                                <p className="client_para1 mb-3"></p>
                              </td>
                              <td>
                                <p className="client_para1 mb-3">
                                  {info.costs_to_dispatch}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive mt-2">
            <table className="table table-striped tableICon">
              <thead>
                <tr>
                  <th scope="col">Product Description</th>
                  <th scope="col">Harzodous</th>
                  <th scope="col">Warehouse Ref</th>
                  <th scope="col">Date Received</th>
                  <th scope="col">Package Type</th>
                  <th scope="col">Packages</th>
                  <th scope="col">Dimension</th>
                  <th scope="col">Weight</th>
                </tr>
              </thead>
              <tbody style={{ border: "none" }}>
                {apidata &&
                  apidata.length > 0 &&
                  apidata.map((item, index) => {
                    console.log(item);
                    return (
                      <>
                        <tr className="border-bottom" key={index}>
                          <td>{item.product_description}</td>
                          <td>{item.Hazardous}</td>
                          <td>{item.warehouse_ref}</td>
                          <td>
                            {new Date(item.date_received).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td>{item.package_type}</td>
                          <td>{item.packages}</td>
                          <td>{item.dimension}</td>
                          <td>{item.weight}</td>
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
  );
}
