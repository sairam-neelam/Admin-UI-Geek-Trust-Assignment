import {Component} from 'react'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import {FaSave} from 'react-icons/fa'
import {GiCancel} from 'react-icons/gi'

import './DataList.css'

class DataList extends Component {
  state = {
    dataList: [],
    editableContactId: '',
    firstName: '',
    lastName: '',
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://testapi.webexcellis.in/api/users')
    console.log(await response.statusCode)
    const data = await response.json()
    this.setState({dataList: data})
  }

  onChangeInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSave = async (e, id) => {
    e.preventDefault()
    const {firstName, lastName, dataList} = this.state
    const data = dataList.filter(each => each.id === id)
    const {password, email} = data[0]
    const result = await fetch(
      `https://testapi.webexcellis.in/api/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          password,
          email,
        }),
      },
    )
    console.log(result.status)
    console.log(id)
    this.setState({editableContactId: ''})
    this.getBlogsData()
  }

  cancel = e => {
    e.preventDefault()
    this.setState({editableContactId: ''})
    this.getBlogsData()
  }

  renderEditableRow = eachData => (
    <tr key={eachData.id}>
      <td>
        <input
          className="input-edit"
          type="text"
          defaultValue={eachData.firstName}
          name="firstName"
          onChange={this.onChangeInput}
        />
      </td>
      <td>
        <input
          className="input-edit"
          type="text"
          defaultValue={eachData.lastName}
          name="lastName"
          onChange={this.onChangeInput}
        />
      </td>
      <td>{eachData.email}</td>
      <td className="icon-column">
        <FaSave
          className="action-green-icon"
          onClick={e => this.handleSave(e, eachData.id)}
        />
        <GiCancel className="action-red-icon" onClick={e => this.cancel(e)} />
      </td>
    </tr>
  )

  delete = async id => {
    const result = await fetch(
      `https://testapi.webexcellis.in/api/users/${id}`,
      {
        method: 'DELETE',
      },
    )
    console.log(result.status)
    console.log(id)
    this.getBlogsData()
  }

  handleEdit = (e, eachData) => {
    e.preventDefault()
    this.setState({
      editableContactId: eachData.id,
      firstName: eachData.firstName,
      lastName: eachData.lastName,
    })
  }

  renderReadOnlyRow = eachData => (
    <tr key={eachData.id}>
      <td>{eachData.firstName}</td>
      <td>{eachData.lastName}</td>
      <td>{eachData.email}</td>
      <td className="icon-column">
        <FiEdit
          className="action-green-icon"
          onClick={e => this.handleEdit(e, eachData)}
        />
        <MdDelete
          className="action-red-icon"
          onClick={() => this.delete(eachData.id)}
        />
      </td>
    </tr>
  )

  render() {
    const {dataList, editableContactId} = this.state
    return (
      <div className="table-container">
        <h1 className="main-heading">Team Details</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map(eachData => (
              <>
                {editableContactId === eachData.id
                  ? this.renderEditableRow(eachData)
                  : this.renderReadOnlyRow(eachData)}
              </>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DataList
