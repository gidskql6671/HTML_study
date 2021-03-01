import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const Post = ( {match} ) => {
	let [posts, setPosts] = useState([]);
	const style = {color: "black", width: "18rem"};
	
	
	useEffect(() => {
		if (match.params.page){
			axios.get('/api/post/' + match.params.page)
			.then((res) => {
				console.log(res);
				setPosts(res.data);
			});
		}
		else{
			axios.get('/api/post/1')
			.then((res) => {
				console.log(res);
				setPosts(res.data);
			});
		}
	}, []);
	
	
	return (
		<div>
			<h2> Post </h2>
			<hr className="hr-headline"/>
				<ul>
				{
					posts.map((post, i) =>{
						return <li key={i}>
							<MyCard id={post._id} name={post.title} age={post.content} />
						</li>
					})
				}
				</ul>
		</div>
	);
};

const MyCard = ({id, name, age}) => {
	return <div>
		<p> {id} </p>
		<h4> {name} </h4>
		<p> {age}살 </p>
		<hr />
	</div>
}


export default Post;