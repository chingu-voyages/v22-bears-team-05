/*
testcases:
 validateRegisterInput("aEmail@gmail.com", "aA!lB124d", "aA!lB124d") -> {errors: {}, valid: true}
 validateRegisterInput("hello", "aA!lB124d", "aA!lB124d") -> {errors: {email: "Email address must be a valid email address"} ,valid: false} 
 returnObj = validateRegisterInput("hello", "aA!lB124c", "aA!lB124d") ->  {errors: {email: "Email address must be a valid email address", confirmPassword: ""Passwords must match""}, valid: false}
  returnObj = validateRegisterInput("aEmail@gmail.com", "notvalid", "notvalid") -> {errors: {password: Password does not meet criteria}, valid: false}
 */
function validateRegisterInput(email, password, confirmPassword) {
  const errors = {}
  /*
  ^(?=.*[0-9])(?=.*[*.!@$%^&(){}[\]:;<>,\.\?\/~_\+-=\|\\]])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9*.!@$%^&(){}[\]:;<>,\.\?\/~_\+-=\|\\]]{6,128}$
  */

  const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
  if (!email.match(emailRegex))
    errors.email = "Email address must be a valid email address"
  //password constraints: at least
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[*.!@#$%^&(){}[\]:;<>,\.\?\/~_\+\-=\|\\ ])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9*.!@#$%^&(){}[\]:;<>,\.\?\/~_\+\-=\|\\ ]{6,128}$/
  if (!password.match(passwordRegex))
    errors.password = "Password does not meet criteria"
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords must match"
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  }
}

module.exports.validateRegisterInput = validateRegisterInput
