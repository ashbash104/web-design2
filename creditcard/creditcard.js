//Valid card number: 1234123412341234
    const creditCardContainer = document.querySelector('#card-number-field');
    const creditInput = document.querySelector('#cardnumber');


//validations and errors

function displayError(msg) {
	// display error message
	document.querySelector('.errors').textContent = msg
}

function isCardNumberValid(number) {
	return number === '1234123412341234'
}

function submitHandler(event) {
	event.preventDefault();
  let errorMsg = '';
	displayError('');

  let cardNumber = document.querySelector('#cardnumber');
  const cardNum = cardNumber.value.trim();
    if (!/^\d{16}$/.test(cardNum)) {
    errorMsg += 'Card number must be 16 digits\n';
    } else if (!isCardNumberValid(cardNum)) {
    errorMsg += 'Card number is not valid\n';
    }
    
    //check date
    const expYear = Number(document.querySelector('#year').value);   
    const expMonth = Number(document.querySelector('#month').value);
    const currentDate = new Date()

    if (2000 + expYear < currentDate.getFullYear() || (2000 + expYear === currentDate.getFullYear() && expMonth <= (currentDate.getMonth()) + 1)
    ) {
        errorMsg += 'Card is expired\n';
    }

    if (errorMsg !== '') {
		// there was an error. stop the form and display the errors.
		displayError(errorMsg)
		return;
    }
    // Success: show a confirmation message
    const formContainer = document.querySelector('.card-form');
    formContainer.innerHTML = '<h2>Thank you for providing your payment method.</h2>';
}
  
document.querySelector('.card-form')
  .addEventListener('submit', submitHandler);