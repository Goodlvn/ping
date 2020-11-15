const { gql } = require("apollo-server");

module.exports = gql`
type Ping {
    id: ID!
    body: String!
    createdAt: String!
    username: String! 
    comments: [Comment]!
    support: [Support]!
    supportCount: Int!
    commentCount: Int! 
}
type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
}
type Support {
    id: ID!
    createdAt: String!
    username: String!
}
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}
# TODO: test case oauth user
type OauthUser {
    id: ID
    name: String
    email: String
    picture: String
}
input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}
type Query {
    getPings: [Ping]
    getPings(pingId: ID!): Ping
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPing(body: String!): Ping!
    deletePing(pingID: ID!): String!
    createComment(pingId: ID!, body: String!): Ping!
    deleteComment(pingId: ID!, commentId: ID!): Ping!
    supportPing(pingId: ID!): Ping!
    # TODO: test case oauth
    me: OauthUser
}
type Subscription {
    newPing: Ping!
}
`