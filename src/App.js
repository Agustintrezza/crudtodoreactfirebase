import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Header } from "../src/components/header/Header.jsx";


// import FormControl from "@mui/material/FormControl"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es un campo obligatorio"),
  age: yup.number().required("Capo Obligatorio")
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero")
    .min(18, "Debes ser mayor de 18 años")
    .typeError("La edad es un campo obligatorio"),
    email: yup.string().email("Formato Inválido").required("Es email es obligatorio"),
});



function App() {

  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const onSubmit = (data) => console.log(data);

  
 
  // console.log(errors);
  // reset();
  
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newEmail, setNewEmail] = useState("");

  const createUser = async (data) => {
    await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge),
      email: newEmail,
    });
    document.getElementById("form").reset();
    // window.location.reload();
  };

  // const updateUser = async (id, age) => {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { age: age + 1 };
  //   await updateDoc(userDoc, newFields);
  //   window.location.reload();
  // };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    // window.location.reload();
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [usersCollectionRef]);

  // const onSubmit = (data) => console.log(data);

  
  // console.log(errors);

  const limipiarError = () => {
    // console.log('Agusti')
    setTimeout(() => {
        clearErrors(["name", "age", "email"])
    }, 4000);
  }

  return (
    <div className="App">
      <Header />

      <div className="grid container">
        <div className="contenedor-form">
          <div>
            <h1 className="titulo-form">Crear Usuario</h1>
          </div>
          <form className="form" id="form" onSubmit={handleSubmit(createUser)}>
            <TextField
              type="text"
              size="small"
              className="input-form"
              name="name"
              label="Nombre"
              variant="standard"
              {...register("name", { required: true })}
              error={!!errors?.name}
              helperText={errors?.name ? errors.name.message : null}
              placeholder="Nombre"
              onChange={(event) => {
              setNewName(event.target.value);
              }}
            />
            <TextField
              size="small"
              className="input-form"
              type="number"
              name="age"
              label="Edad"
              variant="standard"
              placeholder="Edad"
              {...register("age", { required: true })}
              error={!!errors?.age}
              helperText={errors?.age ? errors.age.message : null}
              onChange={(event) => {
                setNewAge(event.target.value);
              }}
            />
            <TextField
              size="small"
              className="input-form"
              name="email"
              id="outlined-basic"
              label="Email"
              variant="standard"
              placeholder="Email"
              {...register("email", { required: true })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
            />
          <Button
            type="submit"
            className="button"
            // onClick={createUser}
            variant="outlined"
            onClick={limipiarError}
          >
            Agregar Usuario
          </Button>
          </form>
        </div>  


        <TableContainer component={Paper}>
          <Table
            key={doc.index}
            className="tabla"
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Edad
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Email
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  align="right"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover={true}
                  key={user.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.age}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell>
                    {/* <Button
                      // onClick={() => {
                      //   updateUser(user.id, user.age, user.name);
                      //   console.log("Agus");
                      // }}
                    >
                      {/* <EditIcon /> */}
                    {/* </Button> */} 
                    <Button
                      className="btn-delete"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  



    </div>
  );
}

export default App;
