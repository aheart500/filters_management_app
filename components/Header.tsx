interface ButtonLink {
  title: string;
  link: string;
}
interface searchInputProps {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
}
interface HeaderProps {
  title: string;
  buttons?: ButtonLink[];
  search?: searchInputProps;
}

const Header = ({ title, buttons, search }: HeaderProps) => {
  return (
    <div className="w3-container w3-teal">
      <div className="header-box">
        <h1>{title}</h1>
        {buttons && (
          <div>
            {buttons.map((button, i) => (
              <button
                className="w3-button w3-black w3-hover-red mh-1"
                key={i}
                onClick={() => window.location.replace(button.link)}
              >
                {button.title}
              </button>
            ))}
          </div>
        )}
        {search && (
          <div className="search-input-container">
            <label htmlFor="search"></label>
            <input {...search} type="text" id="search" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
