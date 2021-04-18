//Please ignore this file
import React, { useContext, useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styles from '../../styles/components/cards/checkout/Payment.module.scss'
import firebase from '../../firebase/config'

const db = firebase.firestore();

export default class PaymentForm extends React.Component {

  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
  
  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form>
        	<input className={styles.payment_form}
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <br />
          <input className={styles.payment_form}
            type="tel"
            name="name"
            placeholder="Name On Card"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <br />
          <input className={styles.payment_form}
            type="tel"
            name="expiry"
            placeholder="Expriation Date"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input className={styles.payment_form}
            type="tel"
            name="cvc"
            placeholder="Security Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        </form>
      </div>
    );
  }
}