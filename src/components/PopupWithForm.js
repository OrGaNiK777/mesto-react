function PopupWithForm({ title, name, children, nameBtn, isOpen, onClose }) {
	return (
		<div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
			<div className="popup__container">
				<h2 className="popup__title">{title}</h2>
				<form className="popup__form" name={`${name}Form`} noValidate>
					<button
						onClick={onClose}
						className="popup__button-close"
						type="button"
					></button>
					{children}
					<button
						className="popup__button-save popup__button-save_inactive"
						type="submit"
						disabled
					>
						{nameBtn}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
