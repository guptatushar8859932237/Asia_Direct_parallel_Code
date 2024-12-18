import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function Freightbyuserdetail() {
  const infolocation = useLocation()
  const navigate = useNavigate()
  const info = (infolocation?.state?.data[0])
  console.log(infolocation?.state?.data[0])


  const handleclicknav =()=>{
    navigate('/Admin/freight')
  }
  return (

    <div className="wpWrapper sidebar123">
      <div className='container-fluid'>
        <div className="formDetails">
          <div className="row">
            <div className="col-lg-12 px-0">
              <div className='d-flex'>
                  <div>
                    <ArrowBackIcon onClick={handleclicknav} style={{cursor:"pointer"}}/>
                      </div>
                
                  <div>
                <h4 className='det_hd ms-3'>User Freight Details</h4>
                
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md-4  pe-4'>
              <div className='card desti_card'>
                <div className='card-body'>
                  <div className=''>
                    <h6 className='orgin_hd'>Shipper Details</h6>
                    <span className='line'></span>
                  </div>
                  <div className='main_det'>
                    <div className='view_box'>
                      <h6 className='ship_hd'>Shipper</h6>
                      <div className='d-flex align-items-start'>
                        <i class="fi fi-rs-building build_icon"></i>
                        <div className=''>
                          <p className='or_para'>{info.shipper_name}</p>
                          <p className='client_para'>{info.client_name}</p>
                          {/* <p className='client_para'>{info.cellphone}</p> */}
                          <p className='client_para'>{info.supplier_address}</p>
                        </div>
                      </div>
                    </div>
                    <div className='view_box'>
                      <h6 className='ship_hd'>Pickup Address</h6>
                      <div className='d-flex align-items-start'>
                        <div className=''>
                          {/* <img src={Country} className='count_img' />  */}
                        </div>
                        <div className=''>
                          <p className='or_para'>{info.collection_from_country}</p>
                          <p className='client_para'>{info.supplier_address}</p>
                          {/* <p className='client_para'>Glan Marias,2 Annemoon Rd,Unit-4,</p>
                          <p className='client_para'>KEMPTON PARK,1619,GP</p> */}
                        </div>
                      </div>
                    </div>
                    <div className='view_box'>
                      <h6 className='ship_hd'>Exporter</h6>
                      <div className='d-flex align-items-start'>
                        <i class="fi fi-rs-building build_icon"></i>
                        <div className=''>
                          <p className='or_para'>{info.shipper_name}</p>
                          <p className='client_para'>Export Code:{info.code}</p>
                          <p className='client_para'>Vat Number:{info.tax_ref}</p>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <div className='d-flex align-items-start'>
                        <i class="fi fi-rr-marker build_icon"></i>
                        <div className=''>
                          <p className='client_para'>{info.address_1}</p>
                          {/* <p className='client_para'>Glan Marias,2 Annemoon Rd,Unit-4,</p>
                          <p className='client_para'>KEMPTON PARK,1619,GP</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card desti_card'>
                <div className='card-body'>
                  <div className=''>
                    <h6 className='orgin_hd'>Consignee Details</h6>
                    <span className='line'></span>
                  </div>
                  <div className='main_det'>
                    <div className='view_box'>
                      <h6 className='ship_hd'>Consignee</h6>
                      <div className='d-flex align-items-start'>
                        <i class="fi fi-rs-building build_icon"></i>
                        <div className=''>
                          <p className='or_para'>{info.client_name}</p>
                          <p className='client_para'>{info.shipper_name}</p>
                          <p className='client_para'>{info.cellphone}</p>
                          <p className='client_para'>{info.client_email}</p>
                        </div>
                      </div>
                    </div>
                    <div className='view_box'>
                      <h6 className='ship_hd'>Delivery Address</h6>
                      <div className='d-flex align-items-start'>
                        <div className=''>
                          {/* <img src={Country} className='count_img'/>  */}
                        </div>
                        <div className=''>
                          <p className='or_para'>{info.delivery_to_country}</p>
                          <p className='client_para'>{info.supplier_address}</p>
                          {/* <p className='client_para'>Glan Marias,2 Annemoon Rd,Unit-4,</p>
                          <p className='client_para'>KEMPTON PARK,1619,GP</p> */}
                        </div>
                      </div>
                    </div>
                    <div className='view_box'>
                      <h6 className='ship_hd'>Importer</h6>
                      <div className='d-flex align-items-start'>
                        <i class="fi fi-rs-building build_icon"></i>
                        <div className=''>
                          <p className='or_para'>{info.importers_ref}</p>
                          <p className='client_para'>Export Code:{info?.code}</p>
                          <p className='client_para'>Vat Number:{info.tax_ref}</p>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <div className='d-flex align-items-start'>
                        <i class="fi fi-rr-marker build_icon"></i>
                        <div className=''>
                          <p className='client_para'>{info.place_of_delivery}</p>
                          <p className='client_para'>
                            {info.address_1}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4 ps-4'>
              <div className='card desti_card'>
                <div className='card-body'>
                  <div className=''>
                    <h6 className='orgin_hd'>Booking Information</h6>
                    <span className='line'></span>
                  </div>
                  <div className='main_det'>
                    <div class="table-responsive">
                      <table class="det_show">
                        <tbody>
                          <tr>
                            <td>
                              <p className='ship_hd'>POL Information</p>
                            </td>
                          </tr>
                          <tr>
                            <td class="fright_num"><p class="client_para1">Place of loading:</p></td>
                            <td><p class="client_para1"></p></td>
                          </tr>
                          <tr>
                            <td><p class="client_para1">Port of Loading:</p></td>
                            <td><p class="client_para1">{info.port_of_loading}</p></td>
                          </tr>
                          <tr>
                            <td className='instr_td'>
                              <p className='client_para1 mb-3'>Instructions:</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3'>{info.shipment_origin}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className='ship_hd'>Transit Information</p>
                            </td>
                          </tr>
                          <tr>
                            <td><p class="client_para1">Freight Option:</p></td>
                            <td><p class="client_para1">{info.freight}</p></td>
                          </tr>
                          <tr>
                            <td><p class="client_para1">Efficiency:</p></td>
                            <td><p class="client_para1">{info.freight_type}</p></td>
                          </tr>
                          <tr>
                            <td><p class="client_para1 mb-3">Incoterms:</p></td>
                            <td><p class="client_para1 mb-3">{info.incoterm}</p></td>
                          </tr>
                          <tr>
                            <td><p class="client_para1 mb-3">Type:</p></td>
                            <td><p class="client_para1 mb-3">{info.fcl_lcl}</p></td>
                          </tr>
                          {/* <tr>
                            <td><p class="client_para1">Insurance:</p></td>
                            <td><p class="client_para1">Yes</p></td>
                          </tr> */}
                          {/* <tr>
                            <td><p class="client_para1 mb-3">Warehouse:</p></td>
                            <td><p class="client_para1 mb-3">xxxxxxxxxx</p></td>
                          </tr> */}
                          <tr>
                            <td>
                              <p className='ship_hd'>POD Information</p>
                            </td>
                          </tr>
                          <tr>
                            <td><p class="client_para1">Place of delivery:</p></td>
                            <td><p class="client_para1">{info.place_of_delivery}</p></td>
                          </tr>
                          <tr>
                            <td><p class="client_para1">Port of Discharge:</p></td>
                            <td><p class="client_para1">{info.post_of_discharge}</p></td>
                          </tr>
                          <tr>
                            <td className='instr_td'>
                              <p className='client_para1 mb-3'>Instructions:</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3'>{info.shipment_des}</p>
                            </td>
                          </tr>
                          <tr>
                            <td><p class="ship_hd">Comment</p></td>
                            <td><p class="client_para1">{info.comment}</p></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="view_card">
            <div className='row'>
              <div className='col-md-4 pe-4'>
                <div className='card desti_card1'>
                  <div className='card-body'>
                    <div className=''>
                      <h6 className='orgin_hd'>Cargo Details</h6>
                      <span className='line'></span>
                    </div>
                    <div className='main_det'>
                      <div class="table-responsive">
                        <table class="det_show">
                          <tbody>
                            <tr>
                              <td class="fright_num"><p class="client_para1">Product Description:</p></td>
                              <td><p class="client_para1">{info.product_desc}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">Hazardous:</p></td>
                              <td><p class="client_para1">{info.hazardous}</p></td>
                            </tr>
                            {/* <tr>
                              <td><p class="client_para1">Type:</p></td>
                              <td><p class="client_para1">{info.fcl_lcl}</p></td>
                            </tr> */}
                            <tr>
                              <td><p class="client_para1">Industry:</p></td>
                              <td><p class="client_para1">{info.nature_of_goods}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">Commodity:</p></td>
                              <td><p class="client_para1">{info.commodity_name}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">Packaging:</p></td>
                              <td><p class="client_para1">{info.package_type}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">No of Packages:</p></td>
                              <td><p class="client_para1">{info.no_of_packages}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">Dimensions(cbm):</p></td>
                              <td><p class="client_para1">{info.dimension}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">Weight(kgs):</p></td>
                              <td><p class="client_para1">{info.weight}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">Vol weight(kgs):</p></td>
                              <td><p class="client_para1">{info.volumetric_weight}</p></td>
                            </tr>
                            <tr>
                              <td><p class="client_para1">Chargeable weight:</p></td>
                              <td><p class="client_para1"></p></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='col-md-4'>
              <div className='card desti_card1'>
                <div className='card-body'>
                  <div className=''>
                    <h6 className='orgin_hd'>Shipping Estimate</h6>
                    <span className='line'></span>
                  </div>
                  <div className='main_det'>
                    <div className='table-responsive'>
                      <table className='det_show'>
                        <thead>
                          <tr>
                            <td className='ship_hd1'></td>
                            <td className='ship_hd2'>Currency</td>
                            <td className='ship_hd3 '>Cost</td>
                            <td className='ship_hd4'>Billing</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='ship_hd'>Freight<br />
                              <p className='client_para1 mb-3'>{info?.freight}</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3 ps-4'>{info?.estimate_freight_currency}</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3 ps-4'>{info?.estimate_freight_amount}</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3 ps-2'>{info?.estimate_freight_gp}</p>
                            </td>
                          </tr>
                          <tr>
                            <td className='ship_hd'>Origin Charges<br />
                              <p className='client_para1'>Origin Pickup</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3 ps-4'>{info?.estimate_origin_warehouse}</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3 ps-4'>{info?.estimate_origin_warehouse}</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3 ps-2'>{info?.estimate_origin_warehouse_gp}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">Origin Customs</p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">
                             Origin Document
                              </p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">
                             Origin Warehouse
                              </p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">
                             Origin Port Fees
                              </p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1 mb-3">
                             Origin Other
                              </p>
                            </td>
                            <td>
                              <p className="client_para1 mb-3"></p>
                            </td>
                            <td>
                              <p className="client_para1 mb-3"></p>
                            </td>
                          </tr>
                          {/* <tr>
                            <td>
                              <p className='client_para1 mb-3'>Origin Handling</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3'>{info?.estimate_origin_pick_up}</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3'>{info?.estimate_origin_pickup_gp}</p>
                            </td>
                            <td>
                              <p className='client_para1 mb-3'>{info?.estimate_origin_pickup_gp}</p>
                            </td>
                          </tr> */}
              {/* <tr>
                            <td className='ship_hd'>Destination Charges<br />
                              <p className='client_para1'>Delivery</p>
                            </td>
                            <td>
                              <p className='client_para1'>{info?.estimate_des_warehouse}</p>
                            </td>
                            <td>
                              <p className='client_para1'>{info?.estimate_des_warehouse_gp}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">Destination Customs</p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">Destination Documents</p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">Destination Warehouse</p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">Destination Port Fees</p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className="client_para1">Destination Unpack</p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                            <td>
                              <p className="client_para1"></p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className='client_para1'>Destination Other</p>
                            </td>
                            <td>
                              <p className='client_para1'>{info?.estimate_des_delivery}</p>
                            </td>
                            <td>
                              <p className='client_para1'>{info?.estimate_des_delivery_gp}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
              <div className='col-md-4'>
                <div className='card desti_card'>
                <div className="card-body">
                    {
                      info?.add_attachment_file ===null?(
                        <>
                        <h6 className="orgin_hd">Attachments</h6>
                        <p>No Document Uploaded</p>
                        </>
                      ):(
                        <>
                      
                        <div className="">
                        <h6 className="orgin_hd">Attachments</h6>
                        <span className="line"></span>
                        <div className="d-flex align-items-center">
                          <a
                            href={`${process.env.REACT_APP_BASE_URLdocument}${info?.add_attachment_file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view_docu"
                          >
                            View Document
                          </a>
                        </div>
                      </div>
                      </>
                      )
                    }
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}