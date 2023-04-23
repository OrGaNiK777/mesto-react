import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}
	return (
		<div className="page">
			<Header />
			<Main
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
			/>
			<Footer />
			<PopupWithForm
				title="Редактировать профиль"
				name="profile"
				isOpen={isEditProfilePopupOpen}
			>
				<input
					className="popup__input popup__input_addEdit"
					id="popupProfileName"
					name="name"
					type="text"
					placeholder="Имя"
					required
					maxLength="40"
					minLength="2"
				/>
				<span className="popup__input-error popupProfileName-error">
					Вы пропустили это поле
				</span>
				<input
					className="popup__input popup__input_addEdit"
					id="popupProfileAbout"
					name="about"
					type="text"
					placeholder="Описание"
					required
					maxLength="200"
					minLength="2"
				/>
				<span className="popup__input-error popupProfileAbout-error">
					Вы пропустили это поле
				</span>
				<button
					className="popup__button-save popup__button-save_inactive"
					id="submitEditProfife"
					type="submit"
					disabled
				>
					Сохранить
				</button>
			</PopupWithForm>
			<PopupWithForm title="Новое место" name="add" isOpen={isAddPlacePopupOpen}>
				<input
					className="popup__input popup__input_addEdit"
					id="popupInputTitle"
					name="name"
					type="text"
					placeholder="Название"
					required
					maxLength="30"
					minLength="2"
				/>
				<span className="popup__input-error popupInputTitle-error">
					Вы пропустили это поле
				</span>
				<input
					className="popup__input popup__input_addEdit"
					id="popupInputLink"
					name="link"
					type="url"
					placeholder="Ссылка на страницу"
					required
				/>
				<span className="popup__input-error popupInputLink-error">Введите адрес сайта</span>
				<button
					className="popup__button-save popup__button-save_inactive"
					id="submitAddCard"
					type="submit"
					disabled
				>
					Создать
				</button>
			</PopupWithForm>
			<PopupWithForm title="Вы уверены?" name="delete">
				<button
					className="popup__button-save popup__button-save_delete"
					id="submitDeleteCard"
					type="submit"
				>
					Да!
				</button>
			</PopupWithForm>
			<PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen}>
				<input
					className="popup__input popup__input_avatar"
					id="popupInputLinkAvatar"
					name="link"
					type="url"
					placeholder="Ссылка на страницу"
					required
				/>
				<span className="popup__input-error popupInputLinkAvatar-error">
					Введите адрес сайта
				</span>
				<button className="popup__button-save" id="submitAvatar" type="submit">
					Сохранить
				</button>
			</PopupWithForm>
			<ImagePopup />
		</div>
	);
}

export default App;
