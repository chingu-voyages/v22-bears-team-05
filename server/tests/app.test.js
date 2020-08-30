// testing library
const { createTestClient } = require("apollo-server-integration-testing");

const dbHandler = require("./dbHandler")
const createTestServer = require("../testServer")

beforeAll(async () => await dbHandler.connect())

afterAll(async () => await dbHandler.closeDatabase())

function generateUIdRequest(userId = null) {
    return { request: { session: { userId } } }
}

function getTestClientFunctions() {
    const apolloServer = createTestServer()
    return createTestClient({
        apolloServer,
    })
}
test("noUser", async () => {
    const { query, setOptions } = getTestClientFunctions()
    setOptions(generateUIdRequest())
    const meResponse = await query(`{me {email id createdDate}}`)
    expect(meResponse.data.me).toBeNull()
})

test("resolversIntegration", async () => {
    const { query, mutate, setOptions } = getTestClientFunctions()
    setOptions(generateUIdRequest())
    const registerTemplate = `
    mutation Register($email: String!, $password: String!, $confirmPassword: String!){
        register(email: $email, password: $password, confirmPassword: $confirmPassword){
            email
            id
        }
    }
`
    const registerResponse = await mutate(registerTemplate, { variables: { email: "abCd@gmail.com", password: "abCd1!", confirmPassword: "abCd1!" } });
    let userId = registerResponse.data.register.id
    expect(registerResponse.data.register.email).toEqual("abCd@gmail.com");
    setOptions(generateUIdRequest(userId)) //put the user to the context

    const meResponse = await query(`{me {email id createdDate}}`)
    expect(meResponse.data.me.id).toEqual(userId)

    const reRegisterResponse = await mutate(registerTemplate, { variables: { email: "abCd@gmail.com", password: "abCd1!", confirmPassword: "abCd1!" } });
    expect(reRegisterResponse.errors[0].message).toEqual("Email in use")


})