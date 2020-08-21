import React, {useState, useEffect} from "react";
import { NavLink, Route, Switch } from 'react-router-dom';
import Form from './Form';
import axios from "axios";
import * as yup from 'yup';
import formSchema from './formSchema'

const initialFormValues = {
  name: '',
  size: '', //dropdown
  toppings: { //checkboxes
    pepperoni: false,
    cheese: false,
    bacon: false,
    sausage: false,
  },
  specialInstructions: '',
}

const initialFormErrors = {
  name: '',
  size: '',
  toppings: '',
  specialInstructions: '',
}

const initialOrders = []
const initialDisabled = true

const App = () => {

  const [orders, setOrders] = useState(initialOrders)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getOrders = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setOrders(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/users', newOrder)
      .then(res => {
        setOrders([...orders, res.data.data])
        console.log(res.data)
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
      
  }

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]:err.errors[0]
        })
      })
      setFormValues({
        ...formValues,
        [name]:value
      })
  }

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]:isChecked,
      }
    })
  }

  const submit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      toppings: Object.keys(formValues.toppings).filter(top => formValues.toppings[top]),
      specialInstructions:formValues.specialInstructions.trim()
    }
    postNewOrder(newOrder)
  }

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues])


  return (
    <>
      <h1>Lambda Eats</h1>
      <Route path = '/'>
        
        <NavLink to='/pizza'>Order</NavLink>
        <Form
        values = {formValues}
        inputChange = {inputChange}
        checkboxChange = {checkboxChange}
        submit = {submit}
        disabled = {disabled}
        errors = {formErrors}
      />
      </Route>
      <pre>{JSON.stringify(orders)}</pre>
    </>
  );
};
export default App;
