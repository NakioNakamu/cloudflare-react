import { useEffect, useState } from "react";
import { Header } from "../components/Header";

export function HomePage() {
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const sectionIds = ["home", "about", "resume", "contact"];

		const updateActiveSection = () => {
			const sections = sectionIds
				.map((id) => document.getElementById(id))
				.filter((section): section is HTMLElement => Boolean(section));
			const activationLine = window.scrollY + window.innerHeight * 0.35;
			const scrollBottom = window.scrollY + window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			if (documentHeight - scrollBottom <= 96) {
				setActiveSection("contact");
				return;
			}

			for (let index = sections.length - 1; index >= 0; index -= 1) {
				const section = sections[index];

				if (section && section.offsetTop <= activationLine) {
					setActiveSection(section.id);
					return;
				}
			}

			setActiveSection("home");
		};

		window.addEventListener("scroll", updateActiveSection, { passive: true });
		window.addEventListener("resize", updateActiveSection);
		updateActiveSection();

		return () => {
			window.removeEventListener("scroll", updateActiveSection);
			window.removeEventListener("resize", updateActiveSection);
		};
	}, []);

	return (
		<div className="site-shell">
			<Header activeSection={activeSection} onSectionChange={setActiveSection} />
			<main>
				<section className="hero-section" id="home" aria-labelledby="hero-title">
					<div className="hero-copy">
						<p className="eyebrow">Senior Engineer</p>
						<h1 id="hero-title">Engineering Through Understanding</h1>
						<p className="hero-summary">
							I'm an engineer and technical consultant driven by understanding
							how things work, solving difficult problems, and turning that
							understanding into practical solutions.
						</p>
						<div className="hero-actions" aria-label="Primary actions">
							<a className="button button-primary" href="#about">
								Read Bio
							</a>
							<a className="button button-secondary" href="#contact">
								Get in Touch
							</a>
						</div>
					</div>
				</section>

				<section className="content-section" id="about" aria-labelledby="about-title">
					<div className="section-heading">
						<p className="eyebrow">About</p>
						<h2 id="about-title">Bio Snapshot</h2>
					</div>
					<div className="about-grid">
						<p>
							My path into engineering has been anything but conventional. From
							military service to computer engineering, systems engineering,
							software development, and technical consulting, each step has shaped
							how I approach problems today. I've worked across application
							development, cloud architecture, AI, and distributed systems,
							bridging deeply technical teams and the customers they serve.
						</p>
						<p>
							What has remained consistent is curiosity. I want to understand
							systems beyond the abstraction: how the pieces interact, why
							decisions were made, where tradeoffs exist, and what happens when
							things fail. That curiosity is ultimately what brought me here. This
							site is both an introduction to who I am and an opportunity to learn
							Cloudflare by building with it.
						</p>
					</div>
				</section>

				<section
					className="content-section resume-section"
					id="resume"
					aria-labelledby="resume-title"
				>
					<div className="section-heading">
						<p className="eyebrow">Resume</p>
						<h2 id="resume-title">Resume Asset</h2>
					</div>
					<div className="resume-panel">
						<div>
							<h3>Ready for your PDF</h3>
							<p>
								When you add your resume, place it at
								<code> src/react-app/assets/resume.pdf</code>. We can then switch
								this call-to-action to import the asset directly for production.
							</p>
						</div>
						<a className="button button-disabled" href="#resume" aria-disabled="true">
							Resume Coming Soon
						</a>
					</div>
				</section>

				<section
					className="content-section contact-section"
					id="contact"
					aria-labelledby="contact-title"
				>
					<div className="section-heading">
						<p className="eyebrow">Contact</p>
						<h2 id="contact-title">Start a Conversation</h2>
					</div>
					<div className="contact-panel">
						<p>
							Add your preferred email, LinkedIn, or booking link here when you
							are ready to make the site public.
						</p>
						<a className="button button-disabled" href="#contact" aria-disabled="true">
							Contact Info Coming Soon
						</a>
					</div>
				</section>
			</main>
		</div>
	);
}
