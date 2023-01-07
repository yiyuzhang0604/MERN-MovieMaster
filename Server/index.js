const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

mongoose
	.connect("mongodb+srv://yiyuzhang:yiyuzhang@webdev.ignz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to db");
		return server.listen({ port: PORT });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	})
	.catch((err) => {
		console.error(err);
	});
