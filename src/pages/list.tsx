import { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function List(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [list, setList]: any = useState([]);
 

  const handleEdit = (id:string) =>{
  
   navigate("/edit/" + id, {replace: true})
  }
  const handleDelete =async  (id:string) =>{
    try {
      setLoading(true)
      console.log(id,"id...")
      const response: any = await axios.delete(
        `https://tame-blue-clownfish-sock.cyclic.app/api/sector/deleteUser/${id}`
      );
      setLoading(false)
      response.data.success ? navigate("/list") : "";
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  useEffect(() => {
    async function fetchSector() {
      const response: any = await axios.get(
        "https://tame-blue-clownfish-sock.cyclic.app/api/sector//AllUsers"
      );
      setList(response.data.data);
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
                {/* <h1 className="page-header-title"> Edit Profile</h1> */}
                <div className="ms-auto d-flex justify-content-between">
                  <button >
                    <Link to ="/"> <span>
                      <i className="bi bi-plus-lg"></i>
                    </span>
                    Add New user</Link>
                   
                  </button>
                </div>
              </div>
            </div>
          </div>
        
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Sector</th>
                <th scope="col">Terms</th>
              </tr>
            </thead>

            <tbody>
            {list.map ((val:any,index:number) =>  
            <tr key={val._id}>
                <th scope="row">{index}</th>
                <td>{val.name}</td>
                <td>{val.selectedSector}</td>
                <td>{val.term? "true":"false"}</td>
                <td ><span onClick={()=>handleEdit(val._id)}><i className="bi bi-pencil"></i></span></td>
                <td  ><span  onClick={()=>handleDelete(val._id)}><i className="bi bi-x-circle-fill"></i></span> </td>
           
              </tr>)}
             
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
            <div style={{ textAlign: "center", color: "white" }}>
              <h2>Loading.....</h2>
            </div>
          )}
      </main>
    </>
  );
}

export default List;
