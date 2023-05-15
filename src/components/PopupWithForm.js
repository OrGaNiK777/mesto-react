import { useEffect } from "react";

function PopupWithForm({
	title,
	name,
	nameBtn,
	children,
	isOpen,
	onClose,
	handleSubmit,
}) {
	//закрывает модальное окно при нажатии Esc
	useEffect(() => {
		function handleEscapeKey(event) {
			if (event.code === "Escape") {
				onClose();
			}
		}

		document.addEventListener("keydown", handleEscapeKey);
		return () => document.removeEventListener("keydown", handleEscapeKey);
	});

	// //закрытие по клику на оверлэй используя contains
	// document.addEventListener("mousedown", (evt) => {
	// 	if (
	// 		evt.target.classList.contains("popup") ||
	// 		evt.target.classList.contains("popup__button-close")
	// 	) {
	// 		console.log(evt);
	// 		onClose();
	// 	}
	// });

	return (
		<div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
			<div className="popup__container">
				<h2 className="popup__title">{title}</h2>
				<form
					className="popup__form"
					name={`${name}Form`}
					noValidate
					onSubmit={handleSubmit}
				>
					<button
						onClick={onClose}
						className="popup__button-close"
						type="button"
					></button>
					{children}
					<button className="popup__button-save" type="submit">
						{nameBtn}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
