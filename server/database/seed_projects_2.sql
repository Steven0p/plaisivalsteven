-- Ajoute rès pwojè GitHub yo (verifye README/SPEC/package.json chak repo)
USE portfolio_db;

INSERT INTO projects (title, description, image, technologies, github_url, demo_url)
VALUES
(
  'Lekòl Konekte',
  'Platfòm jesyon eskolè pou lekòl ayisyen: enskripsyon, nòt, bilten, ak piblikasyon dokiman ofisyèl. Bati ak React/Vite, API REST Node.js/Express, ak MySQL, deplwaye ak Docker — ak tès otomatize pou kalkil bilten yo.',
  NULL,
  'React, Node.js, Express, MySQL, Docker',
  'https://github.com/Steven0p/Lekol-Konekte',
  'https://www.rezolekol.com/'
),
(
  'PsyIA',
  'Platfòm konesans sikoloji, sipò emosyonèl, ak oryantasyon vè pwofesyonèl, an Kreyòl ak Fransè. React/Vite pou frontend, Node.js/Express ak MySQL pou backend, ak Helmet, rate-limiting, JWT ak bcrypt pou sekirite.',
  NULL,
  'React, Node.js, Express, MySQL',
  'https://github.com/Steven0p/humanispsyia',
  'https://www.humanispsyia.online/'
),
(
  'OCDEES',
  'Sit wèb ofisyèl pou OCDEES (Òganizasyon Sitwayen pou Devlopman ak Ankadreman Anviwonman Sosyal la), Pòtoprens. Yon monorepo React/Node.js/TypeScript/MySQL, deplwaye sou Railway.',
  NULL,
  'React, Node.js, TypeScript, MySQL',
  'https://github.com/Steven0p/OCDEES',
  'https://www.ocdees.org/'
),
(
  'Camie Bazar — Sistèm POS',
  'Sistèm Pwen Vant (POS) pou ti boutik ak magazen kwatye an Ayiti, panse pou reyalite lokal la (kouran/entènèt pa fyab) ak sipò peman MonCash. Pwojè a pote pa Infinity Code. Bati ak React/Tailwind, Node.js/Express, PostgreSQL ak Prisma.',
  NULL,
  'React, Tailwind CSS, Node.js, Express, PostgreSQL, Prisma',
  'https://github.com/Steven0p/Camie-Bazar',
  NULL
),
(
  'Platfòm Inivèsitè — Premye Pwototip',
  'Premye eksplorasyon konsèp platfòm nimerik inivèsitè a: yon backend Express/Sequelize/MySQL ak modèl Itilizatè, Fakilte, Kou ak Jounal Aktivite, konekte ak yon frontend React/Vite. Pwototip sa a te trase chemen pou pwojè E-UNI a.',
  NULL,
  'React, Node.js, Express, Sequelize, MySQL',
  'https://github.com/Steven0p/universite',
  NULL
),
(
  'URHC Soutnans — Sijè Ofisyèl & Rapò Final',
  'Pakè livrezon akademik pou kou Pwogramasyon Web PHP Prosedirèl nan Université Roi Henri Christophe (URHC): sijè ofisyèl la, yon SPEC teknik konplè, ak rapò PDF final soutnans lan. Gen ladan premye vèsyon aplikasyon jesyon memwa/soutnans lan, kontinye epi rafine nan pwojè URHC — Jesyon Memwa ak Soutnans.',
  NULL,
  'PHP, MySQL',
  'https://github.com/Steven0p/Projet-PHP',
  NULL
),
(
  'Plasm School',
  'Sit vitrin estatik pou yon lekòl — prezantasyon pwogram akademik ak angajman kalite.',
  NULL,
  'HTML, CSS',
  'https://github.com/Steven0p/plasmschool',
  NULL
);

INSERT INTO skills (name, level, category, icon)
VALUES
('TypeScript', NULL, 'Frontend', NULL),
('PostgreSQL', NULL, 'Backend', NULL),
('Docker', NULL, 'Zouti', NULL),
('Prisma / Sequelize', NULL, 'Zouti', NULL);
