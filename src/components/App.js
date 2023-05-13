import { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "./utils/Api.js";
import { Route, Routes } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext.js";

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
	const [currentUser, setCurrentUser] = useState("");

	//выгрузка карт с сервера
	const [cards, setCards] = useState([]);

	useEffect(() => {
		Promise.all([api.getUserInfo(), api.getInitialCards()])
			.then(([data, item]) => {
				setCards(item);
				setCurrentUser(data);
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

	//Добавьте поддержку лайков
	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some((i) => i._id === currentUser._id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		!isLiked
			? api.putLike(card._id, !isLiked).then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
			  })
			: api.deleteLike(card._id, !isLiked).then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
			  });
	}

	//Добавьте поддержку удаления карточки
	function handleCardDelete(card) {
		// Определяем, являемся ли мы владельцем текущей карточки
		const isOwn = card.owner._id === currentUser._id;

		//Отправляем запрос в API и получаем карточки
		api.deleteCard(card._id, !isOwn).then(() => {
			const newCard = cards.filter((item) => item._id !== card._id);
			setCards(newCard);
		});
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header />
				<Routes>
					<Route
						index
						path="/"
						element={
							<Main
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onEditAvatar={handleEditAvatarClick}
								currentUser={currentUser}
								cards={cards}
								handleCardClick={handleCardClick}
								handleCardLike={handleCardLike}
								handleCardDelete={handleCardDelete}
							/>
						}
					/>
					<Route
						path="*"
						element={<h2 style={{ color: "#FF8C00" }}>404</h2>}
					/>
					<Route path="/phptos/:id" element="" />
					<Route />
				</Routes>
				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
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
					<span className="popup__input-error popupInputLink-error">
						Введите адрес сайта
					</span>
				</PopupWithForm>
				<PopupWithForm
					title="Вы уверены?"
					name="delete"
					nameBtn="Да!"
				></PopupWithForm>
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
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
