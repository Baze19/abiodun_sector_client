// import { Cascader } from "antd";

import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home(): JSX.Element {

 const navigate = useNavigate()
  const [post, setPost]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [defVal, setDefVal] = useState("");

  const [sectorData, setSectorData] = useState({
    firstName: " ",
    lastName: " ",
    term: false,
  });


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const Body = {
        name: `${sectorData?.firstName}  ${sectorData?.lastName}`,
        selectedSector: defVal,
        term: sectorData?.term,
      };
      setLoading(true);

      const responseData = await axios.post(
        "https://tame-blue-clownfish-sock.cyclic.app/api/sector/newUser",
        Body
      );
     

      setLoading(false);

      responseData.data.success ? navigate("/list") : "";
  

    
    } catch (error: any) {
      throw new Error(error.message);;
    }
  };


  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    async function fetchSector() {
      const response: any = await axios.get(
        "https://tame-blue-clownfish-sock.cyclic.app/api/sector/getAllSectors"
      );
      setPost(response.data.data);
    }
    fetchSector();
  }, []);



  return (
    <>
      {loading && showToastMessage()}
      <ToastContainer />
      <main
          id="content"
          role="main"
          className="main"
          style={{ backgroundColor: "#fbfbfb" }}
        >
          <div className="content container">
            <div className="page-header">
              <div className="row align-items-end">
                <div className="col-sm mb-2 mb-sm-0">
                  <h1 className="page-header-title">Profile</h1>
                </div>
              </div>
            </div>
            {post.length !== 0 && (
              <div className="row text-center">
                <div className="col-lg-9 mx-auto">
                  <div className="d-grid gap-3 gap-lg-5">
                    <div className="card">
                      <div className="card-header">
                        <h2 className="card-title h4">
                          Please enter your name and pick the Sectors you are
                          currently involved in.
                        </h2>
                      </div>

                      <div className="card-body">
                        <div>
                          <div className="row mb-4">
                            <label
                              htmlFor="firstNameLabel"
                              className="col-sm-3 col-form-label form-label"
                            >
                              Full name
                              {/* <i
                              className="bi-question-circle text-body ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Displayed on public forums, such as Front."
                            ></i> */}
                            </label>

                            <div className="col-sm-9">
                              <div className="input-group input-group-sm-vertical">
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  name="firstName"
                                  id="firstNameLabel"
                                  placeholder="Your first name"
                                  aria-label="Your first name"
                                  value={sectorData.firstName}
                                  onChange={(e) =>
                                    setSectorData({
                                      ...sectorData,
                                      firstName: e.target.value,
                                    })
                                  }
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  name="lastName"
                                  id="lastNameLabel"
                                  placeholder="Your last name"
                                  aria-label="Your last name"
                                  onChange={(e) =>
                                    setSectorData({
                                      ...sectorData,
                                      lastName: e.target.value,
                                    })
                                  }
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-4">
                            <label
                              htmlFor="departmentLabel"
                              className="col-sm-3 col-form-label form-label"
                            >
                              Sectors
                            </label>

                            <div className="col-sm-9">
                              <select
                                value={defVal}
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setDefVal(e.target.value);
                                }}
                              >
                                <option>Select sector</option>
                                {post.map((val: any, index: number) => (
                                  <option key={index} value={val?.id}>
                                    {val?.nameOfSector}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="row align-items-center mb-4">
                            <label className="col-sm-3 col-form-label form-label">
                              Agree to terms
                              <span className="badge bg-primary text-uppercase ms-1"></span>
                            </label>

                            <div className="col">
                              <div className="form-check">
                                <input
                                  required
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) =>
                                    setSectorData({
                                      ...sectorData,
                                      term: e.target.checked,
                                    })
                                  }
                                  id="flexCheckDefault"
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Check this checkbox to continue.
                                </div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-end">
                             
                             
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                              >
                                {loading
                                  ? "Loading,please wait....."
                                  : "save changes"}
                               
                              </button>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="stickyBlockEndPoint"></div>
                </div>
              </div>
            )}

            {post.length === 0 && (
              <div style={{ textAlign: "center", color: "white" }}>
                <h2>No sectors yet. Please kindly wait</h2>
              </div>
            )}
          </div>
        </main>
    </>
  );
}

export default Home;
