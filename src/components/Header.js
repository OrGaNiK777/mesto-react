import headerLogo from "../images/header-logo.svg";

function Header() {
	return (
		<header className="header">
			<a href="_">
				<img className="header__logo" src={headerLogo} alt="Логотип Mesto" />
			</a>
		</header>
	);
}

export default Header;
