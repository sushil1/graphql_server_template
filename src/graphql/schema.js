export default `
  scalar Date

  type Status{
    message: String!
  }

  type Auth{
    email:String!
    token:String!
  }

  type User{
    _id:ID!
    email:String!
    firstName:String
    lastName:String
    avatar:String
    createdAt:Date!
    updatedAt:Date!
  }

  type Me{
    _id:ID!
    email:String!
    firstName:String
    lastName:String
    avatar:String
    createdAt:Date!
    updatedAt:Date!
  }

  type Post{
    _id:ID!
    title:String!
    caption:String!
    user:User!
    createdAt:Date!
    updatedAt:Date!
  }

  type Query{
    getPosts: [Post]
    getPost(_id:ID!):Post
    me: Me
    getUserPosts: [Post]
    
  }

  type Mutation{
    
    signup(email:String!, fullName:String!, password:String!):Auth
    login(email:String!, password:String!):Auth
    createPost(title:String!, caption:String!):Post
    updatePost(_id:ID, title:String, caption:String):Post
    deletePost(_id:ID!):Status

  }

  schema {
    query: Query,
    mutation: Mutation
  }

`;
