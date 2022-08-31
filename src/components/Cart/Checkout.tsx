import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { UserDataType } from './Cart';
import classes from './Checkout.module.css';

export type CheckoutProps = {
  onCancel: () => void
  onSubmit: (userData: UserDataType) => void
}

type InputsValidityType = {
  name: boolean
  street: boolean
  postal: boolean
  city: boolean
}

const isEmpty = (value: string) => value.trim() === "";
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout = (props: CheckoutProps) => {
  const [inputsValidity, setInputsValidity] = useState<InputsValidityType>({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);


  const confirmHandler = (event: FormEvent) => {
    event.preventDefault();

    const nameValue = nameInputRef.current!.value;
    const streetValue = streetInputRef.current!.value;
    const postalValue = postalInputRef.current!.value;
    const cityValue = cityInputRef.current!.value;

    const nameIsValid = !isEmpty(nameValue);
    const streetIsValid = !isEmpty(streetValue);
    const postalIsValid = isFiveChars(postalValue);
    const cityIsValid = !isEmpty(cityValue);

    const formIsValid = nameIsValid
      && streetIsValid
      && postalIsValid
      && cityIsValid;

    setInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    })

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${inputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!inputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={`${classes.control} ${inputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!inputsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={`${classes.control} ${inputsValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
        {!inputsValidity.postal && <p>Please enter a valid postal.</p>}
      </div>
      <div className={`${classes.control} ${inputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!inputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
