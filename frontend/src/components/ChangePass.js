import React, {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import AuthContext from "./AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   ModalBody,Modal , ModalFooter , Form,Input , FormGroup , Label , Button, Container, Row , Col ,Alert
} from 'reactstrap';
 
function ChangePass() {
    const navigate = useNavigate();
 
    const [oldpass, setoldpass] = useState("");
    const [newpass, setnewpass] = useState("");
    const [ newpassverify,setnewpassverify] = useState("");
    const[show ,setShow]= useState(false);
    const { getLoggedIn } = useContext(AuthContext);
   
   
    async function changepass(e) {
      e.preventDefault();
  
      try {
        const loginData = {
          oldpass,
          newpass,
          newpassverify
        };
          await Axios.post("http://localhost:8000/authorize/changepass",loginData); 
          setShow(true) ;
          
        }
        catch(err){
          console.error(err);
        }}
      async function handlelogin(){
        await Axios.get("http://localhost:8000/authorize/logout");
        await getLoggedIn();
        navigate('/authorize/login', { replace: true });

        }
      async function handlehomepage(){
          navigate('/user', { replace: true });
        }
  return(
    <div>
       <Modal isOpen={show}  >
       <ModalBody>
          You have Successfully Changed your Password!!
        </ModalBody>
        <ModalFooter>
          <Button
           
            onClick={() => handlelogin()}
          >
            Log in again
          </Button>
        
          <Button onClick={()=>handlehomepage()}>
            go to homepage
          </Button>
        </ModalFooter>
      </Modal>
        <h1>Change Password</h1>
        <Form onSubmit={changepass}>
        <FormGroup>
      <Label >
        old password:
      </Label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setoldpass(e.target.value)}
            value={oldpass}
          />
          </FormGroup>
          <FormGroup>
      <Label >
       New Password:
      </Label>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setnewpass(e.target.value)}
            value={newpass}
          />
          </FormGroup>
          <FormGroup>
      <Label >
       Verify New Password:
      </Label>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setnewpassverify(e.target.value)}
            value={newpassverify}
          />
          </FormGroup>
        
          
      
          <button type="submit">Change Password</button>
  
        </Form>
  </div>
  );
}
export default ChangePass;