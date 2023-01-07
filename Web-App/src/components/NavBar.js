import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function NavBar() {
	const { user, logout } = useContext(AuthContext);
	const pathname = window.location.pathname;

	const path = pathname === "/" ? "home" : pathname.substring(1);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const handleLogout = () => {
		setActiveItem("home");
		logout();
	};

	const navbar = user ? (
		<Menu size='large' color='teal' inverted widths={6}>
			<Menu.Item name={user.username} active as={Link} to='/' />
			<Menu.Menu position='right' color='orange'>
				<Menu.Item
					name='logout'
					onClick={handleLogout}
					style={{ color: "red" }}
				/>
			</Menu.Menu>
		</Menu>
	) : (
		<Menu color='orange'  >
			<Menu.Item
				name='home'
				active={activeItem === "home"}
				onClick={handleItemClick}
				as={Link}
				to='/'
			/>
			<Menu.Menu position='right' color='orange'  >
				<Menu.Item
					name='login'
					active={activeItem === "login"}
					onClick={handleItemClick}
					as={Link}
					to='/login'
					
				/>
				<Menu.Item
					name='register'
					active={activeItem === "register"}
					onClick={handleItemClick}
					as={Link}
					to='/register'
				/>
			</Menu.Menu>
		</Menu>
	);

	return navbar;
}

export default NavBar;
