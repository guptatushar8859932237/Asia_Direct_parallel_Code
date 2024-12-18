import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BatchesOrder() {
  const [batch, setBatch] = useState([]);
  const [dataapi, setDataapi] = useState({});
  const [freightData, setFreightData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getAllBatch`)
      .then((response) => {
        setBatch(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handlechnage = (e) => {
    const { name, value } = e.target;
    setDataapi({ ...dataapi, [name]: value });
  };

  const batchId =
    location.state.data.id === null
      ? location.state.data.batch_id
      : location.state.data.id;
  console.log(batchId);

  useEffect(() => {
    clickapival();
  }, []);

  const clickapival = () => {
    const data1234 = { batch_id: batchId };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getFreightsByBatch`, data1234)
      .then((response) => {
        console.log(response.data.data)
        setFreightData(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    if (dataapi.dropval) {
      clickapival();
    }
  }, [dataapi.dropval]);

  const handleclcick = (item) => {
    navigate("/Admin/Batchdetails", { state: { data: item } });
  };

  const handleclcickrevert = (item) => {
    console.log(item);
    const data123 = {
      freight_id: item.freight_id,
      batch_id: item.batch_id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}restoreOrderFromBatch`, data123)
      .then((response) => {
        toast.success(response.data.message);
        getdata();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleclicknav = () => {
    navigate("/Admin/Batches");
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card ">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex ">
                    <div>
                      <ArrowBackIcon
                        onClick={handleclicknav}
                        className="text-dark"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <h4 className="freight_hd ms-3">Batches Order</h4>
                    </div>
                  </div>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow className="border-bottom">
                      <TableCell className="fw-bold">Freight No</TableCell>
                      <TableCell className="fw-bold">Client Name</TableCell>
                      <TableCell className="fw-bold">
                        Num. of Packages
                      </TableCell>
                      <TableCell className="fw-bold">Freight</TableCell>
                      <TableCell className="fw-bold">Package Type</TableCell>
                      <TableCell className="fw-bold">Priority</TableCell>
                      <TableCell className="fw-bold">View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {freightData &&
                      freightData.length > 0 &&
                      freightData.map((item, index) => (
                        <TableRow key={index} className="border-bottom">
                          <TableCell>{item.freight_number}</TableCell>
                          <TableCell>{item.client_Name}</TableCell>
                          <TableCell>{item.no_of_packages}</TableCell>
                          <TableCell>{item.freight}</TableCell>
                          <TableCell>{item.package_type}</TableCell>
                          <TableCell>{item.priority}</TableCell>
                          <TableCell>
                            <VisibilityIcon
                              onClick={() => handleclcick(item)}
                              style={{
                                color: "rgb(27 34 69)",
                                cursor: "pointer",
                                width: "20px",
                              }}
                            />
                            {/* <ReplayIcon className='ms-2' onClick={() => handleclcickrevert(item)} /> */}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
