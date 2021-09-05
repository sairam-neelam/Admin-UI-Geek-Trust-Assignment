import {BrowserRouter, Route} from 'react-router-dom'

import SignUp from './pages/SignUP'
import BasicInfo from './pages/BasicInfo/BasicInfo'
import DataList from './pages/DataList/DataList'

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={SignUp} />
    <Route exact path="/signUp/:email" component={BasicInfo} />
    <Route exact path="/userList" component={DataList} />
  </BrowserRouter>
)
export default App
