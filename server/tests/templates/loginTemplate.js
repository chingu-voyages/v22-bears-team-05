const loginTemplate = `
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password){
            email
            id
        }
    }
`
module.exports = loginTemplate