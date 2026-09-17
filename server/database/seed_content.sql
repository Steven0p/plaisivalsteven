-- Kontni reyèl pou pwofil la, kolekte epi verifye sou GitHub (github.com/Steven0p)
-- ak lyen rezo sosyal yo bay dirèkteman pa pwopriyetè a. Egzekite yon sèl fwa.

USE portfolio_db;

INSERT INTO profile (full_name, title, bio, photo, email, phone, location, cv_url)
VALUES (
  'Steven Plaisival',
  'Devlopè Full-Stack · Fotograf',
  'Devlopè Full-Stack ki baze an Ayiti, ap etidye nan Université Roi Henri Christophe (URHC). Mwen bati aplikasyon web konplè pou kontèks ayisyen — pòtay inivèsitè, sistèm jesyon memwa ak soutnans — ak React, Node.js, PHP ak MySQL, ak yon atansyon patikilye sou sekirite (requêtes preparees, CSRF, kontwòl aksè pa wòl). Mwen pasyone tou pou fotografi.',
  'https://avatars.githubusercontent.com/u/222989476?v=4',
  'plaisivalsteven@gmail.com',
  NULL,
  'Ayiti',
  NULL
);

INSERT INTO projects (title, description, image, technologies, github_url, demo_url)
VALUES
(
  'E-UNI — Espace Numérik Inivèsitè',
  'Yon platfòm dijital pou enstitisyon inivèsitè ayisyen: jesyon kou ak pwogram, swiv nòt, peman frè akademik ak MonCash, mesajri entèn ak yon bibliyotèk resous dijital. Pwojè a dokimante ak yon SRS konplè (v2.0) — pote pa Infinity Code, Pòtoprens.',
  NULL,
  'React, Node.js, Express, MySQL',
  'https://github.com/Steven0p/E-UNI',
  NULL
),
(
  'URHC — Jesyon Memwa ak Soutnans',
  'Aplikasyon web pou jere memwa, soutnans ak jiri inivèsitè pou Université Roi Henri Christophe (URHC). Bati an PHP prosedirèl san framework, ak PDO/requêtes preparees, kontwòl aksè pa wòl (admin/responsab), ak jeton CSRF sou tout aksyon sansib.',
  NULL,
  'PHP, MySQL, PDO, Tailwind CSS',
  'https://github.com/Steven0p/USFAH-SOUTENANCE',
  NULL
);

INSERT INTO skills (name, level, category, icon)
VALUES
('React', NULL, 'Frontend', NULL),
('JavaScript', NULL, 'Frontend', NULL),
('HTML5 / CSS3', NULL, 'Frontend', NULL),
('Tailwind CSS', NULL, 'Frontend', NULL),
('Node.js / Express', NULL, 'Backend', NULL),
('PHP', NULL, 'Backend', NULL),
('MySQL / MariaDB', NULL, 'Backend', NULL),
('PDO & Requêtes Préparées', NULL, 'Backend', NULL),
('Git & GitHub', NULL, 'Zouti', NULL),
('Fotografi', NULL, 'Kreyativite', NULL);

INSERT INTO socials (platform, url, icon)
VALUES
('GitHub', 'https://github.com/Steven0p', NULL),
('Instagram', 'https://www.instagram.com/steven___.p/', NULL);
