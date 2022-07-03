import { useEffect, useState } from "react";
import React from 'react';
import './TodoStyles.css';

import { db } from "../../firebase-config";
import {collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import {BsCalendar2Check, BsCheck2, BsCheck2All} from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'

import Button from "@mui/material/Button";
import {Header} from '../header/Header'


export const Todo = () => {

    let [newComentario, setNewComentario] = useState("");
    const [newFechai, setNewFechai] = useState("");
    const [newFechaf, setNewFechaf] = useState("");
    const [twets, setTwets] = useState([]);
    const twetsCollectionRef = collection(db, "twets");
    
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    
    (() => {

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')
      
            // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
              form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
                  console.log('no-pasa')
                 } 
                else {
                    event.preventDefault()
                  event.stopPropagation()
                  console.log('si-pasa')
                //   window.location.reload();
                }
          
                form.classList.add('was-validated')
              }, true)
            })

          })()


    

    const deleteUser = async (id) => {
        const twetDoc = doc(db, "twets", id);
        await deleteDoc(twetDoc);
        // window.location.reload();
      };

    const createTwets = async (data) => {
        if (newFechai === '' || newFechaf === '' || newComentario === '') {
            console.log('Deberia saltar la validacion')
        } else {
            await addDoc(twetsCollectionRef, {
                comentario: newComentario,
                fechai: newFechai,
                fechaf: newFechaf     
              });
            //   document.getElementById("form").reset();
              window.location.reload();
        }
        
      };

    useEffect(() => {
        const getTwets = async () => {
          const data = await getDocs(twetsCollectionRef);
          console.log(data);
          setTwets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTwets();
      }, [twetsCollectionRef]);


  return (

    <div>
        <Header/>
    <div className="container-xl py-3">
        <h1 className="text-start titulo">Lista de ideas</h1>

        <div className='row mt-2 d-flex align-items-start justify-content-center'>
            <div className="col-md-4">
                
                <form id="form" className="needs-validation" noValidate onSubmit={createTwets}>
                    <div className="fs-1 titulo">
                        <label className="form-label fs-5 fw-1">Fecha de Creación</label>
                        <input 
                               value={newFechai}
                               required
                               className="form-control form-control-sm" 
                               type="date" placeholder=".form-control-sm" 
                            //    aria-label=".form-control-lg example"
                               onChange={(event) => {
                                setNewFechai(event.target.value);
                              }}
                               ></input>
                               <div className="validation invalid-feedback">
                                Ingresa una fecha inicial.
                                </div>
                    </div>

                    <div className="mt-3">
                        <h2 className="fs-5 titulo">Idea</h2>
                        <textarea 
                            value={newComentario}
                            required
                            className="form-control"
                            rows="4"
                            onChange={(event) => {
                                setNewComentario(event.target.value);
                            }}
                            ></textarea>
                                <div className="validation invalid-feedback">
                                Ingresa un comentario
                                </div>
                    </div>

                    
                    <div className="fs-1 mb-4 titulo">
                        <label className=" form-label fs-5 fw-1">Fecha de Cierre</label>
                        <input 
                               value={newFechaf}
                               required
                               className="form-control form-control-sm" 
                               type="date" placeholder=".form-control-lg" 
                               aria-label=".form-control-lg example"
                               onChange={(event) => {
                                   console.log(event.target.value)
                                setNewFechaf(event.target.value);
                              }}
                        ></input>
                                <div className="invalid-feedback validation">
                                Ingresa una fecha final.
                                </div>
                    </div>
                <button type="submit" className="btn btn-primary mt-4" 
                onClick={createTwets}
                >Agregar</button>


                </form>   

            </div>
            <div className="col-md-8">
                {twets.map((twet) => {
                    return <div className="mt-3">
                        <div className="card-body">
                        <ul className="row p-3 d-flex align-items-start justify-content-between">

                            <div className="col-md-9 d-flex align-text-center">
                                <BsCheck2 className="me-4 display-4 d-flex align-items-start text-success"/>
                                <li className="card-text fw-bold titulo-2">{twet.comentario}</li>
                            </div>

                            <div className="col-md-2 d-flex justify-content-around align-items-center">

                                <div className="d-flex justify-content-between align-items-center me-5 fs-5">

                                    <div className="d-inline align-items-center">
                                        <div>
                                            <li className="fecha d-flex"><BsCalendar2Check className="me-2 d-flex align-items-center justify-content-center text-primary icon"/>{twet.fechai}</li>
                                        </div>
                                        <div>
                                            <li className="fecha d-flex"><BsCheck2All className="me-2 text-danger icon"/>{twet.fechaf}</li>
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-2 d-flex align-items-center fw-4 ">
                                        <Button  
                                                className="text-danger"                                     
                                                onClick={() => {
                                                deleteUser(twet.id);
                                            }}>
                                        <IoMdClose className="display-6 text-danger"/>
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </ul>
                        </div>
                        <hr></hr>
                        
                    </div>
                })}
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default Todo;
