import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
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
