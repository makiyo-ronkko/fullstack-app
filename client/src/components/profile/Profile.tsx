import React, { useEffect, Fragment, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserProfile, deleteAccount } from '../../actions/profile';
import './Profile.css';
import { AutehnticatedProfile } from '../../interfaces/profile';
import { UserInterface } from '../../interfaces/user';
import { Auth } from '../../interfaces/auth';
import { State } from '../../interfaces/state';

interface ProfileProps {
	profile: AutehnticatedProfile;
	user: UserInterface;
	auth: Auth;
	fetchUserProfile: () => void;
	deleteAccount: () => void;
	loading: boolean;
}

const Profile: FC<ProfileProps> = ({
	profile,
	user,
	auth,
	fetchUserProfile,
	deleteAccount,
	loading,
}): JSX.Element => {
	// to getch profile data when as soon as page loaded

	const [showDelete, setShowDelete] = useState<boolean>(false);

	// const { profile } = props.profile;
	// const { user } = props.auth;

	useEffect(() => {
		fetchUserProfile();
		window.scrollTo(0, 0);
		// eslint-disable-next-line
	}, [fetchUserProfile]);

	const renderAuthenticatedUserInfo = () => {
		if (user !== null) {
			return (
				<>
					<img src={auth.user.avatar} alt={auth.user.name} />
					<p>Name: {auth.user.name}</p>
					<hr />
					<p>Email: {auth.user.email}</p>
					<hr />
				</>
			);
		}
	};

	// display modal to double check account deletion
	const deleteConfirmation = (): void => {
		setShowDelete(!showDelete);
	};

	// confirm account deletion
	const confirmDelete = (): void => {
		deleteAccount();
	};

	return loading && profile === null ? (
		<Fragment>Loading... </Fragment>
	) : (
		<Fragment>
			<div className='container'>
				<div className='Profile'>
					<h1>Account Information</h1>
					<div>{renderAuthenticatedUserInfo()}</div>
					{profile !== null ? (
						<Fragment>
							<h1>Profile</h1>
							<div>
								<p>Bio: {profile.profile.intro}</p>
								<hr />
								<p>Location: {profile.profile.location}</p>
								<hr />
								<p>
									Website:{' '}
									<a
										href={profile.profile.website}
										target='_blank'
										rel='noopener noreferrer'
									>
										{profile.profile.website}
									</a>
								</p>
								<hr />
							</div>
						</Fragment>
					) : (
						<Fragment>Loading... </Fragment>
					)}
					<Link to='/create-profile' className='Profile-Link'>
						Edit profile
					</Link>
					<button onClick={deleteConfirmation}>Delete Account</button>
				</div>
				{showDelete && (
					<div className='Modal-delete' style={{ display: 'block' }}>
						<span onClick={deleteConfirmation} className='close'>
							×
						</span>
						<form className='Modal-content'>
							<div>
								<h1>This action will permanently delete your account</h1>
								<p>Are you sure you want to delete your account?</p>

								<div>
									<button
										type='button'
										onClick={deleteConfirmation}
										className='cancelbtn'
									>
										Cancel
									</button>
									<button
										type='button'
										onClick={confirmDelete}
										className='deletebtn'
									>
										Delete
									</button>
								</div>
							</div>
						</form>
					</div>
				)}
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state: State) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, {
	fetchUserProfile,
	deleteAccount,
})(Profile);
