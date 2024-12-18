import React from "react";
import image from "../Assests/favicon.png";
import image2 from "../Assests/img2.png";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import { MdDownloadForOffline } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Waybill() {
  const location = useLocation();
  const navigate = useNavigate();
  const getdat = location.state.data;
  console.log(getdat);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const handleclicknav = () => {
    navigate("/Admin/order");
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row manageFreight">
                <div className="col-12">
                  <div className="d-flex justify-content-between ">
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon
                          onClick={handleclicknav}
                          className="text-dark"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <h4 className="freight_hd ms-3">Waybill</h4>
                      </div>
                    </div>
                    <MdDownloadForOffline
                      className="fs-2"
                      onClick={() => toPDF()}
                      style={{ color: "#1b2245" }}
                    />
                  </div>
                </div>
              </div>
              <section
                ref={targetRef}
                style={{ marginTop: "10px", padding: "30px" }}
              >
                <div
                  style={{
                    height: "auto",
                    width: "100%",
                    border: "1px solid black",
                    padding: "10px",
                    outline: "auto",
                  }}
                >
                  <table style={{ border: "1px solid black", width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <table
                            style={{
                              borderBottom: "1px solid black",
                              width: "100%",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    width: "40%",
                                    padding: "20px",
                                    textAlign: "center",
                                  }}
                                >
                                  <img
                                    src={image}
                                    style={{
                                      width: "100px",
                                      height: 60,
                                      objectFit: "contain",
                                    }}
                                  />
                                </td>
                                <td style={{ width: "60%", paddingBottom: 20 }}>
                                  <table>
                                    <tbody>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                          }}
                                        >
                                          Consignor:
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                          }}
                                        >
                                          {getdat?.shipper_address}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                          }}
                                        >
                                          Email
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                          }}
                                        >
                                          {getdat?.shipper_email}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                          }}
                                        >
                                          Telephone
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                          }}
                                        >
                                          {getdat?.shipper_tel}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            style={{
                              borderTop: "1px solid black",
                              width: "100%",
                              marginTop: 10,
                            }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ verticalAlign: "sub" }}>
                                  <table
                                    style={{
                                      width: "100%",
                                      height: 130,
                                      borderBottom: "1px solid black",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <tbody>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            paddingLeft: 10,
                                            width: "20%",
                                            verticalAlign: "baseline",
                                          }}
                                        >
                                          Consignee:
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                          }}
                                        >
                                          {getdat.client_name}
                                          <br />
                                          {getdat.client_email}
                                          <br />
                                          {getdat.address_1}
                                          <br />
                                          {getdat.city}
                                          <br />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      borderTop: "1px solid black",
                                      width: "100%",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td className="w-100">
                                          <Barcode
                                            value={`OR000${getdat?.order_id}`}
                                            width={2} // Adjust the width here
                                            height={50}
                                            format="CODE128"
                                            displayValue={true}
                                            fontOptions=""
                                            font="monospace"
                                            textAlign="center"
                                            textPosition="bottom"
                                            textMargin={2}
                                            fontSize={20}
                                            background="#ffffff"
                                            lineColor="#000000"
                                            margin={10}
                                          />
                                          <p
                                            style={{
                                              textAlign: "center",
                                              fontWeight: 600,
                                              margin: 0,
                                            }}
                                          >
                                            {/* <bold>Order No</bold>  24DL161AIS518 */}
                                          </p>
                                          <table
                                            style={{
                                              borderTop: "1px solid black",
                                              width: "100%",
                                              borderBottom: "1px solid black",
                                              marginBottom: 10,
                                            }}
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style={{
                                                    fontSize: 15,
                                                    fontWeight: 700,
                                                    paddingLeft: 10,
                                                  }}
                                                >
                                                  Order No:
                                                </td>
                                                <td>
                                                  <button
                                                    type="button"
                                                    style={{
                                                      backgroundColor:
                                                        "lightgrey",
                                                      color: "black",
                                                      padding: "0px 40px",
                                                      border: 0,
                                                      borderRadius: 20,
                                                      width: "100%",
                                                      margin: "3px 0px",
                                                    }}
                                                  >
                                                    DL161
                                                  </button>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      borderTop: "1px solid black",
                                      width: "100%",
                                      marginBottom: 35,
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                            textDecorationLine: "underline",
                                            fontStyle: "italic",
                                          }}
                                        >
                                          Delivery Instructions:
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "2px solid black",
                                            width: "100%",
                                            paddingTop: 10,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "2px solid black",
                                            width: "100%",
                                            paddingTop: 10,
                                          }}
                                        >
                                          {getdat?.special_comments}
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "2px solid black",
                                            width: "100%",
                                            paddingTop: 10,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "2px solid black",
                                            width: "100%",
                                            paddingTop: 10,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "2px solid black",
                                            width: "100%",
                                            paddingTop: 10,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "2px solid black",
                                            width: "100%",
                                            paddingTop: 10,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  style={{
                                    borderLeft: "1px solid black",
                                    verticalAlign: "sub",
                                  }}
                                >
                                  <table
                                    style={{
                                      width: "100%",
                                      height: 160,
                                      borderBottom: "1px solid black",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <tbody>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                            textAlign: "start",
                                            width: "20%",
                                          }}
                                        >
                                          Ship Date:
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            paddingRight: 30,
                                            textAlign: "end",
                                          }}
                                        >
                                          {new Date(
                                            getdat.date_dispatched
                                          ).toLocaleDateString("en-GB")}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                            textAlign: "start",
                                            width: "20%",
                                          }}
                                        >
                                          Recipt Ref:
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            paddingRight: 30,
                                            textAlign: "end",
                                          }}
                                        >
                                          {getdat.freight_number}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                            textAlign: "start",
                                            width: "20%",
                                          }}
                                        >
                                          Weight(kgs):
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            paddingRight: 30,
                                            textAlign: "end",
                                          }}
                                        >
                                          {getdat?.weight}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                            textAlign: "start",
                                            width: "20%",
                                          }}
                                        >
                                          Dims(cbm):
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            paddingRight: 30,
                                            textAlign: "end",
                                          }}
                                        >
                                          {getdat?.dimension}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            paddingLeft: 10,
                                            textAlign: "start",
                                            width: "20%",
                                          }}
                                        >
                                          Carton(qty):
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            paddingRight: 30,
                                            textAlign: "end",
                                          }}
                                        >
                                          {getdat?.cartons}
                                        </td>
                                      </tr>

                                      {/* <tr style={{ verticalAlign: "sub" }}>
                                                                <td
                                                                    style={{
                                                                        fontSize: 12,
                                                                        fontWeight: 700,
                                                                        paddingLeft: 10,
                                                                        textAlign: "end",
                                                                        width: "20%"
                                                                    }}
                                                                >
                                                                    Handling:
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        fontSize: 12,
                                                                        fontWeight: 600,
                                                                        paddingRight: 30,
                                                                        textAlign: "end"
                                                                    }}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        style={{
                                                                            backgroundColor: "lightgrey",
                                                                            color: "black",
                                                                            padding: "0px 15px",
                                                                            border: 0,
                                                                            borderRadius: 20
                                                                        }}
                                                                    >
                                                                        Handle With Care
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr style={{ verticalAlign: "sub" }}>
                                                                <td
                                                                    style={{
                                                                        fontSize: 12,
                                                                        fontWeight: 700,
                                                                        paddingLeft: 10,
                                                                        textAlign: "end",
                                                                        width: "20%"
                                                                    }}
                                                                >
                                                                    Consolidate:
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        fontSize: 12,
                                                                        fontWeight: 600,
                                                                        paddingRight: 30,
                                                                        textAlign: "end"
                                                                    }}
                                                                >
                                                                    Asia Direct-Africa
                                                                </td>
                                                            </tr>  */}
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      borderTop: "1px solid black",
                                      width: "100%",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            textDecorationLine: "underline",
                                            paddingLeft: "10px",
                                          }}
                                        >
                                          Warehouse Details
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <p
                                            style={{
                                              fontSize: 12,
                                              marginBottom: 27,
                                              marginTop: 15,
                                              fontWeight: 500,
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            {getdat.warehouse_name}
                                            <br />
                                            {getdat.warehouse_address}
                                            <br />

                                            <br />
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      borderTop: "1px solid black",
                                      width: "100%",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td style={{ textAlign: "center" }}>
                                          <img
                                            src={image2}
                                            style={{
                                              width: "100px",
                                              height: 130,
                                              objectFit: "contain",
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
