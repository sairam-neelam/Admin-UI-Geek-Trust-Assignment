/* eslint-disable jsx-a11y/label-has-associated-control */
import {Link} from 'react-router-dom'
import {Component} from 'react'

class SignUp extends Component {
  state = {
    email: '',
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  render() {
    const {email} = this.state
    return (
      <div className="member-container d-flex flex-wrap">
        <div className="member-left d-lg-flex align-items-lg-center justify-content-lg-end">
          <div>
            <div className="member-form-box">
              <form>
                <h1>Enter your email</h1>
                <div className="form-box">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={this.onChangeEmail}
                      value={email}
                    />
                  </div>
                </div>
                <div className="member-btn">
                  <Link
                    to={`/signUp/${email}`}
                    className="btn btn-default btn-lg btn-block"
                  >
                    Next
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
