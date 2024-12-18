import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Grid, TextField, Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const pageSize = 5;
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
export default function WarehouseOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [batch, setBatch] = useState([]);
  const [file, setFile] = useState(null);
  const [erd, setErd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [prodata, setProdata] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  useEffect(() => {
    getData();
    getAllBatch();
  }, []);
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetWarehouseOrders`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        toast.error("Data not found");
      });
  };
  const getAllBatch = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getAllBatch`)
      .then((response) => {
        setBatch(response.data.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        toast.error("Error fetching batch data");
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleEditClick = (freight_ID, warehouse_assign_order_id) => {
    console.log(freight_ID);
    setErd(warehouse_assign_order_id);
    const selectedData = data.find((item) => item.freight_ID === freight_ID);
    console.log(selectedData);
    setSelectedData(selectedData);
    handleOpenModal();
  };
  const handleEditClick12 = (
    warehouse_assign_order_id,
    order_id,
    freight_id
  ) => {
    const data = {
      id: warehouse_assign_order_id,
      order_id: order_id,
      freight_id: freight_id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}DeleteWarehouseOrder`, data)
      .then((response) => {
        toast.success(response.data.message);
        getData();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleBatchChange = (e, item) => {
    const batchId = e.target.value;
    if (batchId) {
      moveFreightToBatch(batchId, item);
    }
  };
  const moveFreightToBatch = (batchId, item) => {
    const datapost = {
      freight_id: item.freight_id,
      batch_id: batchId,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}moveFreightToBatch`, datapost)
      .then((response) => {
        toast.success("Freight moved to batch successfully");
        getData();
      })
      .catch((error) => {
        console.error(error.response.data);
        toast.error("Already moved to batch");
      });
  };
  const filteredData = data.filter((item) => {
    console.log(item);
    return (
      item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.product_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.collection_from_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.nature_of_hazard
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.delivery_to_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.batch_number?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight_number?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData({ ...selectedData, [name]: value });
  };
  const handleSubmit = () => {
    const dataApi = {
      warehouse_assign_id: selectedData.warehouse_assign_order_id,
      order_id: selectedData.order_id,
      freight_id: selectedData.freight_id,
      ware_receipt_no: selectedData.ware_receipt_no,
      tracking_number: selectedData.tracking_number,
      warehouse_status: selectedData.warehouse_status,
      warehouse_collect: selectedData.warehouse_collect,
      date_received: selectedData.date_received,
      package_type: selectedData.package_type,
      packages: selectedData.packages,
      dimension: selectedData.dimension,
      weight: selectedData.weight,
    };
    console.log(dataApi);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}editWarehouseDetails`, dataApi)
      .then((response) => {
        toast.success("Warehouse order updated successfully");
        getData();
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.response.data);
        toast.error("Error updating warehouse order");
      });
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const postData1 = () => {
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      console.log("asdfhdfh");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}UploadExcelWarehouse`, formdata)
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            closeModal1();
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      console.log("No file selected");
    }
  };
  const handleclicknavi = (item) => {
    console.log(item);
    navigate("/Admin/warehousedetails", { state: { data: item } });
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleclickrevert123 = (item) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-estimate-details`, {
        estimate_id: item.estimated_id,
      })
      .then((response) => {
        navigate("/Admin/download_url", { state: response.data.data });
      })
      .catch((error) => {
        toast.error("Estimate not calculate");
      });
  };
  const handlechangepro = (e) => {
    const { name, value } = e.target;
    setProdata({ ...prodata, [name]: value });
  };
  const handpechangepro = () => {
    console.log(erd);
    const item = {
      warehouse_assign_order_id: erd,
    };
    const dat11a = {
      warehouse_order_id: erd,
      user_id: JSON.parse(localStorage.getItem("data123")).id,
      added_by: JSON.parse(localStorage.getItem("data123")).user_type,
      product_description: prodata.product_description,
      Hazardous: prodata.Hazardous,
      date_received: prodata.date_received,
      package_type: prodata.package_type,
      packages: prodata.packages,
      dimension: prodata.dimension,
      weight: prodata.weight,
      warehouse_ref: prodata.warehouse_ref,
    };
    console.log(dat11a);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}addWarehouseProduct`, dat11a)
      .then((response) => {
        toast.success(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="freight_hd">Warehouse Order List</h4>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <div className="">
                    <input
                      className="px-2 py-1 rounded "
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearch}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card mt-3">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped tableICon">
                      <tbody>
                        {currentData &&
                          currentData.length > 0 &&
                          currentData.map((item) => {
                            console.log(item);
                            return (
                              <>
                                <tr key={item.id}>
                                  <td className="list_bd">
                                    <div className="container-fluid">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <p
                                            className="client_nm"
                                            style={{ fontSize: "18px" }}
                                          >
                                            {item.client_name}
                                          </p>
                                          <p
                                            className="fright_no mx-2"
                                            style={{ fontSize: "14px" }}
                                          >
                                            {item.batch_number}
                                          </p>
                                        </div>
                                        <div className="">
                                          <p className="port_date">
                                            {new Date(
                                              item.date
                                            ).toLocaleDateString("en-GB")}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row align-items-center">
                                        <div className="col-md-3">
                                          <div className="">
                                            <p
                                              className="origin"
                                              style={{ fontSize: "14px" }}
                                            >
                                              {item.product_desc}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-md-5">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <p className="origin">
                                              {item.collection_from_name}
                                            </p>
                                            <div className="arrow">
                                              <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                            </div>
                                            <p className="origin">
                                              {item.delivery_to_name}
                                              <span className="fright_type">
                                                (
                                                {item.freight
                                                  ? item.freight
                                                  : item.freight_type}
                                                )
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-md-2">
                                          <div className="text-center">
                                            <p className="origin">
                                              {item.nature_of_hazard}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-md-2">
                                          <div className="text-end">
                                            <div className="dropdown">
                                              <select
                                                onChange={(e) =>
                                                  handleBatchChange(e, item)
                                                }
                                                name="dropval"
                                                value={item?.dropval}
                                                className="py-1 ps-1 sel_batches"
                                                style={{ cursor: "pointer" }}
                                              >
                                                <option
                                                  className="op_tion"
                                                  value=""
                                                >
                                                  Select Batch
                                                </option>
                                                {batch &&
                                                  batch.length > 0 &&
                                                  batch.map(
                                                    (batchItem, index) => (
                                                      <option
                                                        className="op_tion"
                                                        key={index}
                                                        value={batchItem.id}
                                                      >
                                                        {batchItem.batch_number}
                                                      </option>
                                                    )
                                                  )}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="d-flex align-items-center">
                                            <p
                                              type="radio"
                                              className="input_user mb-0"
                                            />
                                            {item.assign_to_batch === 0 ? (
                                              <div className="d-flex align-items-center">
                                                <span className="dot bg-danger me-2"></span>
                                                <p
                                                  className="text-danger mb-0"
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  Batch Not Assigned
                                                </p>
                                              </div>
                                            ) : (
                                              <div className="d-flex align-items-center">
                                                <span className="dot bg-success me-2"></span>
                                                <p
                                                  className="text-success mb-0"
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  Batch Assigned
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="col-md-6 text-end">
                                          <FaEdit
                                            onClick={() =>
                                              handleEditClick(
                                                item.freight_ID,
                                                item.warehouse_assign_order_id
                                              )
                                            }
                                            style={{
                                              color: "#1d2044",
                                              cursor: "pointer",
                                            }}
                                          />
                                          <DeleteIcon
                                            onClick={() =>
                                              handleEditClick12(
                                                item.warehouse_assign_order_id,
                                                item.order_id,
                                                item.freight_id
                                              )
                                            }
                                            style={{
                                              color: "#1d2044",
                                              cursor: "pointer",
                                            }}
                                          />
                                          <VisibilityIcon
                                            onClick={() =>
                                              handleclicknavi(item)
                                            }
                                            style={{
                                              color: "rgb(27 34 69)",
                                              cursor: "pointer",
                                              width: "20px",
                                            }}
                                          />
                                          <PictureAsPdfIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              handleclickrevert123(item);
                                            }}
                                          />
                                        </div>{" "}
                                      </div>
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
                      <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                      <button
                        disabled={currentPage === totalPage}
                        className="bg_page"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <i class="fi fi-rr-angle-small-right page_icon"></i>
                      </button>
                    </div>
                    <ToastContainer />
                    <Modal
                      open={isModalOpen1}
                      onClose={closeModal1}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          height: 300,
                          width: 450,
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <h4 id="modal-modal-title">Add Excel</h4>
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleFileChange}
                          className="mb-3 border ps-2 py-2 rounded w-100"
                          style={{ display: "block", marginTop: "16px" }}
                        />
                        <Button
                          variant="contained"
                          className="submit_btn"
                          onClick={postData1}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Modal>
                    <Modal
                      open={isModalOpen}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box sx={style1}>
                        <div className="text-center">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h3 id="modal-modal-title">
                                Edit Warehouse Order
                              </h3>
                            </div>
                            <div
                              className="fs-3 border rounded-circle px-2 bg-dark text-white"
                              style={{
                                cursor: "pointer",
                                height: 40,
                                width: 40,
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={handleCloseModal}
                            >
                              +
                            </div>
                          </div>
                        </div>
                        {selectedData && (
                          <form onSubmit={handleSubmit} className="pt-3">
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                className="warehouse_ord"
                              >
                                <TextField
                                  fullWidth
                                  label="Warehouse Receipt No"
                                  variant="outlined"
                                  name="ware_receipt_no"
                                  value={selectedData.ware_receipt_no || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Tracking Number"
                                  variant="outlined"
                                  name="tracking_number"
                                  value={selectedData.tracking_number || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Warehouse Status"
                                  variant="outlined"
                                  name="warehouse_status"
                                  value={selectedData.warehouse_status || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Warehouse Collect"
                                  variant="outlined"
                                  name="warehouse_collect"
                                  value={selectedData.warehouse_collect || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Date Received"
                                  type="date"
                                  variant="outlined"
                                  name="date_received"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={selectedData.date_received || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Package Type"
                                  variant="outlined"
                                  name="package_type"
                                  value={selectedData.package_type || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Total Packages"
                                  variant="outlined"
                                  name="no_of_packages"
                                  value={selectedData.no_of_packages || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Dimension"
                                  variant="outlined"
                                  name="dimension"
                                  value={selectedData.dimension || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  label="Weight"
                                  variant="outlined"
                                  name="weight"
                                  value={selectedData.weight || ""}
                                  onChange={handleInputChange}
                                />
                              </Grid>
                            </Grid>
                            <Box
                              mt={3}
                              display="flex"
                              justifyContent="space-between"
                            >
                              <Button
                                variant="contained"
                                className="save_btn text-center"
                                onClick={handleSubmit}
                              >
                                Submit
                              </Button>
                            </Box>
                          </form>
                        )}
                      </Box>
                    </Modal>
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content ware_cont">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Warehouse Detail
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Product Description
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="product description"
                                  onChange={handlechangepro}
                                  name="product_description"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">Harzadous</label>
                                <select
                                  onChange={handlechangepro}
                                  name="Hazardous"
                                  className="form-control"
                                >
                                  <option>Select...</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Warehouse Ref.
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="warehouse reference"
                                  name="warehouse_ref"
                                  onChange={handlechangepro}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Data Received
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder=""
                                  name="date_received"
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Package Type
                                </label>
                                <select
                                  name="package_type"
                                  onChange={handlechangepro}
                                  className="form-control"
                                >
                                  <option value="">Select...</option>
                                  <option value="box">Box</option>
                                  <option value="crate">Crate</option>
                                  <option value="pallet">Pallet</option>
                                  <option value="bags">Bags</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Total Packages
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="0.00"
                                  onKeyPress={handlekey}
                                  name="packages"
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">Dimension</label>
                                <input
                                  type="text"
                                  name="dimension"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                  onKeyPress={handlekey}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">Weight</label>
                                <input
                                  type="text"
                                  name="weight"
                                  className="form-control"
                                  placeholder="0.00"
                                  onKeyPress={handlekey}
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={handpechangepro}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
