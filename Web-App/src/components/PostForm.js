import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const PostForm = () => {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		title: "",
		director: "",
		year: "",
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update: (proxy, result) => {
			const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
			console.log(values);
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: {
					getPosts: [result.data.createPost, ...data.getPosts],
				},
			});

			values.title = "";
			values.director = "";
			values.year = "";
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Create a movie post:</h2>
				<Form.Field>
					<Form.Input
						placeholder='Title...'
						name='title'
						onChange={onChange}
						value={values.title}
						error={error ? true : false}
						color='grey'
					/>
					<Form.Input
						placeholder='Director...'
						name='director'
						onChange={onChange}
						value={values.director}
						error={error ? true : false}
					/>
					<Form.Input
						placeholder='Release Year...'
						name='year'
						onChange={onChange}
						value={values.year}
						error={error ? true : false}
					/>
					<Button
						type='submit'
						color='orange'
						disabled={values.title.trim() === ""}
					>
						Submit
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className='ui error message'>
					<ul className='list'>
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</>
	);
};

const CREATE_POST_MUTATION = gql`
	mutation createPost($title: String!, $director: String!, $year: String!) {
		createPost(title: $title, director: $director, year: $year) {
			id
			title
			director
			year
			createdAt
			username
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
		}
	}
`;

export default PostForm;
