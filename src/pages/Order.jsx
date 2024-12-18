import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Modal } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
const pageSize = 5;
export default function Order() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file1, setFile1] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [warehousedata, setWarehousedata] = useState([]);
  ///////////////////////////////////////////////////show details in detail's page///////////////////////////////////
  const getorder = () => {
    setLoader(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}order/details`)
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          console.log(response.data.data);
          setLoader(false);
          setData(response.data.data);
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.response);
      });
  };
  useEffect(() => {
    getorder();
  }, []);
  ///////////////////////////////update address/////////////////////////////////////////////////////
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handledelivery = (id) => {
    const alldaatat = data.filter((item) => {
      return item.id === id;
    });
    console.log(alldaatat[0]);
    navigate("/Admin/updateaddress", { state: { data: alldaatat[0] } });
  };
  const handledeliveryEye = (id) => {
    const alldaatat = data.filter((item) => {
      return item.id === id;
    });
    console.log(alldaatat[0]);
    navigate("/Admin/OrderDetails", { state: { data: alldaatat[0] } });
  };
  const track = (id) => {
    const alldaatat = data.filter((item) => {
      return item.id === id;
    });
    navigate("/Admin/trackorder", { state: { data: alldaatat } });
  };
  const track12345 = (id) => {
    const alldaatat = data.filter((item) => {
      return item.id === id;
    });
    navigate("/Admin/OrderDetail", { state: { data: alldaatat } });
  };
  const track123 = (item) => {
    console.log(item);
    const data12213 = {
      freight_id: item.freight_id,
      order_id: item.order_id,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}add_freight_to_warehouse`,
        data12213
      )
      .then((response) => {
        toast.success(response.data.message);
        getorder()
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handlenavival = (id) => {
    const alldata = data?.filter((item) => {
      return item.id === id;
    });
    console.log(alldata);
    navigate("/Admin/updatedelivery", { state: { data: alldata[0] } });
  };
  const filteredData = data.filter((item) => {
    console.log(item);
    return (
      item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.track_status?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.product_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.collection_from_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.nature_of_hazard?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.delivery_to_country?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.collection_from_country?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.hazardous?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight_number?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleclicknaviwaybill = (id) => {
    const alldata = data?.filter((item) => {
      return item.id === id;
    });
    console.log(alldata);
    navigate("/Admin/waybill", { state: { data: alldata[0] } });
  };
  const handleclicknaviauthority = (id) => {
    const alldata = data?.filter((item) => {
      return item.id === id;
    });
    console.log(alldata);
    navigate("/Admin/letterofauhtority", { state: { data: alldata[0] } });
  };
  const handleclicknavibilloflaadding = (id) => {
    const alldata = data?.filter((item) => {
      return item.id === id;
    });
    navigate("/Admin/billofladding", { state: { data: alldata[0] } });
  };
  const handleclicknavibilloflaadding11 = (id) => {
    const alldata = data?.filter((item) => {
      return item.id === id;
    });
    navigate("/Admin/customesClearings", { state: { data: alldata[0] } });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const postData = () => {
    setLoader(true);
    closeModal();
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}UploadExcelShipmentOrder`,
          formdata
        )
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            setLoader(false);
          }
          closeModal();
        })
        .catch((error) => {
          setLoader(false);
          console.log(error.response);
        });
    } else {
      console.log("No file selected");
    }
  };
  const openModal1 = () => {
    setIsModalOpen1(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handleFileChange1 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile1(selectedFile);
    }
  };
  const postData1 = () => {
    setLoader(true);
    closeModal1();
    if (file1) {
      const formdata = new FormData();
      formdata.append("file", file1);
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}UploadExcelFullOrderDetails`,
          formdata
        )
        .then((response) => {
          if (response.data.success == true) {
            setLoader(false);
            toast.success(response.data.message);
            closeModal1();
          }
        })
        .catch((error) => {
          setLoader(false);
          console.log(error.response.data);
        });
    } else {
      console.log("No file selected");
    }
  };
  useEffect(() => {
    getwarehouyse();
  }, []);
  const getwarehouyse = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getWarehouse`)
      .then((response) => {
        console.log(response.data.data);
        setWarehousedata(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleclickrestore = (item) => {
    console.log(item);
    const data123 = {
      order_id: item.order_id,
      freight_id: item.freight_id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}RevertOrder`, data123)
      .then((response) => {
        toast.success(response.data.message);
        getorder();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
const track12311 =(alldata)=>{
  console.log([alldata])
  if(alldata.added_by==="1"){
    navigate('/Admin/shipping-estimate',{state: { data: [alldata] }})
  }
  else{
    navigate("/Admin/shipping-estimate-client",{state:{data:[alldata]}})
  }
}
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="row  manageFreight">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="freight_hd">Order's Details</h4>
                  </div>
                  <div className="d-flex justify-content-end align-items-center">
                    <div className="mx-2">
                      <input className="my-1 py-1 rounded ps-1" value={searchQuery} placeholder="Search" onChange={handleSearch}></input>
                    </div>
                    <div className="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped tableICon">
                    <tbody>
                      {currentdata &&
                        currentdata.length > 0 &&
                        currentdata.map((item, index) => {
                          console.log(item);
                          return (
                            <tr key={index}>
                              <td className="list_bd">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <p className="client_nm">
                                      {item.client_name}
                                    </p>
                                    <p className="fright_no mx-2 fs-6">
                                      {item?.freight_number}
                                    </p>
                                  </div>
                                  <div className="">
                                    <p className="port_date">
                                      {new Date(
                                        item.order_created_date
                                      ).toLocaleDateString("en-GB")}
                                    </p>
                                  </div>
                                </div>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-md-3 ps-0">
                                      <div className="">
                                        <p className="origin">
                                          {item.product_desc}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-md-5">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <p className="origin">
                                          {item.collection_from_country}
                                        </p>
                                        <div className="arrow">
                                          <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                        </div>
                                        <p className="origin">
                                          {item.delivery_to_country}
                                          <span className="fright_type">
                                            ({item?.freight})
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
                                              <ul className="p-0 m-0">
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px" }}
                                                  onClick={() => {
                                                    track(item?.id);
                                                  }}
                                                >
                                                  Track Order
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    track12311(item);
                                                  }}
                                                >
                                                  Edit Estimate
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    track123(item);
                                                  }}
                                                >
                                                  Assign Warehouse
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    handledelivery(item?.id);
                                                  }}
                                                >
                                                  Loading Details
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    handlenavival(item?.id);
                                                  }}
                                                >
                                                  Delivery details
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    handleclicknaviwaybill(
                                                      item?.id
                                                    );
                                                  }}
                                                >
                                                  Way bill
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    handleclicknaviauthority(
                                                      item?.id
                                                    );
                                                  }}
                                                >
                                                  Letter of Authority
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    handleclicknavibilloflaadding(
                                                      item?.id
                                                    );
                                                  }}
                                                >
                                                  Delivery Note
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer",fontSize:"15px"  }}
                                                  onClick={() => {
                                                    handleclicknavibilloflaadding11(
                                                      item?.id
                                                    );
                                                  }}
                                                >
                                                  Custom Clearings
                                                </li>
                                                <li
                                                  className="page_list"
                                                  style={{ cursor: "pointer" ,fontSize:"15px"  }}
                                                  onClick={() => {
                                                    handledeliveryEye(item?.id);
                                                  }}
                                                >
                                                  View Details
                                                </li>
                                              </ul>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <span className="dot bg-success me-2"></span>
                                    <label className="status mb-0">
                                      {item.track_status === null ? (
                                        <p className="text-success mb-0">Accepted</p>
                                      ) : (
                                        <p className="text-success mb-0">{item.track_status}</p>
                                      )}
                                    </label>
                                  </div>
                                  <div className="text-end me-2">
                                    <ReplayIcon
                                      onClick={() => {
                                        handleclickrestore(item);
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
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
          <h2 id="modal-modal-title">Add Excel Order</h2>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="mb-3 border ps-2 py-2 rounded w-100"
            style={{ display: "block", marginTop: "16px" }}
          />
          <Button variant="contained" onClick={postData}>
            Submit
          </Button>
        </Box>
      </Modal>
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
          <h2 id="modal-modal-title">Add Excel Delivery</h2>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange1}
            className="mb-3 border ps-2 py-2 rounded w-100"
            style={{ display: "block", marginTop: "16px" }}
          />
          <Button variant="contained" onClick={postData1}>
            Submit
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}
