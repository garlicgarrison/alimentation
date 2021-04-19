import React, { useEffect, useState } from 'react';
import styles from '../styles/custom_modules/Cards.module.scss'

//`rccs__card--${this.issuer}`,
export default function CreditCard({cvc, number, name, expiry, focused=''})
{
    const [payment, setPayment] = useState({
        cvc: "",
        number: "",
        name: "",
        expiry: ""
    })
    const locale = {
        valid: 'valid thru'
    }

    useEffect(() => {
        setPayment({
            cvc: cvc,
            number: number,
            name: name,
            expiry: expiry
        })
    }, [cvc, number, name, expiry, focused])
    
    return(
        <div key="Cards" className={styles.rccs}>
        <div
          className={[
            styles.rccs__card,
            styles['rccs__card--mastercard'],
            focused === 'cvc' ? styles['rccs__card--flipped'] : '',
          ].join(' ').trim()}
        >
          <div className="rccs__card--front">
            <div className={styles.rccs__card__background} />
            <div className={styles.rccs__issuer} />
            <div
              className={[
                styles.rccs__cvc__front,
                focused === 'cvc' ? styles['rccs--focused'] : '',
              ].join(' ').trim()}
            >
              {cvc}
            </div>
            <div
              className={[
                styles.rccs__number,
                number.replace(/ /g, '').length > 16 ? styles['rccs__number--large'] : '',
                focused === 'number' ? styles['rccs--focused'] : '',
                number.substr(0, 1) !== '•' ? styles['rccs--filled'] : '',
              ].join(' ').trim()}
            >
              {payment.number}
            </div>
            <div
              className={[
                styles.rccs__name,
                focused === 'name' ? styles['rccs--focused'] : '',
                name ? styles['rccs--filled'] : '',
              ].join(' ').trim()}
            >
                {name}
            </div>
            <div
              className={[
                styles.rccs__expiry,
                focused === 'expiry' ? styles['rccs--focused'] : '',
                expiry ? expiry.substr(0, 1) !== '•' ? styles['rccs--filled'] : '' : '',
              ].join(' ').trim()}
            >
            <div className = {styles.rccs__expiry__valid}></div>
              <div className={styles.rccs__expiry__value}>Expires: {expiry}</div>
            </div>
            <div className={styles.rccs__chip} />
          </div>
          <div className={styles["rccs__card--back"]}>
            <div className={styles["rccs__card__background"]}/>
            <div className={styles["rccs__stripe"]} />
            <div className={styles["rccs__signature"]} />
            <div
              className={[
                styles.rccs__cvc,
                focused === 'cvc' ? styles['rccs--focused'] : '',
              ].join(' ').trim()}
            >
              {cvc}
            </div>
            <div className={styles.rccs__issuer} />
          </div>
        </div>
      </div>
    )
}