const posts = []

const postTitleInputNode = document.querySelector('.js-post-title-input')
const postTextInputNode = document.querySelector('.js-post-text-input')
const newPostBtnNode = document.querySelector('.js-new-post-btn')
const postsNode = document.querySelector('.js-posts')
const validationMassage = document.querySelector('.js-validationMassage')

newPostBtnNode.addEventListener('click', function () {
	//получить данные из поля ввода
	const postFromUser = getPostFromUser()
	// сохранить пост
	addPost(postFromUser)

	// отобразить пост
	renderPosts()
})

function getPostFromUser() {
	const date = getDate(new Date())
	const title = postTitleInputNode.value
	const text = postTextInputNode.value

	return {
		date: date,
		title: title,
		text: text,
	}
}

function addPost({ date, title, text }) {
	posts.push({
		date: date,
		title: title,
		text: text,
	})
}

function getPosts() {
	return posts
}

function renderPosts() {
	const posts = getPosts()
	let postsHTML = ''

	posts.forEach(post => {
		postsHTML += `
		<div class='posts'>
			<p class='post__date'>${post.date}</p>
			<p class='post__title'>${post.title}</p>
			<p class='post__text'>${post.text}</p>
		</div>
	`
	})
	postsNode.innerHTML = postsHTML
}

// date

function addLeadingZero(d) {
	if (d < 10) {
		d = '0' + d
	} else {
		d = d
	}
	return d
}

function getDate(date) {
	let result = `${addLeadingZero(date.getDay())}/${addLeadingZero(
		date.getMonth()
	)}/${date.getFullYear()} ${addLeadingZero(date.getHours())}:${addLeadingZero(
		date.getMinutes()
	)}`
	return result
}

//
