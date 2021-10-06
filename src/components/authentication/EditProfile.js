   
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
export default function EditProfile() {
    const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
    return (
        <CenteredContainer>
              <div className="w-100" style={{maxWidth:'400px'}}>
              <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Edit Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Update Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
                placeholder="Enter the new email"
              />
            </Form.Group >
            <hr />
            <Form.Group id="password" className="mt-4 mb-1">
              <Form.Label>Update Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="New Password"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Re-enter New Password"
              />
            </Form.Group>
            <hr />
            <small className="text-secondary">Note : You only have to fill up the fields which are to be updated and empty the remaining ones.</small>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
     </div>
        </CenteredContainer>
    )
}
