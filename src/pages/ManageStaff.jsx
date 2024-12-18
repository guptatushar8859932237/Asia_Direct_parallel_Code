import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box, Button, Modal } from '@mui/material';
import { FaEdit } from "react-icons/fa";
const pageSize = 6;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function ManageStaff() {
  const [isChecked, setIsChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputdata, setInputdata] = useState([])
  const [error, setError] = useState({});
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [input, setInput] = useState({
    staff_email: '',
    staff_name: '',
    new_password: ''
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = React.useState([]);
  const filterdata = data?.filter(item => {
    return item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.full_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.staff_name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
  });
  const totalPages = Math.ceil(filterdata.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterdata.slice(startIndex, endIndex);
  const getdata = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}staff-list`).then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error.response);
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    getdata();
  }, []);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleToggle = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: 1 - item.status } : item
    );
    setData(updatedData);
  };
  const handlelcicckac = (id) => {
    axios.post(`${process.env.REACT_APP_BASE_URL}change-status`, {
      user_id: id
    }).then((response) => {
      toast.success(response.data.message);
    }).catch((error) => {
      console.log(error.response);
    });
  };
  const handlevalidate = (value) => {
    let error = {};
    if (!value.staff_email) {
      error.staff_email = "Email is required";
    }
    if (!value.staff_name) {
      error.staff_name = "Name is required";
    }
    if (!value.new_password) {
      error.new_password = "Password is required";
    }
    if (selectedRoles.length === 0) {
      error.roles = "Please select at least one role";
    }
    setError(error);

    if (Object.keys(error).length === 0) {
      handleapi();
    }
  };
  const roleOptions = [
    { value: '0', label: 'No Role Assign' },
    { value: '1', label: 'Quoting clerk' },
    { value: '2', label: 'Operation controller' },
    { value: '3', label: 'Customs clerk' }
  ];
  const handleRoleChange = (event) => {
    setSelectedRoles(event.target.value);
  };
  const handleapi = () => {
    const apivali = {
      staff_email: input.staff_email,
      staff_name: input.staff_name,
      roles: selectedRoles,
      new_password: input.new_password
    };
    axios.post(`${process.env.REACT_APP_BASE_URL}add-staff`, apivali)
      .then((response) => {
        toast.success(response.data.message);
        getdata();
        setIsModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleclick = () => {
    handlevalidate(input);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handledelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.REACT_APP_BASE_URL}delete-staff`, { staff_id: id }).then((response) => {
          toast.success(response.data.message);
          getdata();
        }).catch((error) => {
          toast.error(error.response.data.message);
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleupdateapi = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  const openModal2 = (id) => {
    const userlog = data.find(item => item.id === id);
    if (userlog) {
      setInputdata({
        staff_id: id,
        staff_email: userlog.email,
        staff_name: userlog.full_name,
        roles: userlog.roles || [],
      });
    }
    setIsModalOpen2(true);
  };
  const postData1234 = () => {
    console.log(inputdata)
    const apivali = {
      staff_id: inputdata.staff_id,
      email: inputdata.staff_email,
      staff_name: inputdata.staff_name,
      roles: selectedRoles,
      password: inputdata.new_password
    };
    if (!selectedRoles || !inputdata.new_password) {
      toast.error("Update Roles and Password")
    } else {
      axios.post(`${process.env.REACT_APP_BASE_URL}update-staff`, apivali)
        .then((response) => {
          toast.success(response.data.message);
          closeModal2()
          getdata();
          setIsModalOpen(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row manageFreight">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                      <h4 className="freight_hd">Add Staff</h4>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="">
                        <input className='px-2 py-1 rounded ' type='text' placeholder='Search' value={searchQuery} onChange={handleSearch}></input>
                      </div>
                      <div className="ms-2">
                        <button type="button" onClick={openModal}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isModalOpen && (
                <div className="custom-modal">
                  <div className="custom-modal-content">
                    <div className="custom-modal-header">
                      <h5 className="custom-modal-title">Add Staff</h5>
                      <button type="button" className="btn-close" onClick={closeModal} />
                    </div>
                    <div className="custom-modal-body">
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mb-2 md_staff">
                          Email address
                        </label>
                        <input
                          type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={handlechange} name='staff_email' />
                        <p className='text-danger'>{error.staff_email}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="inputText" className="form-label mb-2 md_staff">
                          Full Name
                        </label>
                        <div className="col-sm-12">
                          <input type="text" onChange={handlechange} name='staff_name' className="form-control" id="inputText" placeholder='Enter your Name' />
                          <p className='text-danger'>{error.staff_name}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="inputText" className="form-label mb-2 md_staff">
                          Assign Roles
                        </label>
                        <FormControl style={{ width: "100%" }}>
                          <InputLabel id="demo-multiple-checkbox-label">Assign Roles</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedRoles}
                            onChange={handleRoleChange}
                            input={<OutlinedInput label="Assign Roles" />}
                            renderValue={(selected) => selected.map(role => roleOptions.find(option => option.value === role)?.label).join(', ')}
                            MenuProps={MenuProps}
                            className='country_sel'
                          >
                            {roleOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <Checkbox checked={selectedRoles.indexOf(option.value) > -1} />
                                <ListItemText primary={option.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      </div>
                      <div>
                        <label htmlFor="inputPassword" className="form-label mb-2 md_staff">New Password</label>
                        <div className="col-sm-12">
                          <input type="password" className="form-control" name='new_password' onChange={handlechange} id="inputPassword" placeholder='password' />
                          <p className='text-danger mb-0'>{error.new_password}</p>
                        </div>
                      </div>
                    </div>
                    <div className="custom-modal-footer">
                      <button type="button" className="btn text-white" onClick={handleclick} style={{ backgroundColor: "#1b2245" }}>
                        Add Member
                      </button>
                      {/* <button type="button" className="btn close_btn" onClick={closeModal}>Close</button> */}
                    </div>
                  </div>
                </div>
              )}
              <div className="table-responsive mt-2">
                <table className="table table-striped tableICon">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No.</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ border: "none" }}>
                    {
                      currentData && currentData.length > 0 && currentData.map((item, index) => {
                        return (
                          <tr className='border-bottom' key={index}>
                            <th>{startIndex + index + 1}</th>
                            <td>{item.full_name}</td>
                            <td>{item.email}</td>
                            <td>
                              {item.status === 1 ? (
                                <label className={`switch round ${isChecked ? 'checked' : ''}`}>
                                  <input type="checkbox" checked={!isChecked} onClick={() => { handlelcicckac(item.id) }} onChange={() => { handleToggle(item.id) }} />
                                  <span className="slider round"></span>
                                </label>
                              ) : (
                                <label className={`switch round ${isChecked ? 'checked' : ''}`}>
                                  <input type="checkbox" checked={isChecked} onClick={() => { handlelcicckac(item.id) }} onChange={() => { handleToggle(item.id) }} />
                                  <span className="slider round"></span>
                                </label>

                              )}
                            </td>
                            <td>
                              <div className="action_btn1 d-flex align-items-center">
                                <FaEdit onClick={() => { openModal2(item.id) }}
                                  style={{
                                    color: "rgb(27 34 69)",
                                    marginRight: "10px",
                                    width: "20px",
                                    height: "15px",
                                    cursor: "pointer"
                                  }}
                                />
                                <AiFillDelete className="text-danger" style={{ cursor: "pointer" }} onClick={() => { handledelete(item.id) }} />
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
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
                {/* <div className='mt-4'>
                  <button disabled={currentPage === 1} className='btn pagePre' onClick={() => handlePageChange(currentPage - 1)} style={{ backgroundColor: "red", color: "white" }}>
                    Previous
                  </button>
                  <span className='mx-2'>{`Page ${currentPage} of ${totalPages}`}</span>
                  <button className='btn btn-success pageNext' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} style={{ backgroundColor: "green", color: "white" }}>
                    Next
                  </button>
                </div> */}
              </div>
            </div>
            <Modal
              open={isModalOpen2}
              onClose={closeModal2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                height: 450, width: 450,
                overflow: "scroll",
                bgcolor: 'background.paper',
                boxShadow: 24, p: 4
              }}>
                {/* <div className="mb-3 text-center">
                      <h3 id="modal-modal-title">Update Staff</h3>
                    </div> */}
                <div className='row'>
                  <div className='col-12'>
                    <label htmlFor="exampleFormControlInput1" className='ware_label'>Email address</label>
                    <input
                      type="email" className="form-control mb-3" value={inputdata?.staff_email} id="exampleFormControlInput1" placeholder="name@example.com" onChange={handleupdateapi} name='staff_email' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <label htmlFor="inputText" className='ware_label'>Full Name</label>
                    <input type="text" onChange={handleupdateapi} name='staff_name' value={inputdata?.staff_name} className="form-control mb-3" id="inputText" placeholder='Enter your Name' />
                  </div>
                </div>
                <div className='row mb-3 '>
                  <div className='col-12'>
                    <label htmlFor="multipleSelect" className='ware_label'>Assign Roles</label>< br />
                    <FormControl className='w-100'>
                      <InputLabel id="roles-label">Roles</InputLabel>
                      <Select
                        labelId="roles-label"
                        multiple
                        value={selectedRoles}
                        onChange={handleRoleChange}
                        input={<OutlinedInput label="Roles" />}
                        renderValue={(selected) => selected.map(role => roleOptions.find(option => option.value === role)?.label).join(', ')}
                        MenuProps={MenuProps}
                        className='country_sel'
                      >
                        {roleOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Checkbox checked={selectedRoles.indexOf(option.value) > -1} />
                            <ListItemText primary={option.label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {error.roles && <p className='text-danger mb-0'>{error.roles}</p>}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <label htmlFor="inputPassword" className='ware_label'>New Password</label>
                    <input type="password" className="form-control mb-3" name='new_password' onChange={handleupdateapi} id="inputPassword" placeholder='password' />
                    <p className='text-danger mb-0'>{error.new_password}</p>
                  </div>
                </div>
                <div className='text-center mt-2'>
                  <Button variant="contained" className='submit_btn' onClick={postData1234}>Submit</Button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

