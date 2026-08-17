const navigationItems = [
	{ label: "Home", href: "#home", id: "home" },
	{ label: "About", href: "#about", id: "about" },
	{ label: "Resume", href: "#resume", id: "resume" },
	{ label: "Contact", href: "#contact", id: "contact" },
];

type HeaderProps = {
	activeSection: string;
	onSectionChange: (sectionId: string) => void;
};

export function Header({ activeSection, onSectionChange }: HeaderProps) {
	return (
		<header className="site-header">
			<a
				className="brand"
				href="#home"
				aria-label="Go to home"
				onClick={() => onSectionChange("home")}
			>
				<span className="brand-mark">NN</span>
				<span className="brand-text">Nathan Nakamura</span>
			</a>
			<nav className="site-nav" aria-label="Primary navigation">
				{navigationItems.map((item) => (
					<a
						key={item.href}
						className={activeSection === item.id ? "is-active" : undefined}
						href={item.href}
						onClick={() => onSectionChange(item.id)}
					>
						{item.label}
					</a>
				))}
			</nav>
		</header>
	);
}
