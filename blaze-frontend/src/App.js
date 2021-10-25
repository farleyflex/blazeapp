import React from 'react';
import { render } from 'react-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';


import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
      people: [],
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      updateId: "",
      page: 0
    };
  }

  updateId(evt) {
    this.setState({
      updateId: evt.target.value
    });

  }
  updateFirstName(evt) {
    this.setState({
      firstName: evt.target.value
    });

  }
  updateLastName(evt) {
    this.setState({
      lastName: evt.target.value
    });

  }
  updateEmail(evt) {
    this.setState({
      email: evt.target.value
    });

  }

  updatePhoneNumber(evt) {
    this.setState({
      phoneNumber: evt.target.value
    });
    console.log(this.state);

  }

  async handleClickSubmit(){
    const postData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      updateId : this.state.updateId
    }
    const requestOptions =
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    };
    let res = await fetch("http://localhost/people",requestOptions)
    let data = await res.json()
    this.setState({ rawData: data._embedded.people });
    this.createPeopleList();
  }

  async handleClickUpdate(){


    let updateData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      updateId: this.state.updateId
    };
    
    const requestOptions =
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    };
    let res = await fetch("http://localhost:8080/people/"+this.state.updateId, requestOptions)
    let data = await res.json()
    this.setState({ rawData: data._embedded.people });
    this.createPeopleList();
  }


  async componentDidMount() {
    
    let res = await fetch("http://localhost:8080/people")
    let data = await res.json()
    this.setState({ rawData: data._embedded.people });
    console.log(this.state);
    this.createPeopleList();
  }
  createPeopleList() {
    let peeps = []
    console.log()
    this.state.rawData.forEach((person) => {
      let p = {
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        phoneNumber: person.phoneNumber,
        updateId: person._links.person.href.split("/")       
      }
      p.updateId = p.updateId[p.updateId.length-1];
      peeps.push(p);
    });
    this.setState({
      people: peeps
    });
  }
  async getNewPage(diff) {
    if(this.state.page + diff < 0){
      return;
    }
    let nextPage = this.state.page + diff;
    let res = await fetch("http://localhost:8080/people?page="+nextPage)
    let data = await res.json()
    this.setState({ rawData: data._embedded.people, page: nextPage });
    this.createPeopleList();
  }

  render() {
    return(
      <div className="container">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control value={this.state.firstName} onChange={evt => this.updateFirstName(evt)} placeholder="First Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control value={this.state.lastName} onChange={evt => this.updateLastName(evt)} placeholder="Last Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control value={this.state.email} onChange={evt => this.updateEmail(evt)} placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control value={this.state.phoneNumber} onChange={evt => this.updatePhoneNumber(evt)} placeholder="Phone Number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fill with Id to update person</Form.Label>
              <Form.Control value={this.state.updateId} onChange={evt => this.updateId(evt)} placeholder="Person Id" />
          </Form.Group>
              <Button className="mb-3"  onClick={() => this.handleClickSubmit()} variant="primary" type="submit">
                Submit
              </Button>
              <Button  className="mb-3" onClick={() => this.handleClickUpdate()} variant="primary" type="submit">
                Update
              </Button>
        </Form>
                  
        <div className="ag-theme-alpine" style={{height: 1000}}>
            <AgGridReact
              rowData={this.state.people}
              pagination={true}
              cacheBlockSize={100}
              paginationPageSize={20}
              enableCellTextSelection={true}
              paginationPageSize={20}
              >
              <AgGridColumn autoSizeColumn={true} resizable= {true} field="updateId" sortable={ true } filter={ true }></AgGridColumn>
              <AgGridColumn field="firstName" sortable={ true } filter={ true }></AgGridColumn>
              <AgGridColumn field="lastName" sortable={ true } filter={ true }></AgGridColumn>
              <AgGridColumn field="email" sortable={ true } filter={ true }></AgGridColumn>
              <AgGridColumn field="phoneNumber" sortable={ true } filter={ true }></AgGridColumn>
            </AgGridReact>
        </div>
              <Button className="mb-3"  onClick={() => this.getNewPage(-1)} variant="primary" type="submit">
                Back
              </Button>
              <Button  className="mb-3" onClick={() => this.getNewPage(1)} variant="primary" type="submit">
                Forward
              </Button>
      </div>
      
    )
  };
};

render(<App />, document.getElementById('root'));
export default App;