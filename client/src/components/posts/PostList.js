import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post';
import './PostList.css';

const PostList = (props) => {
	useEffect(() => {
		props.fetchPosts();
		window.scrollTo(0, 0);
	}, [props.fetchPosts, props.auth]);

	const [formData, setFormData] = useState('');
	const [filtered, setFiltered] = useState(props.post.posts);

	const inputHandler = (e) => {
		setFormData(e.target.value);
		let oldList = props.post.posts.map((post) => {
			return {
				hashtag: post.hashtag.toLowerCase(),
				caption: post.caption,
				image: post.image,
				comments: post.comments,
				likes: post.likes,
				date: post.date,
				name: post.name,
				avatar: post.avatar,
				user: post.user,
				_id: post._id,
			};
		});
		if (formData !== '') {
			let newList = [];
			setFormData(e.target.value);
			newList = oldList.filter((post) =>
				post.hashtag.includes(formData.toLowerCase())
			);
			setFiltered(newList);
		} else {
			setFiltered(props.post.posts);
		}
	};

	return !props.auth.user && !props.post.posts ? (
		<div>Loading...</div>
	) : (
		<div className='PostList'>
			<h1>Daily Art Sharing</h1>
			<div className='PostList-search-bar'>
				<i className='fas fa-search'></i>
				<form>
					<input
						type='text'
						name='search'
						value={formData}
						onChange={inputHandler}
						placeholder='Search hashtags'
					/>
				</form>
			</div>
			<PostForm />
			<div className='PostList-cards'>
				{!props.loading && formData === ''
					? props.post.posts.map((post) => (
							<PostItem key={post._id} post={post} />
					  ))
					: filtered.map((post) => <PostItem key={post._id} post={post} />)}
			</div>
		</div>
	);
};

PostList.propTypes = {
	fetchPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

export default connect(mapStateToProps, { fetchPosts })(PostList);
