import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "./utils/Api.js";
import Card from "./Card";

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
	const [userApi, setUserApi] = useState("");

	const [userName, setUserName] = useState("");
	const [userDescription, setUserDescription] = useState("");
	const [userAvatar, setUserAvatar] = useState("");

	useEffect(() => {
		api.getUserInfo(userApi)
			.then((data) => {
				setUserName(data.name);
				setUserDescription(data.about);
				setUserAvatar(data.avatar);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}, []);

	//выгрузка карт с сервера
	const [cardList, setCardList] = useState([]);
	const [cards, setCards] = useState([]);

	useEffect(() => {
		api.getInitialCards(cardList)
			.then((data) => {
				setCards(data);
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
			/>
			<section className="cards">
				{cards.map((item) => (
					<Card
						card={item}
						key={item._id}
						src={item.link}
						title={item.name}
						likes={item.likes}
						owner={item.owner}
						onCardClick={handleCardClick}
					></Card>
				))}
			</section>
			<Footer />
			<PopupWithForm
				title="Редактировать профиль"
				name="profile"
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
				<button
					className="popup__button-save popup__button-save_inactive"
					id="submitEditProfife"
					type="submit"
					disabled
				>
					Сохранить
				</button>
			</PopupWithForm>
			<PopupWithForm
				title="Новое место"
				name="add"
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
			<PopupWithForm
				title="Обновить аватар"
				name="avatar"
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
				<button className="popup__button-save" id="submitAvatar" type="submit">
					Сохранить
				</button>
			</PopupWithForm>
			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
		</div>
	);
}

export default App;
