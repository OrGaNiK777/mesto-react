function PopupWithForm({ title, name, children, isOpen }) {
	return (
		<div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
			<div className="popup__container">
				<h2 className="popup__title">{title}</h2>
				<form className="popup__form" name={`${name}Form`} noValidate>
					<button className="popup__button-close" type="button"></button>
					{children}
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
