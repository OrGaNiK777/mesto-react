import Card from "./Card";
function Main({
	onEditProfile,
	onAddPlace,
	onEditAvatar,
	userName,
	userDescription,
	userAvatar,
	cards,
	handleCardClick,
}) {
	return (
		<>
			<main>
				<section className="profile">
					<div className="profile__container">
						<button
							onClick={onEditAvatar}
							className="profile__avatar-edit"
							type="button"
							aria-label="update avatar"
						>
							<img
								className="profile__avatar"
								style={{ backgroundImage: `url(${userAvatar})` }}
							/>
						</button>
						<div className="profile__info">
							<h1 className="profile__name">{userName}</h1>
							<p className="profile__about">{userDescription}</p>
							<button
								onClick={onEditProfile}
								className="profile__edit-button"
								type="button"
							></button>
						</div>
					</div>
					<button
						onClick={onAddPlace}
						className="profile__add-button"
						type="button"
						aria-label="Кнопка добавить"
					></button>
				</section>
			</main>
			<section className="cards">
				{cards.map((item) => (
					<Card
						card={item}
						key={item._id}
						src={item.link}
						title={item.name}
						likes={item.likes}
						owner={item.owner}
						onCardClick={handleCardClick}
					></Card>
				))}
			</section>
		</>
	);
}

export default Main;
