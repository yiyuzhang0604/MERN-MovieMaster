import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
	Grid,
	Image,
	Card,
	Button,
	Icon,
	Label,
	Form,
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import MyPopup from "../utils/MyPopup";

const SinglePost = (props) => {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const commentInputRef = useRef(null);

	const [comment, setComment] = useState("");

	const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment("");
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
		},
	});

	function deletePostCallback() {
		props.history.push("/");
	}

	let postMarkup;
	if (!getPost) {
		postMarkup = <p>Loading post...</p>;
	} else {
		const {
			id,
			title,
			director,
			year,
			createdAt,
			username,
			comments,
			commentCount,
		} = getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src='https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg'
							size='medium'
							float='right'
							circular
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{title}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
								<Card.Description>{director}</Card.Description>
								<Card.Description>{year}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<MyPopup content='Comment on post'>
									<Button as='div' labelPosition='right'>
										<Button basic color='orange'>
											<Icon name='comments' />
										</Button>
										<Label basic color='orange' pointing='left'>
											{commentCount}
										</Label>
									</Button>
								</MyPopup>
								{user && user.username === username && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment:</p>
									<Form>
										<div className='ui action input fluid'>
											<input
												type='text'
												placeholder='Comment..'
												name='comment'
												value={comment}
												onChange={(event) => setComment(event.target.value)}
												ref={commentInputRef}
											/>
											<button
												type='submit'
												className='ui button teal'
												disabled={comment.trim() === ""}
												onClick={submitComment}
											>
												Submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>
										{moment(comment.createdAt).fromNow(true)}
									</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
	mutation ($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				body
				createdAt
				username
			}
			commentCount
		}
	}
`;

const FETCH_POST_QUERY = gql`
	query ($postId: ID!) {
		getPost(postId: $postId) {
			id
			title
			director
			year
			createdAt
			username
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

export default SinglePost;
