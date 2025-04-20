import { useEffect, useState } from 'react'
import './App.css'
import { getFire } from "../firebase"
import { addDoc, collection, deleteDoc, doc, getDocs ,getDoc} from "firebase/firestore"


function App() {
  const [emp, setemp] = useState([]);
  const [employee,setEmployee]=useState([]);
  const[empId,setEmpid]=useState([])
  useEffect(() => {
    alldata();
  }, [setemp])
  let alldata = async () => {
    let allRecord = await getDocs(collection(getFire, "employees"));
    let newArray = [];
    allRecord.forEach((doc) => {
      console.log(doc.id, doc.data())
      let obj = { ...doc.data(), ["id"]: doc.id };
      newArray.push(obj)
    })
    setemp(newArray);
  }
 

  let deleteEmp=async(id)=>{
    console.log(id)
    await deleteDoc(doc(getFire,"employees",id));
    alldata();

  }

  let getInput =(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setEmployee({...employee,[name]:value})
  }
  let submitData = async (e) => {
    e.preventDefault();
    console.log(employee); 
    if (employee.name && employee.Age) {
      await addDoc(collection(getFire, "employees"), employee);
      setEmployee({});
      alldata(); 
    } else {
      alert("Please fill in all fields!");
    }
  };

 
  let updateEmp = async (id) => {
    const sigEmp = doc(getFire, "employees", id);
    const empdata = await getDoc(sigEmp);

    if (empdata.exists()) {
      setEmployee(empdata.data());
      setEmpid(id); 
    } else {
      console.log("No such document!");
    }
  };
  return (
    <>
      <div>
        <h2>Data Set</h2>
        <form method="post" onSubmit={(e)=>submitData(e)}>
        <table border={1}>
          <tr>
            <td>Enter Name</td>
            <td>
              <input type="text" name="name" onChange={(e)=>getInput(e)}
              value={employee.name?employee.name:""}>
              </input>
            </td>
          </tr>
          <tr>
          <td>Enter Age</td>
          <td>
              <input type="text" name="Age" onChange={(e)=>getInput(e)}
              value={employee.Age?employee.Age:""}></input>
            </td>
          </tr><tr>
            <td>Submit</td>
            <td>
              <input type="submit" name="submit" value={empId?"Edit":"Submit"}></input>
            </td>
          </tr>
        </table>
        </form>
        <br>
        </br>
        <table border={1}>
        <tbody>
                <tr>
                  <td>No</td>
                  <td>Name</td>
                  <td>Age</td>
                  <td>Action</td>
                </tr>
              </tbody>
          {emp.map((v, i) => {
            return (
              <tbody>
                <tr>
                <td>{++i}</td>

                  <td>{v.name}</td>
                  <td>{v.Age}</td>
                  <td>
                    <button onClick={()=>deleteEmp(v.id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={()=>updateEmp(v.id)}>Update</button>
                  </td>
                </tr>
              </tbody>

            )
          })}
        </table>
      </div>
    </>
  )
}

export default App
