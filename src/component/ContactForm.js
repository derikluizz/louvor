import React, { useState, useEffect } from "react";

const ContactForm = (props) => {
  const initialFieldValues = {
    cpf: "",
    /* Nome: "",
    email: "",
    address: "", */
  };

  let [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId == "") {
      setValues({
        ...initialFieldValues,
      });
    } else {
      setValues({
        ...props.contactObjects[props.currentId],
      });
    }
  }, [props.currentId, props.contactObjects]);

  const apenasNumeros = (cpf) => {
    var numbers = cpf.replace(/[^0-9]/g, '');
    return numbers;
  };

  function testaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    let i;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) { Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i) };
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name == 'cpf') {
      value = apenasNumeros(value);
    }

    if (!value) {
      value = '';
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      if (!testaCPF(values.cpf)) {
        throw 'CPF invalido'
      }

      if (values.cpf.length == 11) {
        props.addOrdit(values);
      }
    } catch (error) {

      alert(error)

    }


  };

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="CPF"
          name="cpf"
          value={values.cpf}
          maxLength='11'
          onChange={handleInputChange}
        />
      </div>

      {/* <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Nome"
            name="nome"
            value={values.nome}
            onChange={handleInputChange}
          />
        </div>
      </div> */}

      <div className="form-group mt-2">
        <input
          type="submit"
          value={props.currentId == "" ? "Salvar" : "Atualizar"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
