import { useRef } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const inputRef = useRef();

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		onUpdateAvatar(inputRef.current.value);
	}
	return (
		<PopupWithForm
			title="Обновить аватар"
			name="avatar"
			nameBtn="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			handleSubmit={handleSubmit}
		>
			<Input
				useRef={inputRef}
				id="popupProfileName"
				name="link"
				type="url"
				placeholder="Ссылка на страницу"
				classNameInput="popup__input popup__input_avatar"
				classNameValid="popup__input-error popupInputLinkAvatar-error"
				TextValid="Вы пропустили это поле"
			/>
		</PopupWithForm>
	);
}
export default EditAvatarPopup;
