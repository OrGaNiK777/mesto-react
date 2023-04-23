function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
	return (
		<main>
			<section className="profile">
				<div className="profile__container">
					<button onClick={onEditAvatar} className="profile__avatar-edit" type="button" aria-label="update avatar">
						<img className="profile__avatar" src="#" alt="Аватар" />
					</button>
					<div className="profile__info">
						<h1 className="profile__name">123</h1>
						<p className="profile__about">321</p>
						<button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
					</div>
				</div>
				<button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Кнопка добавить"></button>
			</section>
			<section className="cards"></section>
		</main>
	);
}

export default Main;
