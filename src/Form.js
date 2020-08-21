import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'

function Form(props){
    const {
        values,
        submit,
        inputChange,
        checkboxChange,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onCheckboxChange = evt => {
        const {name, checked} = evt.target
        checkboxChange(name, checked)
    }

    const onInputChange = evt => {
        const {name, value} = evt.target
        inputChange(name, value)
    }

    return (
        <Route path='/pizza'>
            <NavLink to='/'>Home</NavLink>
            <form className ='form container' onSubmit={onSubmit}>
            <button disabled={disabled}>Click to add order</button> 

            <div className='errors'>
                <div>{errors.name}</div>
                <div>{errors.size}</div>
                <div>{errors.toppings}</div>
                <div>{errors.specialInstructions}</div>
            </div>
                <div className = 'inputs'>
                    <h3>Add an order</h3>
                    <label>Name&nbsp;
                        <input
                            value={values.name}
                            onChange={onInputChange}
                            name='name'
                            type='text'
                        />
                    </label>
                    
                    <label>Size&nbsp; 
                        <select
                            onChange={onInputChange}
                            value={values.size}
                            name='size'
                        >
                            <option value=''>- Select a size -</option>
                            <option value='Small'>Small</option>
                            <option value='Medium'>Medium</option>
                            <option value='Large'>Large</option>
                            <option value='XL'>XL</option>
                        </select>
                    </label>

                    <p>Toppings:&nbsp;

                        <label>pepperoni
                            <input
                                type="checkbox"
                                name='pepperoni'
                                checked={values.toppings.pepperoni}
                                onChange={onCheckboxChange}
                            />
                        </label>

                        <label>cheese
                            <input
                                type="checkbox"
                                name="cheese"
                                checked={values.toppings.cheese}
                                onChange={onCheckboxChange}
                            />
                        </label>

                        <label>bacon
                            <input
                                type="checkbox"
                                name="bacon"
                                checked={values.toppings.bacon}
                                onChange={onCheckboxChange}
                            />
                        </label>

                        <label>sausage
                            <input
                                type="checkbox"
                                name="sausage"
                                checked={values.toppings.sausage}
                                onChange={onCheckboxChange}
                            />
                        </label>
                    </p>

                    <label>Special Instructions
                        <input
                            value = {values.specialInstructions}
                            onChange = {onInputChange}
                            type='text'
                            name='specialInstructions'
                        />    
                    </label> 

                </div>
            </form>
        </Route>
    )
}

export default Form