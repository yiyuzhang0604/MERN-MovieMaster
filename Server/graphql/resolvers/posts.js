const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../middleware/check-auth");

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find().sort({ createdAt: -1 });
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error("Post not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createPost(_, { title, director, year }, context) {
			console.log(title + director + year)
			const user = checkAuth(context);
			

			if (title.trim() === "") {
				throw new Error("Post title must not be empty");
			}

			const newPost = new Post({
				title,
				director,
				year,
				user: user.indexOf,
				username: user.username,
				createdAt: new Date().toISOString(),
			});

			const post = await newPost.save();

			return post;
		},
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (user.username === post.username) {
					await post.delete();
					return "Post deleted successfully";
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
