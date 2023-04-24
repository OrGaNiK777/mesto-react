function Card({ card, onCardClick }) {
	function handleClick() {
		onCardClick(card);
	}
	return (
		<article className="card">
			<button className="card__icon-delete" type="button"></button>
			<div
				onClick={handleClick}
				className="card__image"
				style={{ backgroundImage: `url(${card.link})` }}
			/>
			<div className="card__info">
				<h2 className="card__title">{card.name}</h2>
				<div className="card__like">
					<button className="card__icon-like" type="button"></button>
					<p className="card__number-likes">{card.likes.length}</p>
				</div>
			</div>
		</article>
	);
}

export default Card;
