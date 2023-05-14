import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
	const [name, setName] = useState("");
	const [link, setLink] = useState("");

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		onAddPlaceSubmit({
			name,
			link,
		});
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="add"
			nameBtn="Создать"
			isOpen={isOpen}
			onClose={onClose}
			handleSubmit={handleSubmit}
		>
			<Input
				id="popupInputTitle"
				name="name"
				type="text"
				placeholder="Название"
				maxLength="30"
				minLength="2"
				value={name}
				handleChange={(e) => setName(e.target.value)}
				classNameInput="popup__input popup__input_addEdit"
				classNameValid="popup__input-error popupInputTitle-error"
				TextValid="Вы пропустили это поле"
			/>
			<Input
				id="popupInputLink"
				name="link"
				type="url"
				value={link}
				handleChange={(e) => setLink(e.target.value)}
				classNameInput="popup__input popup__input_addEdit"
				classNameValid="popup__input-error popupInputLink-error"
				placeholder="Ссылка на страницу"
				TextValid="Введите адрес сайта"
			/>
		</PopupWithForm>
	);
}
export default AddPlacePopup;
