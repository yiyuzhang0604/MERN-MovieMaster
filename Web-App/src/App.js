import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

import MenuBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

window.process = {
	env: {
		MONGO_URI: "development",
		SECRET_KEY: "development",
	},
};

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container style={{padding: 0, margin: 0, left: 0}}>
					<MenuBar />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/posts/:postId' component={SinglePost} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
