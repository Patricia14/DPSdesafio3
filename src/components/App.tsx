import React, { Component } from "react";

import "./App.css";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form:{
      alumno: '',
      nota_1: '',
      nota_2: '',
      nota_3: '',
      nota_4: '',
      nota_5: '',
      promedio: '',
      estado: ''
    },
    id: 0
  };

  peticionGet = () => {
    firebase.child("alumnos").on("value", (alumno) => {
      if (alumno.val() !== null) {
        this.setState({ ...this.state.data, data: alumno.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  peticionPost=()=>{
    firebase.child("alumnos").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar: false});
  }

  peticionPut=()=>{
    firebase.child(`alumnos/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
  }

  peticionDelete=()=>{
    if(window.confirm(`Estás seguro que deseas eliminar el alumno ${this.state.form && this.state.form.alumno}?`))
    {
    firebase.child(`alumnos/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
    }
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarAlumno=async(alumno, id, caso)=>{

    await this.setState({form: alumno, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="App">
        <br />
        <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>
        <br />
        <br />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>alumno</th>
              <th>nota 1</th>
              <th>nota 2</th>
              <th>nota 3</th>
              <th>nota 4</th>
              <th>nota 5</th>
              <th>promedio</th>
              <th>estado</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i=>{
             // console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].alumno}</td>
                <td>{this.state.data[i].nota_1}</td>
                <td>{this.state.data[i].nota_2}</td>
                <td>{this.state.data[i].nota_3}</td>
                <td>{this.state.data[i].nota_4}</td>
                <td>{this.state.data[i].nota_5}</td>

                <td>{this.state.data[i].nota_1+this.state.data[i].nota_2+this.state.data[i].nota_3+this.state.data[i].nota_4+this.state.data[i].nota_5}
                </td>
                  
                <td>{this.state.data[i].estado}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarAlumno(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={()=>this.seleccionarAlumno(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                </td>

              </tr>
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>Insertar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Alumno: </label>
          <br />
          <input type="text" className="form-control" name="alumno" onChange={this.handleChange}/>
          <br />
          <label>Nota 1: </label>
          <br />
          <input type="number" className="form-control" name="nota_1" onChange={this.handleChange}/>
          <br />
          <label>Nota 2: </label>
          <br />
          <input type="number" className="form-control" name="nota_2" onChange={this.handleChange}/>
          <br />
          <label>Nota 3: </label>
          <br />
          <input type="number" className="form-control" name="nota_3" onChange={this.handleChange}/>
          <br />
          <label>Nota 4: </label>
          <br />
          <input type="number" className="form-control" name="nota_4" onChange={this.handleChange}/>
          <br />
          <label>Nota 5: </label>
          <br />
          <input type="number" className="form-control" name="nota_5" onChange={this.handleChange}/>
          <br />
          <label>Promedio: </label>
          <br />
          <input type="text" className="form-control" name="promedio" onChange={this.handleChange}/>
          <br />
          <label>Estado: </label>
          <br />
          <input type="text" className="form-control" name="estado" onChange={this.handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>



    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>Editar Registro</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Alumno: </label>
          <br />
          <input type="text" className="form-control" name="alumno" onChange={this.handleChange} value={this.state.form && this.state.form.alumno}/>
          <br />
          <label>Nota 1: </label>
          <br />
          <input type="number" className="form-control" name="nota_1" onChange={this.handleChange} value={this.state.form && this.state.form.nota_1}/>
          <br />
          <label>Nota 2: </label>
          <br />
          <input type="number" className="form-control" name="nota_2" onChange={this.handleChange} value={this.state.form && this.state.form.nota_2}/>
          <br />
          <label>Nota 3: </label>
          <br />
          <input type="number" className="form-control" name="nota_3" onChange={this.handleChange} value={this.state.form && this.state.form.nota_3}/>
          <br />
          <label>Nota 4: </label>
          <br />
          <input type="number" className="form-control" name="nota_4" onChange={this.handleChange} value={this.state.form && this.state.form.nota_4}/>
          <br />
          <label>Nota 5: </label>
          <br />
          <input type="number" className="form-control" name="nota_5" onChange={this.handleChange} value={this.state.form && this.state.form.nota_5}/>
          <br />
          
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>
      </div>
    );
  }
}

export default App;