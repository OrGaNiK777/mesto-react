import headerLogo from "../../images/header-logo.svg";

function Header() {
	return (
		<header className="header">
			<a href="#">
				<img className="header__logo" src={headerLogo} alt="Логотип Mesto" />
			</a>
		</header>
	);
}

export default Header;
