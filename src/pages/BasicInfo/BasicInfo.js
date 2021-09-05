/* eslint-disable jsx-a11y/label-has-associated-control */
import {Component} from 'react'
import './BasicInfo.css'

class BasicInfo extends Component {
  state = {
    firstName: '',
    lastName: '',
    password: '',
    emailError: false,
    passwordError: false,
    emptyFirstName: false,
    emptyLastName: false,
  }

  onChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/userList')
  }

  onSubmitFailure = data => {
    console.log(data.error_msg)
  }

  submitHandler = async event => {
    event.preventDefault()
    const {firstName, lastName, password} = this.state
    const {match} = this.props
    const {email} = match.params

    const response = await fetch('https://testapi.webexcellis.in/api/users')
    const dataList = await response.json()
    const emailArray = []
    dataList.forEach(element => {
      emailArray.push(element.email)
    })

    if (emailArray.includes(email)) {
      this.setState({emailError: true})
    } else if (firstName.length === 0) {
      this.setState({emptyFirstName: true})
    } else if (lastName.length === 0) {
      this.setState({emptyLastName: true})
    } else if (password.length < 8) {
      this.setState({passwordError: true})
    } else {
      const result = await fetch(
        'https://testapi.webexcellis.in/api/users/signUp',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        },
      )
      const data = await result.json()
      this.setState({emailError: false})

      if (result.ok === true) {
        this.onSubmitSuccess()
      } else {
        this.onSubmitFailure(data)
      }
    }
  }

  render() {
    const {
      firstName,
      lastName,
      password,
      emailError,
      passwordError,
      emptyFirstName,
      emptyLastName,
    } = this.state
    const {match} = this.props

    return (
      <div className="member-container d-flex flex-wrap">
        <div className="member-left d-lg-flex align-items-lg-center justify-content-lg-end">
          <div>
            <div className="member-form-box">
              <form onSubmit={this.submitHandler}>
                <h1>Lets create your account</h1>
                <div className="form-box">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control "
                      name="email"
                      id="email"
                      defaultValue={match.params.email}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          onChange={this.onChangeHandler}
                          value={firstName}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          onChange={this.onChangeHandler}
                          value={lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-intro-box d-flex align-items-center">
                      <label htmlFor="password">Password</label>
                      <a
                        href="blank"
                        tabIndex="0"
                        className="help-popover ml-2"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="top"
                        data-content="Lorem ipsum dolor sit amet, consectetur adipiscing"
                      >
                        <img src="include/images/help-circle.svg" alt="" />
                      </a>
                    </div>
                    <div className="input-group">
                      <input
                        type="password"
                        name="password"
                        id="password-field"
                        className="form-control"
                        onChange={this.onChangeHandler}
                        value={password}
                      />
                      <span>
                        <i className="toggle-password" toggle="#password-field">
                          <span className="show">
                            <img src="include/images/eye.svg" alt="" />
                          </span>
                          <span className="hide">
                            <img src="include/images/eye-off.svg" alt="" />
                          </span>
                        </i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="member-btn">
                  <button
                    type="submit"
                    className="btn btn-default btn-lg btn-block"
                  >
                    Next
                  </button>
                </div>
                {emailError ? (
                  <p className="error-msg">Email Already Exits!!</p>
                ) : null}
                {passwordError ? (
                  <p className="error-msg">Password Is Too Short!!</p>
                ) : null}
                {emptyFirstName ? (
                  <p className="error-msg">First Name Is Required!!</p>
                ) : null}
                {emptyLastName ? (
                  <p className="error-msg">Last Name Is Required!!</p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BasicInfo
