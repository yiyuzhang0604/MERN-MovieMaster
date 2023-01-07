import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import MyPopup from "../utils/MyPopup";

const PostCard = ({
	post: { title, director, year, createdAt, id, username, commentCount },
}) => {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg'
				/>
				<Card.Header>{title}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow(true)}, post by {username}
				</Card.Meta>
				<Card.Description>Release Year: {year} </Card.Description>
				<Card.Description>Director: {director} </Card.Description>
			</Card.Content>
			<Card.Content extra>
		
				<MyPopup content='Comment on post'>
					<Button labelPosition='right' as={Link} to={`/posts/${id}`}>
						<Button color='orange' basic>
							<Icon name='comments' />
						</Button>
						<Label basic color='orange' pointing='left'>
							{commentCount}
						</Label>
					</Button>
				</MyPopup>

				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
