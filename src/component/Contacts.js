import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import fireDb from "../database/firebase";

const Contacts = () => {
  let [contactObjects, setContactObjects] = useState({});

  let [currentId, setCurrentId] = useState("");

  //lista
  useEffect(() => {
    fireDb.child("compradores").on("value", (dbPhoto) => {
      if (dbPhoto.val() != null) {
        setContactObjects({
          ...dbPhoto.val(),
        });
      } else {
        setContactObjects({});
      }
    });
  }, []);

  //salvar e atualiza
  const addOrdit = (obj) => {
    if (currentId == "") {
      let clientExist = false;

      fireDb
        .child("compradores")
        .get()
        .then((doc) => {
          let cliente = doc.val();

          for (const key in cliente) {
            let valor = cliente[key];

            if (valor.cpf == obj.cpf) {
              clientExist = true;
            }
          }

          if (!cliente || clientExist == false) {
            fireDb.child("compradores").push(obj, (err) => {
              if (err) {
                console.log(err);
              } else {
                setCurrentId("");
              }
            });
          } else {
            alert("O cliente já está cadastrado no sistema.");
          }
        });
    } else {
      fireDb.child(`compradores/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Apagar comprador?")) {
      fireDb.child(`compradores/${key}`).remove((err) => {
        if (err) console.log(err);
      });
    }
  };
  return (
    <React.Fragment>
      <div class="jumbotron">
        <h1 class="display-4 text-center">Cadastro de Compradores</h1>
      </div>

      <div className="row">
        <div className="col-md-5">
          <ContactForm {...{ addOrdit, currentId, contactObjects }} />
        </div>

        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th> CPF </th>
                {/* <th> Nome </th> */}
                <th> Ações </th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td> {contactObjects[id].cpf} </td>
                    {/* <td> {contactObjects[id].nome} </td> */}
                    <td>
                      <a
                        className="btn btn-primary"
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        className="btn btn-danger"
                        onClick={() => onDelete(id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contacts;
