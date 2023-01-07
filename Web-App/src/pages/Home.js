import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import "../App.css"; 

function Home() {
	const { user } = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);
	let posts = <h1>Loading..</h1>;
	if (!loading) {
		console.log(data);
		posts = data.getPosts.map((post) => (
			<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
				<PostCard post={post} />
			</Grid.Column>
		));
	}
	return (
		

		
		<Grid columns={1}>
			<Grid.Row className='page-title'>
				<h1 style={{color:"Orange", fontSize: "100px"}}>MovieMaster</h1>
				<h1 style={{color:"navy"}}>Recent Movie Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column style={{ marginBottom: 20 }}>
						<PostForm />
					</Grid.Column>
				)}
				<Transition.Group duration={400}>{posts}</Transition.Group>
			</Grid.Row>
		</Grid>
		
	);
}

export default Home;
