export default `

  type Status{
    message: String!
  }

  type Auth{
    token:String!
  }

  type User{
    _id:ID!
    email:String!
    firstName:String
    lastName:String
  }

  type Post{
    title:String!
    caption:String!
  }

  type Query{
    getPosts(): [Post]
    getPost(_id:ID):Post
    
  }

  type Mutation{
    createPost(title:String!, caption:String!):Post
    updatePost(_id:ID!, caption:String!, title:String!):Post
    deletePost(_id:ID!):Status
    signup(email:String!, fullname:String!, password:String!):User
    login(email:String!, password:String!):User
  }

  schema {
    query: Query,
    mutation: Mutation
  }

`;
