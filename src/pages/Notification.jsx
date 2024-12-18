import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
const Notification = () => {
  const [data, setData] = useState("");
  const [inpdata, setInpdata] = useState({
    send_to: "", user_id: "", title: "", description: ""
  });
  const [showContent, setShowContent] = useState(false);
  const [showContent1, setShowContent1] = useState(false);
  const [clientlist, setClientlist] = useState([]);
  const [error, setError] = useState("");
  const [stafflist, setStafflist] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handledelete = (id) => {
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
        axios.post(`${process.env.REACT_APP_BASE_URL}delete-notification`, { notification_id: id }).then((response) => {
          toast.success(response.data.message);
          showdata();
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

  const showdata = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}notification-list`).then((response) => {
      setData(response.data.data);
    });
  };

  useEffect(() => {
    showdata();
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInpdata({ ...inpdata, [name]: value });
    if (name === "send_to") {
      setShowContent(value === "4");
      setShowContent1(value === "3");
    }
  };

  const handelvalidate = (value) => {
    let error = {};
    if (!value.title) {
      error.title = "Title is required";
    }
    if (!value.description) {
      error.description = "Description is required";
    }
    if (!error.title && !error.description) {
      apihit();
    }
    setError(error);
  };

  const postdata = () => {
    handelvalidate(inpdata);
  };

  const apihit = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}send-notification`, inpdata).then((response) => {
      toast.success(response.data.message);
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
      showdata();
    });
  };

  const handleclickshow = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}staff-list`).then((response) => {
      setStafflist(response.data.data);
    });
  };

  const handleclickshow1 = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}clientlist`).then((response) => {
      setClientlist(response.data.data);
    });
  };

  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card ">
            <div className="card-body">
              <div className="row manageFreight">
                <div className="col-12">
                  <div className='d-flex justify-content-between align-item-center'>
                    <div className="">
                      <h4 className="freight_hd">Notification</h4>
                    </div>
                    <div className="">
                      <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Send Notification
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade modalBorder" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add Notification</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <input type="radio" id="all_user" value="2" ref={nameRef} name="send_to" onChange={handlechange} />
                          <label for="all_user" className="ms-1">All User</label>
                        </div>
                        <div>
                          <input type="radio" id="All_Staff" value="1" name="send_to" onChange={handlechange} />
                          <label for="All_Staff" className="ms-1">All Staff</label>
                        </div>
                        <div>
                          <input type="radio" id="Particular_user" value="3" onClick={handleclickshow1} name="send_to" onChange={handlechange} />
                          <label for="Particular_user" className="ms-1">Particular User</label>
                        </div>
                        <div>
                          <input type="radio" id="Particular_staff" value="4" onClick={handleclickshow} name="send_to" onChange={handlechange} />
                          <label for="Particular_staff" className="ms-1">Particular Staff</label>
                        </div>
                      </div>
                      {showContent1 && (
                        <div>
                          <label className="mt-3">Particular User</label><br />
                          <select name="user_id" className="w-100 p-2 rounded" onChange={handlechange}>
                            <option className="ps-2">Select...</option>
                            {clientlist.length > 0 && clientlist.map((item, index) => (
                              <option key={index} value={item.id}>{item.client_name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      {showContent && (
                        <div>
                          <label className="mt-3">Particular Staff</label><br />
                          <select name="user_id" className="w-100 p-2 border-1 rounded" onChange={handlechange}>
                            <option>Select...</option>
                            {stafflist.length > 0 && stafflist.map((item, index) => (
                              <option key={index} value={item.id}>{item.full_name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label>Title</label>
                        <input type="text" onChange={handlechange} ref={emailRef} name="title" placeholder="Title" className="form-control" />
                        <p className="text-danger">{error.title}</p>
                      </div>
                      <div>
                        <label>Message</label>
                        <textarea type="text" ref={messageRef} onChange={handlechange} placeholder="Message" name="description" className="form-control" />
                        <p className="text-danger mb-0">{error.description}</p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" onClick={postdata} className="btn btn-primary">
                        Send Notification
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive mt-2">
                <table className="table table-striped tableICon">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No.</th>
                      <th scope="col">Title</th>
                      <th scope="col">Message</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ border: "none" }}>
                    {data.length > 0 && data.map((item, index) => {
                      const date = new Date(item?.created_at);
                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      });
                      return (
                        <tr className="border-bottom" key={index}>
                          <th>{index + 1}</th>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>{formattedDate}</td>
                          <td>
                            <div className="action_btn1">
                              <AiFillDelete className="text-danger" onClick={() => handledelete(item.id)} style={{cursor:"pointer"}} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div >
          <ToastContainer />
        </div >
      </div >
    </>
  );
};

export default Notification;
