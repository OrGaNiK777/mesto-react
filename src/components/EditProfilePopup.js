import React from "react";
import { useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
	const [name, setName] = useState("");
	const [about, setDescription] = useState("");

	// Подписка на контекст
	const currentUser = React.useContext(CurrentUserContext);

	// После загрузки текущего пользователя из API
	// его данные будут использованы в управляемых компонентах.
	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name,
			about,
		});
	}

	return (
		<PopupWithForm
			title="Редактировать профиль"
			name="profile"
			nameBtn={isLoading ? "Сохранение..." : "Сохранение"}
			isOpen={isOpen}
			onClose={onClose}
			handleSubmit={handleSubmit}
		>
			<Input
				id="popupProfileName"
				name="name"
				placeholder="Имя"
				maxLength="40"
				minLength="2"
				value={name || ""}
				handleChange={(e) => setName(e.target.value)}
				classNameInput={"popup__input popup__input_addEdit"}
				classNameValid={"popup__input-error popupProfileName-error"}
				TextValid={"Вы пропустили это поле"}
				type="text"
			></Input>
			<Input
				className="popup__input popup__input_addEdit"
				id="popupProfileAbout"
				name="about"
				placeholder="Описание"
				maxLength="200"
				minLength="2"
				value={about || ""}
				handleChange={(e) => setDescription(e.target.value)}
				classNameInput={"popup__input popup__input_addEdit"}
				classNameValid={"popup__input-error popupProfileAbout-error"}
				TextValid={"Вы пропустили это поле"}
				type="text"
			></Input>
		</PopupWithForm>
	);
}
export default EditProfilePopup;
