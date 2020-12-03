import React, {Component} from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Button, Container, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import { render } from '@testing-library/react';

const data = [
  { id: 1, personaje: 'Daria', serie: 'Daria'},
  { id: 2, personaje: 'Lulu', serie: 'Mi pequeña Lulu'},
  { id: 3, personaje: 'Rachel', serie: 'Friends'},
  { id: 4, personaje: 'Goku', serie: 'Dragon Ball Z'},
  { id: 5, personaje: 'Homero', serie: 'Los Simpsons'},
  { id: 6, personaje: 'Salem', serie: 'Sabrina la bruja adolescente'}
];

class App extends Component {
  state={
    data: data,
    form:{
      id: '',
      personaje: '',
      serie: ''
    },
    modalInsertar: false,
    modalEditar: false
  };

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({form: registro, modalEditar: true});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }

  editar=(dato)=>{
    let contador = 0;
    let lista = this.state.data;
    lista.map((registro)=>{
      if(dato.id == registro.id){
        lista[contador].personaje = dato.personaje;
        lista[contador].serie = dato.serie;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

  eliminar=(dato)=>{
    let opcion = window.confirm("Realmente queres eliminar el registro "+ dato.id + " ?");
    if(opcion){
      let contador = 0;
      let lista = this.state.data;
      lista.map((registro)=>{
        if(registro.id == dato.id){
          lista.splice(contador, 1);
        } 
        contador++;
      });
      this.setState({data: lista});
    }
  }

  insertar=()=>{
    let valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length+1;
    let lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  handleChange=(e)=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  

  render() {
    return (
      <>
        <Container>
          <br/>
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo personaje</Button>
          <br/><br/>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Personaje</th>
                <th>Serie</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento)=>(
                <tr key={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.serie}</td>
                  <td>
                    <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
            </FormGroup>
            <FormGroup>
              <label>Personaje:</label>
              <input className="form-control" name="personaje" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Serie:</label>
              <input className="form-control" name="serie" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            <FormGroup>
              <label>Personaje:</label>
              <input className="form-control" name="personaje" type="text" onChange={this.handleChange} value={this.state.form.personaje} />
            </FormGroup>
            <FormGroup>
              <label>Serie:</label>
              <input className="form-control" name="serie" type="text" onChange={this.handleChange} value={this.state.form.serie}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      
      </>
    );
  }
}

export default App;
