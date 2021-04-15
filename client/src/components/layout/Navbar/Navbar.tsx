import React, { Fragment, useState, FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/index';
import { alert } from '../../../actions/alert';
import './Navbar.css';
import logo from '../../../img/logo.png';
import { Auth } from '../../../interfaces/auth';
import { State } from '../../../interfaces/state';

interface NavbarProps {
	logout: () => void;
	alert: (val: string, val2: string) => void;
	auth: Auth;
}

const Navbar: FC<NavbarProps> = ({ logout, alert, auth }): JSX.Element => {
	// passing logout props, auth
	const [toggle, setToggle] = useState<boolean>(false);

	const openToggle = (): void => {
		setToggle(!toggle);
		setTimeout(() => {
			setToggle(toggle);
		}, 5000);
	};

	const logoutHandler = (): void => {
		logout();
		alert('You have logged out', 'blue');
	};

	const isAuthenticated: ReactElement = (
		<Fragment>
			<ul>
				<li>
					<NavLink exact to='/gallery'>
						Gallery
					</NavLink>
				</li>
				<li className='Navbar-bars'>
					<div className='burger'>
						{auth.user && (
							<img
								src={auth.user.avatar}
								alt={auth.user.name}
								className='Navbar-bars-profile-avatar'
								onClick={openToggle}
								style={{ marginBottom: '0.6rem', padding: '0' }}
							/>
						)}
					</div>
					{toggle && (
						<ul>
							<li>
								<NavLink exact to='/profile'>
									<span>Profile</span>
								</NavLink>
							</li>
							<li>
								<a onClick={logoutHandler} href='/'>
									<span>Logout</span>
								</a>
							</li>
						</ul>
					)}
				</li>
			</ul>
		</Fragment>
	);

	const notAuthenticated: ReactElement = (
		<ul>
			<li>
				<NavLink exact to='/register'>
					Register
				</NavLink>
			</li>
			<li>
				<NavLink exact to='/login'>
					Login
				</NavLink>
			</li>
		</ul>
	);

	return (
		<nav
			className='Navbar'
			style={!auth.authenticated ? { padding: '0' } : { padding: '0 2rem 0 0' }}
		>
			<NavLink
				exact
				to='/'
				activeStyle={{
					fontWeight: 'bolder',
				}}
			>
				<img
					src={logo}
					className='logo'
					style={{ padding: '0 2rem 0 0' }}
					alt='logo'
				/>
			</NavLink>

			{!auth.loading && (
				<Fragment>
					{auth.authenticated ? isAuthenticated : notAuthenticated}
				</Fragment>
			)}
		</nav>
	);
};

const mapStateToProps = (state: State) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout, alert })(Navbar);
