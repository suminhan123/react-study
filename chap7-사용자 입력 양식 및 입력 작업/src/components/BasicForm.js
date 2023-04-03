import useInput from "../hooks/use-input";

const BasicForm = (props) => { // fromilk 사용하면 많은 로직들을 쉽게 이용가능
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstnameChangedHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetfirstName,
  } = useInput((value) => value.trim() !== '');

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastnameHasError,
    valueChangeHandler: lastnameChangedHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetlastName,
  } = useInput((value) => value.trim() !== '');

  const {
    value: Email,
    isValid: EmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes('@'));

  let formIsValid = false;
  if (EmailIsValid && firstNameIsValid && lastNameIsValid){
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid){
      return;
    }
    resetfirstName();
    resetlastName();
    resetEmail();
  }
  return (
    <form>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input 
          type='text' 
          id='name'
          onChange={firstnameChangedHandler}
          value={firstName}
          onBlur={firstnameBlurHandler}
          />
          {firstNameHasError && <p>성 형식 맞지 않음</p>}
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input 
          type='text' 
          id='name'
          onChange={lastnameChangedHandler}
          value={lastName}
          onBlur={lastnameBlurHandler}
          />
          {lastnameHasError && <p>이름 형식 맞지 않음</p>}
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
        type='email' 
        id='email'
        onChange={emailChangeHandler}
        value={Email}
        onBlur={emailBlurHandler}
        />
        {emailInputHasError && <p>이메일 형식 맞지 않음</p>}
      </div>
      <div className='form-actions'>
        <button 
        onClick={formSubmitHandler}
        disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
