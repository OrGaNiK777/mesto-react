function ImagePopup() {
	return (
		<div>
			<div className="popup popup-img">
				<div className="popup-img__container">
					<button
						id="buttonClosePopupImg"
						className="popup__button-close"
						type="button"
					></button>
					<img className="popup-img__img" src="#" alt="_" />
					<h2 className="popup-img__title"></h2>
				</div>
			</div>
		</div>
	);
}

export default ImagePopup;
