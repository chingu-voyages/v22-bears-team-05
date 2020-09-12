const registerTemplate = `
    mutation Register($email: String!, $password: String!, $confirmPassword: String!){
        register(email: $email, password: $password, confirmPassword: $confirmPassword){
            email
            id
        }
    }
`
module.exports = registerTemplate