import { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "./utils/Api.js";
import Card from "./Card.js";

function App() {
	//управление видимостью попапов
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

	// //закрывает модальное окно при нажатии Esc
	// useEffect(() => {
	// 	function handleEscapeKey(event) {
	// 		if (event.code === "Escape") {
	// 			closeAllPopups();
	// 		}
	// 	}

	// 	document.addEventListener("keydown", handleEscapeKey);
	// 	return () => document.removeEventListener("keydown", handleEscapeKey);
	// }, []);

	//закрытие по клику на оверлэй используя contains
	// document.addEventListener("mousedown", (evt) => {
	// 	if (
	// 		evt.target.classList.contains("popup") ||
	// 		evt.target.classList.contains("popup__button-close")
	// 	) {
	// 		closeAllPopups();
	// 	}
	// });

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard({});
	}

	//выгрузка данных о пользователе с сервера
	const [userName, setUserName] = useState("");
	const [userDescription, setUserDescription] = useState("");
	const [userAvatar, setUserAvatar] = useState("");

	//выгрузка карт с сервера
	const [cards, setCards] = useState([]);

	useEffect(() => {
		Promise.all([api.getUserInfo(), api.getInitialCards()])
			.then(([data, item]) => {
				setCards(item);
				setUserName(data.name);
				setUserDescription(data.about);
				setUserAvatar(data.avatar);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}, []);

	//увеличение картинки карты
	const [selectedCard, setSelectedCard] = useState({});

	function handleCardClick(selectedCard) {
		setSelectedCard(selectedCard);
	}

	return (
		<div className="page">
			<Header />
			<Main
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
				userName={userName}
				userDescription={userDescription}
				userAvatar={userAvatar}
				cards={cards}
				handleCardClick={handleCardClick}
			/>

			<Footer />
			<PopupWithForm
				title="Редактировать профиль"
				name="profile"
				nameBtn="Сохранить"
				isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}
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
			</PopupWithForm>
			<PopupWithForm
				title="Новое место"
				name="add"
				nameBtn="Создать"
				isOpen={isAddPlacePopupOpen}
				onClose={closeAllPopups}
			>
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
			</PopupWithForm>
			<PopupWithForm title="Вы уверены?" name="delete" nameBtn="Да!"></PopupWithForm>
			<PopupWithForm
				title="Обновить аватар"
				name="avatar"
				nameBtn="Сохранить"
				isOpen={isEditAvatarPopupOpen}
				onClose={closeAllPopups}
			>
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
			</PopupWithForm>
			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
		</div>
	);
}

export default App;
