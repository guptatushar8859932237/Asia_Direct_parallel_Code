import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function UpdateDelivery() {
    const navigate = useNavigate();
    const location = useLocation();

    const [datataup, setDatataup] = useState({
        order_id: "", status: "", date_dispatched: "", ETA: "", actual_delivery_date: "", freight_option: "",
        port_of_loading: "", port_of_discharge: "", co_loader: "", carrier: "", vessel: "", master_landing_bill: "",
        house_bill_landing: "", release_type: "", container_no: "", seal_no: "", local_handler: "", local_carrier: "",
        driver_name: "", vehicle_registration: "", comments: "", last_check_in: "", location_check_in: "",
        driver_license_id: "", days_to_arrival: ""
    });

    const allldata = location?.state?.data;

    const handlechange = (e) => {
        const { name, value } = e.target;
        setDatataup(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const alldataapi = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}get-delivery-details`, {
            order_id: allldata?.order_id
        }).then((response) => {
            setDatataup(response.data.data);
        }).catch((error) => {
            console.log(error.response.data);
        });
    };

    useEffect(() => {
        alldataapi();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const dateObj = new Date(dateStr);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = formatDate(datataup.date_dispatched);
    const today1 = formatDate(datataup.ETA);
    const today12 = formatDate(datataup.actual_delivery_date);

    const handlevalidate = () => {
        const updaata = {
            order_id: allldata?.order_id,
            status: datataup?.status,
            date_dispatched: today,
            ETA: today1,
            actual_delivery_date: today12,
            freight_option: datataup?.freight_option,
            port_of_loading: datataup?.port_of_loading,
            port_of_discharge: datataup?.port_of_discharge,
            co_loader: datataup?.co_loader,
            carrier: datataup?.carrier,
            vessel: datataup?.vessel,
            master_landing_bill: datataup?.master_landing_bill,
            house_bill_landing: datataup?.house_bill_landing,
            release_type: datataup?.release_type,
            container_no: datataup?.container_no,
            seal_no: datataup?.seal_no,
            local_handler: datataup?.local_handler,
            local_carrier: datataup?.local_carrier,
            driver_name: datataup?.driver_name,
            vehicle_registration: datataup?.vehicle_registration,
            comments: datataup?.comments,
            last_check_in: datataup?.last_check_in,
            location_check_in: datataup?.location_check_in,
            driver_license_id: datataup?.driver_license_id,
            days_to_arrival: datataup?.days_to_arrival
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}update-delivery-details`, updaata).then((response) => {
            toast.success(response.data.message);
            if (response.data.success) {
                navigate('/Admin/order');
            }
        }).catch((error) => {
            console.log(error.response.data);
            toast.error(error.response.data.message);
        });
    };

    const handleclicknum = (e) => {
        if (e.charCode < 42 || e.charCode > 57) {
            e.preventDefault();
        }
    };
    const  handleclicknav =() =>{
        navigate('/Admin/order')
       }
    return (
        <>
            <div className='wpWrapper'>
                <div className='container-fluid'>
                    <div className="row  manageFreight">
                        <div className="col-12">
                            <div className="d-flex ">
                            <div className="d-flex">
                  <div>
                    <ArrowBackIcon
                      onClick={handleclicknav}
                      className="text-dark"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div>
                                    <h4 className="freight_hd ms-3">Update Delivery Detail's</h4>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card mt-4'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='updateLoading'>
                                        <div className="row">
                                            <div className='col-6'>
                                                <label>Client</label>
                                                <input name='full_name' onChange={handlechange} disabled value={datataup?.full_name} className='form-control'></input>
                                            </div>
                                            <div className='col-6'>
                                                <label>Driver License Id</label>
                                                <input className="form-control" placeholder='Driver license Id' onChange={handlechange} value={datataup?.driver_license_id} name='driver_license_id' ></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className='col-6'>
                                                <label>Status</label>
                                                <select className='form-control' onChange={handlechange} name='status' value={datataup?.status}>
                                                    <option>Select......</option>
                                                    <option>Ready For Dispatch</option>
                                                    <option>In Transit</option>
                                                    <option>At Local Port</option>
                                                    <option>On Carriage</option>
                                                    <option>Delivered</option>
                                                </select>
                                            </div>
                                            <div className='col-6'>
                                                <label>Date Dispatched</label>
                                                <input type='date' value={today} onChange={handlechange} name='date_dispatched' className='form-control'></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className=' col-6'>
                                                <label>ETA</label>
                                                <input type='date' name='ETA' value={today1} onChange={handlechange} className='form-control'></input>
                                            </div>
                                            <div className='col-6'>
                                                <label>Actual Date of Delivery </label>
                                                <input type="date" name='actual_delivery_date' value={today12} onChange={handlechange} className='form-control' />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className='col-6'>
                                                <label>Freight Option</label>
                                                <select className='form-control' onChange={handlechange} value={datataup.freight_option} name='freight_option' placeholder='http:'>
                                                    <option>Select......</option>
                                                    <option>Air</option>
                                                    <option>Sea</option>
                                                    <option>Road</option>
                                                </select>
                                            </div>
                                            <div className='col-6'>
                                                <label>Port Of Loading</label>
                                                <input type='text ' name='port_of_loading' onChange={handlechange} value={datataup?.port_of_loading} className='form-control' placeholder='Port of Loading'></input>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className='col-6'>
                                                <label>Port Of Discharge</label>
                                                <input type='text' name='port_of_discharge' onChange={handlechange} value={datataup?.port_of_discharge} className='form-control' placeholder='Port Of Discharge'></input>
                                            </div>
                                            <div className='col-6'>
                                                <label>Co Loader</label>
                                                <select type='text' name='co_loader' onChange={handlechange} value={datataup?.co_loader} className='form-control' placeholder='Co Loader'>
                                                    <option>Select......</option>
                                                    <option>SACO CFR</option>
                                                    <option>OBD Logistics</option>
                                                    <option>Shenzhen Nimbus</option>
                                                    <option>My Shipments</option>
                                                    <option>Fedex</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className='col-6'>
                                                <label>Carrier</label>
                                                <input className='form-control' onChange={handlechange} value={datataup?.carrier} name='carrier' placeholder='Carrier' />
                                            </div>
                                            <div className='col-6'>
                                                <label>Vessel</label>
                                                <input className='form-control' onChange={handlechange} value={datataup?.vessel} name='vessel' placeholder='Vessel' />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <label>Master  Bill of Landing</label>
                                                <input className='form-control' placeholder='Master Bill Of Landing' onChange={handlechange} value={datataup?.master_landing_bill} name='master_landing_bill' ></input>
                                            </div>
                                            <div className='col-6'>
                                                <label>House Bill of Landing</label>
                                                <input className='form-control' placeholder='House Bill Of Landing' onChange={handlechange} value={datataup?.house_bill_landing} name='house_bill_landing' ></input>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <label>Container No</label>
                                                <input className='form-control' onKeyPress={handleclicknum} placeholder='00000' onChange={handlechange} value={datataup?.container_no} name='container_no' ></input>
                                            </div>
                                            <div className='col-6'>
                                                <label>Seal No</label>
                                                <input className='form-control' onKeyPress={handleclicknum} placeholder='0000' onChange={handlechange} value={datataup?.seal_no} name='seal_no' ></input>
                                            </div>
                                        </div>
                                        <div className=' row'>
                                            <div className='col-6'>
                                                <label>Local Handler</label>
                                                <select className='form-control' onChange={handlechange} value={datataup?.local_handler} name='local_handler'  >
                                                    <option>Select......</option>
                                                    <option>Asia Direct</option>
                                                    <option>Afristar</option>
                                                    <option>Thrutainers</option>
                                                    <option>Menzies international</option>
                                                    <option>Aero - Link Cargo</option>
                                                    <option>DN FREIGHT</option>
                                                    <option>UPS</option>
                                                    <option>Maersk Line</option>
                                                    <option>ETHIOPIAN AIRLINES</option>
                                                    <option>WORLD FLIGHT SERVICEZ</option>
                                                    <option>COSCO</option>
                                                    <option>CFR</option>
                                                    <option>Evergreen</option>
                                                    <option>SWISSPORT</option>
                                                    <option>MSC</option>
                                                    <option>CONTRA CONSOLIDATIONS</option>
                                                    <option>HAPAG LLOYD</option>
                                                </select>
                                            </div>
                                            <div className='col-6'>
                                                <label>Local Carrier</label>
                                                <select className='form-control' onChange={handlechange} value={datataup?.local_carrier} name='local_carrier' >
                                                    <option>Select......</option>
                                                    <option>Sanbro</option>
                                                    <option>Chris Trucking</option>
                                                    <option>Courier Guy</option>
                                                    <option>Asia Direct</option>
                                                    <option>Alpha Shipping</option>
                                                    <option>Greens Transport</option>
                                                    <option>SA Railway</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>Release Type</label>
                                                <select className='form-control' onChange={handlechange} value={datataup?.release_type} name='release_type' >
                                                    <option>select....</option>
                                                    <option>Express Bill of Loading</option>
                                                    <option>Original Bill of Loading</option>
                                                </select>

                                            </div>
                                            <div className="col-6">
                                                <label>Driver Name</label>
                                                <input type='text' className='form-control' placeholder='Driver Name' onChange={handlechange} value={datataup?.driver_name} name='driver_name' ></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label>Vehicle Registration</label>
                                                <input className='form-control' onChange={handlechange} placeholder='Vehicle Registration' value={datataup?.vehicle_registration} name='vehicle_registration' ></input>

                                            </div>
                                            <div className="col-6">
                                                <label>Last Check In</label><br />
                                                <input className='form-control' onChange={handlechange} placeholder='Last check In' value={datataup?.last_check_in} name='last_check_in' ></input>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">

                                                <label>Location Check In</label><br />
                                                <input className='form-control' placeholder='Location Check in' onChange={handlechange} value={datataup?.location_check_in} name='location_check_in' ></input>
                                            </div>
                                            <div className="col-6">
                                                <label>Days to Arrival</label><br />
                                                <input className='form-control' onKeyPress={handleclicknum} onChange={handlechange} placeholder='days_to_arrival' value={datataup?.days_to_arrival} name='days_to_arrival' ></input>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <label>Comments</label>
                                                <input className='form-control' placeholder="Comments" onChange={handlechange} value={datataup?.comments} name='comments' ></input>
                                            </div>
                                        </div>
                                        <div className='text-center mt-2'>
                                            <button type='button' onClick={handlevalidate}>Update Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div >
        </>
    )
}