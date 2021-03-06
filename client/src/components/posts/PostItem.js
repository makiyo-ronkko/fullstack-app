import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postLike, removeLike, deletePost } from '../../actions/post';
import Moment from 'react-moment';
import './PostItem.css';

const PostItem = (props) => {
	const {
		name,
		user,
		image,
		caption,
		hashtag,
		date,
		likes,
		_id,
		comments,
		avatar,
	} = props.post;

	const [showDelete, setShowDelete] = useState(false);

	const fasColor = () => {
		if (likes.length >= 5) {
			return '#ff6600';
		} else if (likes.length >= 2) {
			return '#ffcc00';
		} else {
			return '#6666ff';
		}
	};

	const fasIcon = () => {
		if (likes.length >= 5) {
			return 'fas fa-crown';
		} else if (likes.length >= 2) {
			return 'fas fa-star';
		} else {
			return 'fas fa-grin-stars';
		}
	};

	// display modal to double check post deletion
	const deleteConfirmation = () => {
		setShowDelete(!showDelete);
	};

	return !props.auth.authenticated ? (
		<div>Loading... </div>
	) : (
		<Fragment>
			<div className='PostItem'>
				<div className='PostItem-header'>
					<div className='PostItem-user'>
						{/* {props.auth.user && props.post && <img src={avatar} alt={name} />} */}
						<img src={avatar} alt={name} />
						<Link to={`/profile/${user}`}>
							<h4>{name}</h4>
						</Link>
					</div>
					<div className='PostItem-delete'>
						{props.auth.authenticated &&
							!props.auth.loading &&
							user === props.auth.user._id && (
								<button
									onClick={deleteConfirmation}
									type='button'
									className='delete-btn'
								>
									<i className='fas fa-times-circle'></i>
								</button>
							)}
						{props.auth.authenticated &&
							!props.auth.loading &&
							user === props.auth.user._id &&
							showDelete && (
								<div className='Modal-delete' style={{ display: 'block' }}>
									<span onClick={deleteConfirmation} className='close'>
										×
									</span>
									<form className='Modal-content'>
										<div>
											<p>Are you sure you want to delete your post?</p>

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
													onClick={() => props.deletePost(_id)}
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
				</div>
				<Link to={`gallery/${_id}`}>
					<div className='PostItem-img'>
						<img src={`data:image/png;base64,${image}`} alt={name} />
					</div>
				</Link>
				<div className='PostItem-content'>
					<div className='likes-btn'>
						<button onClick={() => props.postLike(_id)}>
							{' '}
							<i className='fas fa-plus' />{' '}
						</button>
						<button onClick={() => props.removeLike(_id)}>
							{' '}
							<i className='fas fa-minus' />{' '}
						</button>
					</div>
					<div className='likes' style={{ color: fasColor() }}>
						<i className={fasIcon()} style={{ fontSize: '1rem' }} />{' '}
						<span> {likes.length > 0 && <span>{likes.length}</span>}</span>
					</div>
					<p>{caption}</p>
					<p className='hashtag'>{hashtag}</p>
					<p className='date'>
						Posted on &nbsp;<Moment format='YYYY/MM/DD'>{date}</Moment>
					</p>
					<Link to={`/gallery/${_id}`} className='PostItem-comment'>
						Comment:{' '}
						{comments.length > 0 ? (
							<span>{comments.length}</span>
						) : (
							<span>0</span>
						)}
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	postLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { postLike, removeLike, deletePost })(
	PostItem
);
