export const typeDefs = `#graphql

type Query{
    name:String
}
type User{
    _id:ID!
    name:String!
    email:String!
    gender:String!
    
}
input signing{
    name:String!
    email:String!
    password:String!
    gender:String!

}
input loging{
   
    email:String!
    password:String!

}

type Mutation{

    signup(input:signing!):User
    login(input:loging!):User
    logout:Boolean!
}`;
