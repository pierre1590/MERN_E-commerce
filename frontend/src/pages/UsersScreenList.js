import React, {useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'
import{Table,Button,Modal} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import {listUsers, deleteAdminUser} from '../actions/userActions'
import {FaCheck, FaTimes, FaEdit, FaTrashAlt} from 'react-icons/fa'


const UsersScreenList = () => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDeleteAdmin = useSelector(state => state.userDelete)
    const {success:successDelete} = userDeleteAdmin

    

    const handleClose = (state) => setShow(false)
    const handleShow = (state) => setShow(true)

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else {
            navigate('/login')
        }    
    },[dispatch,navigate,successDelete,userInfo])

    const deleteHandler = (id) => {
        dispatch(deleteAdminUser(id))
        window.location.reload()
    }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsivee className="table-sm" style={{ textAlign: 'center' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <><tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green", textAlign: "center" }} />
                      ) : (
                        <FaTimes style={{ color: "red", textAlign: "center" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/user/${user._id}/edit`}>
                        <Button variant="light" className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className='btn-sm' onClick={handleShow}>
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr><Modal
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                    onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Account</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p style={{ fontSize: 20 }}>Are you sure you want to delete this account?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        {/* Create a button to delete an account with the id of the account */}
                        <Button variant="danger" onClick={() => deleteHandler(user._id)}>
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal></>
              ))}
            </tbody>
            </Table>
      )}
    </>
  );
}

export default UsersScreenList;
