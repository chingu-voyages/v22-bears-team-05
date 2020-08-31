// testing library
const { createTestClient } = require("apollo-server-integration-testing");

const dbHandler = require("./dbHandler")
const createTestServer = require("../testServer")

beforeAll(async () => await dbHandler.connect())

afterAll(async () => await dbHandler.closeDatabase())

const registerTemplate = `
    mutation Register($email: String!, $password: String!, $confirmPassword: String!){
        register(email: $email, password: $password, confirmPassword: $confirmPassword){
            email
            id
        }
    }
`

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
    const { query, setOptions } = getTestClientFunctions()
    // setOptions(generateUIdRequest())
    const meResponse = await query(`{me {email id createdDate}}`)
    expect(meResponse.data.me).toBeNull()
})
// test("invalidRegisterEmail", async () => {

// })

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


})