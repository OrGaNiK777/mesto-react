import { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "./utils/Api.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
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
	const [currentUser, setCurrentUser] = useState("");

	//отправка данный о пользователе на сервер
	function handleUpdateUser({ name, about }) {
		api.patchUserInfo({ name, about })
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	// Отправка данных для изменения аватара
	function handleUpdateAvatar(avatar) {
		api.updateAvatar(avatar)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

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

	//отправка новой карты
	function handleAddPlaceSubmit(item) {
		api.postDataCards(item)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

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

	//

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header />

				<Main
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					currentUser={currentUser}
				>
					{cards.map((item) => (
						<Card
							currentUser={currentUser}
							card={item}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						></Card>
					))}
				</Main>

				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
				<Footer />
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlaceSubmit={handleAddPlaceSubmit}
				/>
				<PopupWithForm
					title="Вы уверены?"
					name="delete"
					nameBtn="Да!"
				></PopupWithForm>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
