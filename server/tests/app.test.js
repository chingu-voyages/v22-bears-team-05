// testing library
const { createTestClient } = require("apollo-server-integration-testing");

const dbHandler = require("./dbHandler")
const createTestServer = require("../testServer")

const registerTemplate = require("./templates/registerTemplate")
const loginTemplate = require("./templates/loginTemplate")

beforeAll(async () => await dbHandler.connect())
afterAll(async () => await dbHandler.closeDatabase())


function generateUIdRequest(userId = null) {
    return { request: { session: { userId } } }
}

function getTestClientFunctions() {
    const apolloServer = createTestServer()
    const { query, mutate, setOptions } = createTestClient({ apolloServer, })
    setOptions(generateUIdRequest())
    return { query, mutate, setOptions }
}

test("noUser", async () => {
    const { query } = getTestClientFunctions()
    const meResponse = await query(`{me {email id createdDate}}`)
    expect(meResponse.data.me).toBeNull()
})

//testing a standalone register error
test("invalidRegisterEmail", async () => {
    const { mutate } = getTestClientFunctions()
    const registerResponse = await mutate(registerTemplate, { variables: { email: "invalidEmail.com", password: "abCd1!", confirmPassword: "abCd1!" } })
    const errorsObject = registerResponse.errors[0].extensions.errors
    expect(errorsObject).toHaveProperty("email")
    expect(errorsObject).not.toHaveProperty("password")
    expect(errorsObject).not.toHaveProperty("confirmPassword")
})

test("invalidRegisterPassword", async () => {
    const { mutate } = getTestClientFunctions()
    const registerResponse = await mutate(registerTemplate, { variables: { email: "a@gmail.com", password: "abc", confirmPassword: "abc" } })
    const errorsObject = registerResponse.errors[0].extensions.errors
    expect(errorsObject).toHaveProperty("password")
    expect(errorsObject).not.toHaveProperty("confirmPassword")
    expect(errorsObject).not.toHaveProperty("email")
})

test("invalidRegisterConfirm", async () => {
    const { mutate } = getTestClientFunctions()
    const registerResponse = await mutate(registerTemplate, { variables: { email: "a@gmail.com", password: "abcD1!", confirmPassword: "abcD2!" } })
    const errorsObject = registerResponse.errors[0].extensions.errors
    expect(errorsObject).toHaveProperty("confirmPassword")
    expect(errorsObject).not.toHaveProperty("password")
    expect(errorsObject).not.toHaveProperty("email")
})

//testing a standalone register error
test("invalidRegisterEmail", async () => {
    const { mutate } = getTestClientFunctions()
    const registerResponse = await mutate(registerTemplate, { variables: { email: "invalidEmail.com", password: "abCd1!", confirmPassword: "abCd1!" } })
    const errorsObject = registerResponse.errors[0].extensions.errors
    expect(errorsObject).toHaveProperty("email")
})

//testing an invalid login
test("invalidLogin", async () => {
    const { mutate } = getTestClientFunctions()
    const invalidLoginResponse = await mutate(loginTemplate, { variables: { email: "invalidEmail.com", password: "randomPassword" } })
    const loginError = invalidLoginResponse.errors[0].extensions.errors
    expect(loginError).toHaveProperty("general")
})

//testing all register errors together
test("invalidRegisterConstraints", async () => {
    const { mutate } = getTestClientFunctions()
    const registerResponse = await mutate(registerTemplate, { variables: { email: "invalidEmail.com", password: "abc!", confirmPassword: "el" } })
    const errorsObject = registerResponse.errors[0].extensions.errors
    expect(errorsObject).toHaveProperty("email")
    expect(errorsObject).toHaveProperty("password")
    expect(errorsObject).toHaveProperty("confirmPassword")
})

test("resolversIntegration", async () => {
    const { query, mutate, setOptions } = getTestClientFunctions()
    // setOptions(generateUIdRequest())

    const registerResponse = await mutate(registerTemplate, { variables: { email: "abcd@gmail.com", password: "abCd1!", confirmPassword: "abCd1!" } });
    let userId = registerResponse.data.register.id
    expect(registerResponse.data.register.email).toEqual("abcd@gmail.com");
    setOptions(generateUIdRequest(userId)) //put the user to the context

    const meResponse = await query(`{me {email id createdDate}}`)
    expect(meResponse.data.me.id).toEqual(userId)

    const reRegisterResponse = await mutate(registerTemplate, { variables: { email: "abCd@gmail.com", password: "abCd1!", confirmPassword: "abCd1!" } });
    expect(reRegisterResponse.errors[0].message).toEqual("Email in use")

    const loginErrorResponse = await mutate(loginTemplate, { variables: { email: "abCd@gmail.com", password: "hi" } });
    const loginErrors = loginErrorResponse.errors[0].extensions.errors
    expect(loginErrors).toHaveProperty("general") //the login error is a general error

    const validLoginResponse = await mutate(loginTemplate, { variables: { email: "abCd@gmail.com", password: "abCd1!" } })
    expect(validLoginResponse.data.login.id).toEqual(userId)

})