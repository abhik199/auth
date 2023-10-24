import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const Updateprofile = (props) => {
  const {
    id,
    full_name,
    email,
    phone,
    dob,
    gender,
    address,
    position,
    profile,
  } = props.data;

  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputField, setInputField] = useState({
    name: full_name,
    email: email,
    phone: phone,
    dob: dob,
    gender: gender,
    address: address,
    profile: profile,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputField({ ...inputField, [name]: value });
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    try {
      toast.success("Profile updated successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <Button variant='primary' className='btn btn-info' onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveChanges}>
            <Form.Group className='mb-2' controlId='profilePicture'>
              <Form.Control type='file' onChange={handleFileChange} />
            </Form.Group>

            {selectedFile ? (
              <div className='mb-2'>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt='Selected Profile'
                  width='100'
                  height='100'
                />
              </div>
            ) : (
              <div className='mb-2'>
                <img
                  src={inputField.profile}
                  alt='Placeholder Image'
                  width='100'
                  height='100'
                />
              </div>
            )}

            <Form.Group
              className='mb-2'
              controlId='exampleForm.ControlPosition'
            >
              <Form.Select
                name='position'
                value={inputField.position}
                onChange={inputHandler}
              >
                <option value='male'>Backend Developer</option>
                <option value='female'>Frontend Developer</option>
                <option value='other'>Full Stack Developer</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-2' controlId='name'>
              <Form.Control
                type='text'
                name='name'
                placeholder='Your Name'
                value={inputField.name}
                onChange={inputHandler}
              />
            </Form.Group>

            <Form.Group className='mb-2' controlId='email'>
              <Form.Control
                type='email'
                name='email'
                placeholder='name@example.com'
                value={inputField.email}
                onChange={inputHandler}
              />
            </Form.Group>
            <Form.Group className='mb-2' controlId='phone'>
              <Form.Control
                type='number'
                name='phone'
                placeholder='4645132468'
                value={inputField.phone}
                onChange={inputHandler}
              />
            </Form.Group>
            <Form.Group className='mb-2' controlId='date'>
              <Form.Control
                type='date'
                name='dob'
                value={inputField.dob}
                onChange={inputHandler}
                autoFocus
              />
            </Form.Group>
            <Form.Group className='mb-2' controlId='dob'>
              <Form.Select onChange={inputHandler} value={inputField.gender}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
              <Form.Control
                type='text'
                name='address'
                onChange={inputHandler}
                placeholder='address'
                value={inputField.address}
              />
            </Form.Group>

            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant='primary'>
              Save Changes
            </Button>
            <Toaster />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Updateprofile;
