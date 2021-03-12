import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

import 'scss/PostList.scss';
import { Pagination } from 'components';

const PostList = ( {match} ) => {
	let [posts, setPosts] = useState([]); // post 데이터
	let [totalPosts, setTotalPosts] = useState(1); // post 데이터의 총 개수
	let [currentPage, setCurrentPage] = useState(1); // 현재 페이지
	let [currentPosts, setCurrentPosts] = useState([]); // 현재 페이지에서 보여줄 post 데이터
	let [isLoading, setIsLoading] = useState(true); // 현재 데이터를 불러오는 중인가?
	let postsPerPage = 5; // 한 페이지당 post를 몇개를 보여줄 것인가.
	
	const paginate = (pageNumber) => { setCurrentPage(pageNumber) };
	
	
	useEffect(() => {
		setCurrentPage(parseInt(match.params.page));
		
		// post의 총 개수 가져오기
		axios.get('/api/post/count')
		.then(( {data: {count}} ) =>{
			setTotalPosts( count );
		})
		.catch(err => console.log("fecth count error"));
		
		// 전체 다 가져오기
		axios.get('/api/post')
		.then(( {data} ) => {
			setPosts(data);
		})
		.catch(err => console.log("fecth post error"));
		
		
		// 일정 개수만큼 가져오기
		// axios.get('/api/post/page/' + currentPage, {params: {count: postsPerPage}})
		// .then((res) => {
		// 	setPosts(res.data);
		// });
	}, []);
	
	useEffect(() => {
		const indexOfLastPost = currentPage * postsPerPage; // 마지막 Post의 index 번호
		const indexOfFirstPost = indexOfLastPost - postsPerPage; // 첫번째 Post의 index 번호
		const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // slice로 필요한 데이터만 잘라온다.
		
		if (currentPosts.length){
			setIsLoading(false);
			setCurrentPosts(currentPosts)
		}
	}, [currentPage, posts]);
	
	
	if (isLoading)
		return(
			<div>
				<h2> Post </h2>
				<hr className="hr-headline"/>
				<div style={{textAlign: "center"}}>
					<Spinner animation="border"/>
				</div>
			</div>
		);
		
	return (
		<div>
			<h2> Post </h2>
			<hr className="hr-headline"/>
			<ul>
			{
				currentPosts.map((post, i) =>{
					return <li key={i}>
						<Post id={post._id} title={post.title} content={post.content} />
					</li>
				})
			}
			</ul>
			<Pagination  postsPerPage={postsPerPage} totalPosts={totalPosts} currentPage={currentPage} paginate={paginate} />
		</div>
	);
};

const Post = ({id, title, content}) => {
	return <div className="Post">
		<p> {id} </p>
		<Link to={"/post/content/" + id} style={{textDecoration: 'none'}}>
			<h4> {title} </h4>
			<p> {content} </p>
		</Link>
		<hr />
	</div>
}


export default PostList;