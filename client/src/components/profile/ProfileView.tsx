import React, { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfileById } from '../../actions/profile';
import { fetchPosts } from '../../actions/post';
import './ProfileView.css';
import { Auth } from '../../interfaces/auth';
import { ProfileInterface } from '../../interfaces/profile';
import { PostInterface } from '../../interfaces/post';

interface ProfileViewProps {
	profile: ProfileInterface;
	auth: Auth;
	post: any;
	fetchProfileById: (val: string) => void;
	fetchPosts: () => void;
	match: {
		params: {
			id: string;
		};
	};
}

const ProfileView: FC<ProfileViewProps> = ({
	auth,
	fetchProfileById,
	fetchPosts,
	match,
	profile: { profile },
	post,
}): JSX.Element => {
	// const { profile } = profile;
	const posts = post.posts;

	useEffect(() => {
		fetchProfileById(match.params.id);
		fetchPosts();
		window.scrollTo(0, 0);
		// eslint-disable-next-line
	}, [fetchProfileById, fetchPosts, match.params.id]);

	return (
		<div className='container'>
			{profile !== null && (
				<div className='ProfileView-container'>
					<div className='Form-btn'>
						<Link to='/gallery' className='Profile-FormLink'>
							<i className='fas fa-arrow-alt-circle-left'></i>
						</Link>
					</div>
					<h1>Profile</h1>
					<div>
						{profile?.appuser.avatar && (
							<img src={profile.appuser.avatar} alt={profile.appuser.name} />
						)}
						{profile?.appuser.name && (
							<p>Name: {profile && profile.appuser.name}</p>
						)}
						<hr />
						{profile?.intro && <p>Bio: {profile.intro}</p>}
						<hr />
						{profile?.location && <p>Location: {profile.location}</p>}
						<hr />
						{profile?.website && (
							<p>
								Website:{' '}
								<a
									href={profile.website}
									target='_blank'
									rel='noopener noreferrer'
								>
									{profile.website}
								</a>
							</p>
						)}
						<hr />
					</div>
					<div className='ProfileView-posts'>
						{posts &&
							posts
								.filter(
									(post: PostInterface) => post.user === profile?.appuser._id
								)
								.map((post: PostInterface) => (
									<div key={post.id} className='ProfileView-post-container'>
										<Link to={`/gallery/${post._id}`}>
											<img
												src={`data:image/png;base64,${post.image}`}
												alt={post.name}
												className='ProfileView-img'
											/>
										</Link>
										<p>{post.caption}</p>
									</div>
								))}
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	profile: state.profile,
	auth: state.auth,
	post: state.post,
});

export default connect(mapStateToProps, {
	fetchProfileById,
	fetchPosts,
})(ProfileView);
