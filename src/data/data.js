/* ------------------------------------------------------------------
   IxDF Pakistan — site content
   ------------------------------------------------------------------
   PLACEHOLDER CONTENT: every figure, name, date, venue, partner and
   quote below is illustrative and must be replaced with real
   information before launch. Logos are typographic stand-ins.
------------------------------------------------------------------- */
export const DATA = {
  stats: [
    { n: 10, s: '', label: 'City chapters' },
    { n: 60, s: '+', label: 'Partner universities' },
    { n: 25000, s: '+', label: 'Community members' },
    { n: 150, s: '+', label: 'Workshops & webinars a year' }
  ],

  chapters: [
    { slug: 'karachi', photo: '/img/karachi-city.jpg',   name: 'Karachi',   lon: 67.01, lat: 24.86, members: 6700, unis: 12, focus: 'Fintech, e-commerce & civic design', blurb: 'The largest chapter and home of the Karachi Design Summit. Weekly meetups, portfolio clinics and a growing research community.' },
    { slug: 'lahore', photo: '/img/minar.jpg',    name: 'Lahore',    lon: 74.35, lat: 31.55, members: 6000, unis: 11, focus: 'Product design, branding & culture tech', blurb: 'A creative capital with deep roots in visual culture. Hosts Lahore Design Week and the monthly Design Night.' },
    { slug: 'islamabad', photo: '/img/faisal-night.jpg', name: 'Islamabad', lon: 73.05, lat: 33.68, members: 4200, unis: 9,  focus: 'GovTech, AI & service design', blurb: 'Closest to policy and public-sector digital teams. Leads our work on language-inclusive and public-service design.' },
    { slug: 'peshawar', photo: '/img/faisal-day.jpg',  name: 'Peshawar',  lon: 71.58, lat: 34.01, members: 1900, unis: 6,  focus: 'Student programs & freelancing', blurb: 'A fast-growing student-led chapter running design sprints and freelancer bootcamps across campuses.' },
    { slug: 'faisalabad', photo: '/img/grad-blue.jpg',name: 'Faisalabad',lon: 73.07, lat: 31.42, members: 1700, unis: 5,  focus: 'Industry, textile & B2B tools', blurb: 'Connecting designers with manufacturing and export businesses that are digitising fast.' },
    { slug: 'multan', photo: '/img/badshahi.jpg',    name: 'Multan',    lon: 71.47, lat: 30.20, members: 1300, unis: 4,  focus: 'Craft, heritage & agritech', blurb: 'Pairing traditional craft knowledge with modern product thinking and agritech problems.' },
    { slug: 'hyderabad', photo: '/img/grad-orange.jpg', name: 'Hyderabad', lon: 68.37, lat: 25.40, members: 1100, unis: 4,  focus: 'Education & local-language UX', blurb: 'Building Sindhi and Urdu UX resources and teaching-focused design programs.' },
    { slug: 'sialkot', photo: '/img/grad-soft.jpg',   name: 'Sialkot',   lon: 74.53, lat: 32.50, members: 800,  unis: 3,  focus: 'Export, sports & manufacturing', blurb: 'Helping an export hub design better digital storefronts and supply-chain tools.' },
    { slug: 'quetta', photo: '/img/grad-teal.jpg',    name: 'Quetta',    lon: 66.99, lat: 30.18, members: 900,  unis: 3,  focus: 'Access, mentorship & remote work', blurb: 'Focused on mentorship, remote-work readiness and bringing national events to Balochistan.' },
    { slug: 'gilgit', photo: '/img/faisal-day.jpg',    name: 'Gilgit',    lon: 74.31, lat: 35.92, members: 600,  unis: 3,  focus: 'Tourism, climate & community tech', blurb: 'The newest chapter, exploring tourism, climate resilience and community-first digital tools.' }
  ],

  /* hue drives the generated cover art on cards */
  events: [
    {
      slug: 'karachi-design-summit-2026', img: '/img/stage.jpg', title: 'Karachi Design Summit 2026', type: 'summit', hue: 262, featured: true,
      start: '2026-11-21', end: '2026-11-23', dateLabel: '21–23 Nov 2026',
      city: 'Karachi', venue: 'Expo Centre Karachi', mode: 'Hybrid', price: 'Early-bird from PKR 4,500', seats: '3,000+ attendees',
      blurb: 'Three days, 40+ speakers and the biggest gathering of designers, researchers and product leaders in Pakistan.',
      about: 'The Karachi Design Summit brings the whole ecosystem under one roof: designers, researchers, engineers, founders, students and the teams building public services. Expect keynotes, hands-on labs, a showcase of Pakistani product work and a career fair with partner companies.',
      agenda: [
        ['Day 1', 'Foundations & Keynotes', 'Opening keynote, state of design in Pakistan report, and panels on AI in everyday products.'],
        ['Day 2', 'Hands-on Labs', 'Parallel workshops on research, design systems, accessibility and prototyping with AI.'],
        ['Day 3', 'Showcase & Careers', 'Student and startup showcase, portfolio reviews, partner career fair and closing celebration.']
      ],
      speakers: [['Keynote speaker', 'Head of Design · Fintech partner'], ['Panel lead', 'Director of Research · Telecom partner'], ['Workshop host', 'Principal Designer · Global product team'], ['Panelist', 'GovTech Design Lead · Public sector']]
    },
    {
      slug: 'career-in-design-webinar', img: '/img/students.jpg', title: 'Breaking into Product Design: Portfolio Clinic', type: 'webinar', hue: 190,
      start: '2026-10-28', end: '2026-10-28', dateLabel: '28 Oct 2026',
      city: 'Online', venue: 'Live on Zoom', mode: 'Online', price: 'Free', seats: '1,000 seats',
      blurb: 'Live portfolio reviews with hiring managers, plus a clear roadmap for your first product design role.',
      about: 'Bring your portfolio, case study or even just an idea. Hiring managers from partner companies review submissions live and share exactly what they look for in junior and mid-level designers in Pakistan.',
      agenda: [['0:00', 'What hiring managers really look for', 'Five patterns in portfolios that get interviews.'], ['0:30', 'Live portfolio reviews', 'Submitted portfolios reviewed on air.'], ['1:15', 'Q&A', 'Open questions on salaries, remote work and freelancing.']],
      speakers: [['Host', 'IxDF Pakistan Programs Team'], ['Reviewer', 'Design Manager · Software house'], ['Reviewer', 'Senior Product Designer · Startup']]
    },
    {
      slug: 'lahore-design-systems-workshop', img: '/img/whiteboard.jpg', title: 'Design Systems at Scale: A Hands-on Workshop', type: 'workshop', hue: 305,
      start: '2026-10-31', end: '2026-10-31', dateLabel: '31 Oct 2026',
      city: 'Lahore', venue: 'Innovation Hub, Gulberg', mode: 'In-person', price: 'PKR 1,500', seats: '80 seats',
      blurb: 'Build tokens, components and documentation that a real team can adopt, in one intensive day.',
      about: 'A practical, build-along workshop. You will leave with a working token set, a small component library in Figma and a documentation template your team can reuse. Laptops required; basic Figma knowledge assumed.',
      agenda: [['09:30', 'Tokens & foundations', 'Colour, type and spacing systems that survive handoff.'], ['12:00', 'Component building lab', 'Variants, states and accessibility baked in.'], ['15:00', 'Docs & adoption', 'Getting engineers and stakeholders to actually use it.']],
      speakers: [['Lead facilitator', 'Design Systems Lead · Product company'], ['Co-facilitator', 'Frontend Engineer · Design technologist']]
    },
    {
      slug: 'designing-with-ai-webinar', img: '/img/grad-teal.jpg', title: 'Designing with AI: From Research to Prototype', type: 'webinar', hue: 215,
      start: '2026-11-05', end: '2026-11-05', dateLabel: '5 Nov 2026',
      city: 'Online', venue: 'Live on Zoom', mode: 'Online', price: 'Free', seats: '1,500 seats',
      blurb: 'A practical look at where AI genuinely speeds up design work and where it quietly gets in the way.',
      about: 'We walk through a real project end-to-end: synthesising interviews, exploring concepts, generating prototypes and testing the results, with an honest look at the quality, bias and ethics trade-offs along the way.',
      agenda: [['0:00', 'The honest AI workflow', 'What to automate, what to keep human.'], ['0:35', 'Live demo', 'Research synthesis to clickable prototype.'], ['1:10', 'Ethics & Q&A', 'Bias, privacy and responsible use.']],
      speakers: [['Speaker', 'Head of AI Design · Technology company'], ['Moderator', 'Islamabad Chapter Lead']]
    },
    {
      slug: 'islamabad-urdu-ux-research-workshop', img: '/img/sticky.jpg', title: 'UX Research in Urdu & Regional Languages', type: 'workshop', hue: 160,
      start: '2026-11-12', end: '2026-11-12', dateLabel: '12 Nov 2026',
      city: 'Islamabad', venue: 'Digital Commons, F-7', mode: 'In-person', price: 'PKR 1,000', seats: '60 seats',
      blurb: 'Plan, run and synthesise research with participants who do not think or speak in English.',
      about: 'Most research methods assume English-first users. This workshop covers recruiting, moderating, translating and synthesising research in Urdu, Punjabi, Pashto, Sindhi and Balochi, with templates you can take back to your team.',
      agenda: [['10:00', 'Research in context', 'Why language and literacy change your findings.'], ['12:30', 'Moderation lab', 'Practice interviews in pairs.'], ['14:30', 'Synthesis & reporting', 'Turning multilingual notes into insight.']],
      speakers: [['Facilitator', 'Senior UX Researcher · Public-sector programs']]
    },
    {
      slug: 'peshawar-campus-design-sprint', img: '/img/students.jpg', title: 'Peshawar Campus Design Sprint', type: 'meetup', hue: 28,
      start: '2026-12-05', end: '2026-12-05', dateLabel: '5 Dec 2026',
      city: 'Peshawar', venue: 'University campus, Hayatabad', mode: 'In-person', price: 'Free for students', seats: '120 seats',
      blurb: 'Student teams tackle a real local challenge in a single day and pitch to industry mentors.',
      about: 'Cross-campus teams of four get a real brief, mentors from local companies and eight hours to research, design and pitch a solution. Top teams are fast-tracked to the Karachi Design Summit showcase.',
      agenda: [['09:00', 'Brief & team formation', 'Meet your team and your mentor.'], ['11:00', 'Sprint', 'Research, ideate, prototype.'], ['16:00', 'Pitches & awards', 'Five-minute pitches to a mentor panel.']],
      speakers: [['Mentor panel', 'Industry designers & founders']]
    },
    {
      slug: 'accessibility-urdu-typography-workshop', img: '/img/design-system.jpg', title: 'Accessible Interfaces & Nastaliq Typography', type: 'workshop', hue: 340,
      start: '2026-12-12', end: '2026-12-12', dateLabel: '12 Dec 2026',
      city: 'Karachi', venue: 'Design studio, Clifton', mode: 'Hybrid', price: 'PKR 1,500', seats: '70 seats',
      blurb: 'Make products readable and usable for everyone, from low-vision users to Urdu-first audiences.',
      about: 'A deep dive into inclusive design for Pakistan: contrast and colour, screen-reader basics, low-bandwidth patterns and the real-world challenges of setting Nastaliq and Naskh in digital interfaces.',
      agenda: [['10:00', 'Accessibility essentials', 'WCAG in plain language.'], ['12:00', 'Urdu type in UI', 'Line height, shaping and fonts that work.'], ['14:30', 'Audit clinic', 'Bring a screen, get a live audit.']],
      speakers: [['Facilitator', 'Accessibility Specialist'], ['Guest', 'Type designer · Urdu fonts']]
    },
    {
      slug: 'women-in-design-roundtable', img: '/img/grad-orange.jpg', title: 'Women in Design Pakistan Roundtable', type: 'meetup', hue: 285,
      start: '2026-12-19', end: '2026-12-19', dateLabel: '19 Dec 2026',
      city: 'Lahore', venue: 'Co-working space, DHA', mode: 'Hybrid', price: 'Free', seats: '100 seats',
      blurb: 'Leaders share how they built careers in design and how the community can open more doors.',
      about: 'An open conversation with women leading design teams, studios and research practices, followed by mentorship matching with the IxDF Pakistan mentor network.',
      agenda: [['16:00', 'Fireside conversations', 'Careers, leadership and lessons learned.'], ['17:30', 'Mentor matching', 'Meet mentors in small groups.'], ['18:30', 'Community dinner', 'Informal networking.']],
      speakers: [['Moderator', 'Lahore Chapter Lead'], ['Panelists', 'Design leaders across industries']]
    },
    {
      slug: 'lahore-design-week-2026', img: '/img/minar.jpg', title: 'Lahore Design Week 2026', type: 'summit', hue: 250, past: true,
      start: '2026-03-14', end: '2026-03-16', dateLabel: '14–16 Mar 2026',
      city: 'Lahore', venue: 'Expo Centre Lahore', mode: 'In-person', price: 'Concluded', seats: '1,800 attended',
      blurb: 'Three days of talks, labs and a student showcase. Recordings and highlights are available.',
      about: 'Lahore Design Week drew 1,800 attendees across talks, labs and the student showcase. Highlights and recordings are available to community members.',
      agenda: [], speakers: []
    }
  ],

  programs: [
    { key: 'workshops', name: 'Workshops', color: 'amber', desc: 'Hands-on, build-along days that end with something real in your portfolio or your team’s backlog.', facts: ['Small cohorts of 40–80', 'Taught by working practitioners', 'Templates & certificates'] },
    { key: 'webinars',  name: 'Webinars',  color: 'teal',  desc: 'Live online sessions on careers, AI, research and craft, open to every city and recorded for the community.', facts: ['Free for members', 'Live Q&A with experts', 'Recordings on demand'] },
    { key: 'summits',   name: 'Summits',   color: 'violet',desc: 'Flagship gatherings that bring the whole ecosystem together for talks, labs, showcases and hiring.', facts: ['Multi-day, multi-track', 'Student & startup showcase', 'Partner career fair'] }
  ],

  tracks: [
    ['UX Research', 'teal'], ['AI × Design', 'violet'], ['Design Systems', 'amber'], ['Service & GovTech', 'teal'],
    ['Accessibility', 'amber'], ['Urdu & Regional UX', 'violet'], ['Product Strategy', 'teal'], ['Career & Freelance', 'amber'], ['Design Leadership', 'violet']
  ],

  universities: [
    ['University of Karachi', 'Karachi', 'Research lab partner'], ['NED University', 'Karachi', 'Student chapter'], ['IBA Karachi', 'Karachi', 'Student chapter'],
    ['LUMS', 'Lahore', 'Research partner'], ['UET Lahore', 'Lahore', 'Student chapter'], ['National College of Arts', 'Lahore', 'Design club'], ['University of the Punjab', 'Lahore', 'Student chapter'],
    ['NUST', 'Islamabad', 'Research partner'], ['COMSATS University', 'Islamabad', 'Student chapter'], ['FAST-NUCES', 'Islamabad', 'Design club'],
    ['University of Peshawar', 'Peshawar', 'Student chapter'], ['UET Peshawar', 'Peshawar', 'Design club'],
    ['GC University Faisalabad', 'Faisalabad', 'Student chapter'], ['Bahauddin Zakariya University', 'Multan', 'Student chapter'],
    ['University of Sindh', 'Hyderabad', 'Student chapter'], ['University of Balochistan', 'Quetta', 'Student chapter']
  ],

  campus: [
    ['Campus Ambassadors', 'Student leaders who run design clubs, bring events to campus and shape the chapter agenda.'],
    ['Design Clubs & Labs', 'Seed funding, mentors and a shared toolkit to start or grow a design club at your university.'],
    ['Research Collaborations', 'Joint UX research labs and thesis supervision with partner universities and industry.'],
    ['Internship Pipeline', 'A direct path from campus showcase to internships and junior roles with partner companies.']
  ],

  partners: {
    'Industry collaborators': ['Nexora', 'Kalam Labs', 'Sindhu Digital', 'Pixelwallah', 'BazaarOS', 'Rupaya Labs', 'Chenab Cloud', 'Karakoram AI'],
    'Sponsors': ['Meridian', 'Folio Works', 'Orbit Pay', 'Tandoor Tech', 'Lumen Studio', 'Safar Mobility'],
    'Community partners': ['Open Design PK', 'Women in Tech PK', 'Campus Collective', 'Type Foundry PK', 'Access for All']
  },

  collabs: [
    { title: 'Joint research labs', text: 'Industry and university teams run shared research projects that produce open findings for the whole ecosystem.', stat: '4 labs' },
    { title: 'Talent pipeline', text: 'Partner companies hire from showcases, sprints and portfolio clinics, with a shared view of the skills teams actually need.', stat: '300+ placements' },
    { title: 'Public-interest design', text: 'Design sprints for public services, education and health, with local-language and low-bandwidth users at the centre.', stat: '12 sprints' }
  ],

  tiers: [
    { name: 'Summit Partner', tag: 'Flagship', perks: ['Headline brand placement at national summits', 'Keynote or workshop slot', 'Career fair booth', 'Access to attendee talent pool'] },
    { name: 'Chapter Partner', tag: 'City level', perks: ['Presenting sponsor of a city chapter', 'Co-branded meetups and workshops', 'Local hiring access', 'Quarterly community report'] },
    { name: 'Campus Partner', tag: 'Students', perks: ['Fund design clubs & sprints', 'Mentor and judge opportunities', 'Early access to student talent', 'Brand visibility on campus'] }
  ],

  quotes: [
    { text: 'IxDF Pakistan is where our hiring conversations start. The portfolios from their showcases are consistently ready for real product work.', who: 'Head of Design', org: 'Fintech partner, Karachi', tone: 'violet' },
    { text: 'The research workshops changed how our whole team talks to users. We now plan for Urdu and low-bandwidth from day one.', who: 'Director of Product', org: 'GovTech programme, Islamabad', tone: 'dark' },
    { text: 'I went from a campus design club to a junior product role in under a year, and every step ran through this community.', who: 'Product Designer', org: 'Community member, Lahore', tone: 'teal' }
  ],

  team: [
    { name: 'Ayesha Rahman',  role: 'National Director',            bio: 'Leads strategy and partnerships across all chapters.', hue: 262 },
    { name: 'Hamza Qureshi',  role: 'Head of Chapters',             bio: 'Supports and connects our ten city chapter leads.', hue: 190 },
    { name: 'Sana Malik',     role: 'Head of Programs',             bio: 'Designs workshops, webinars and summit programming.', hue: 28 },
    { name: 'Bilal Ahmed',    role: 'Head of Partnerships',         bio: 'Builds industry and sponsor collaborations.', hue: 305 },
    { name: 'Mariam Siddiqui',role: 'Head of Universities',         bio: 'Runs campus ambassadors and research collaborations.', hue: 160 },
    { name: 'Usman Tariq',    role: 'Head of Content & Research',   bio: 'Publishes the annual State of Design in Pakistan report.', hue: 340 },
    { name: 'Zainab Farooq',  role: 'Head of Brand & Experience',   bio: 'Shapes how the community looks, sounds and feels.', hue: 215 },
    { name: 'Daniyal Khan',   role: 'Community Lead',               bio: 'Keeps the community welcoming, active and growing.', hue: 45 }
  ],

  news: [
    {
      slug: 'university-of-karachi-ux-research-lab', img: '/img/students.jpg', title: 'IxDF Pakistan and University of Karachi announce a joint UX research lab', cat: 'Partnership', date: '2026-10-08', read: '4 min', hue: 262,
      excerpt: 'A new lab will study how people across Pakistan use digital services, publishing open findings every quarter.',
      body: ['IxDF Pakistan and the University of Karachi have announced a joint UX research lab that will study how people across Pakistan use everyday digital services, from banking to government portals.',
        'The lab will host student researchers alongside practitioners from partner companies, with a focus on Urdu and regional-language interfaces, low-bandwidth contexts and accessibility. Findings will be published openly each quarter.',
        'Applications for the first cohort of student researchers open next month through the Karachi chapter.']
    },
    {
      slug: 'early-bird-karachi-design-summit', img: '/img/stage.jpg', title: 'Early-bird registrations open for Karachi Design Summit 2026', cat: 'Summit', date: '2026-10-02', read: '3 min', hue: 28,
      excerpt: 'Three days, 40+ speakers and the largest gathering of designers in the country. Early-bird passes are live.',
      body: ['Registrations are now open for the Karachi Design Summit, taking place 21–23 November 2026 at Expo Centre Karachi, with a hybrid option for those who cannot travel.',
        'This year’s programme includes keynote talks, parallel hands-on labs, a student and startup showcase and a career fair with partner companies.',
        'Early-bird passes are available for a limited time, with discounted rates for students and chapter volunteers.']
    },
    {
      slug: 'state-of-design-pakistan-report', img: '/img/design-system.jpg', title: 'State of Design in Pakistan: what 3,000 designers told us', cat: 'Research', date: '2026-09-21', read: '7 min', hue: 190,
      excerpt: 'Our annual report looks at salaries, tools, remote work and the skills employers want most.',
      body: ['The State of Design in Pakistan report draws on responses from thousands of designers, researchers and hiring managers across ten cities.',
        'Among the headline findings: demand for research and design-systems skills is growing fastest, remote work is now a normal part of a design career and access to mentorship is the biggest gap outside the largest cities.',
        'The full report will be released at the Karachi Design Summit and shared with all members.']
    },
    {
      slug: 'gilgit-chapter-launch', img: '/img/grad-blue.jpg', title: 'Welcome Gilgit: our tenth chapter is live', cat: 'Community', date: '2026-09-10', read: '3 min', hue: 160,
      excerpt: 'The newest chapter will explore tourism, climate resilience and community-first digital tools.',
      body: ['IxDF Pakistan is proud to welcome Gilgit as its tenth city chapter, extending the network to the north of the country.',
        'The chapter will run monthly meetups and an annual design sprint focused on tourism, climate resilience and tools for mountain communities.',
        'Volunteers and campus ambassadors can apply through the Join page.']
    },
    {
      slug: 'designing-for-urdu-first-users', img: '/img/badshahi.jpg', title: 'Designing for Urdu-first users: five lessons from the field', cat: 'Insights', date: '2026-08-28', read: '6 min', hue: 340,
      excerpt: 'Typography, input, search and trust: practical lessons from teams shipping Urdu-first products.',
      body: ['Urdu-first products come with their own challenges and opportunities. Here are five lessons shared by practitioners in our community.',
        'First, typography is a product decision: line height and shaping vary widely between fonts. Second, input matters: many users mix scripts and transliterate. Third, search must handle spelling variation. Fourth, trust cues differ across audiences. Fifth, test with real users in their own language.',
        'We’ll go deeper on all five in the Urdu & Regional Languages workshop in Islamabad this November.']
    },
    {
      slug: 'from-campus-club-to-product-team', img: '/img/sticky.jpg', title: 'From campus design club to product team: Aliya’s story', cat: 'Stories', date: '2026-08-15', read: '5 min', hue: 305,
      excerpt: 'How one student went from a club workshop to a product design role in under a year.',
      body: ['Aliya joined her campus design club on a whim. Twelve months later she is a product designer at a growing startup.',
        'She credits three things: a mentor matched through the community, a portfolio clinic that rewrote her case studies and a design sprint that turned into her first real project.',
        'Her advice to students: show up, ship small things publicly and ask for feedback early.']
    }
  ],

  cities: ['Karachi', 'Lahore', 'Islamabad']
};

/* Approximate outline of Pakistan, [lon, lat] — stylised, for the chapter map */
export const PK_OUTLINE = [
  [61.6,25.2],[61.8,26.2],[63.2,26.6],[63.2,27.2],[62.8,27.3],[62.8,28.2],[61.7,28.8],[61.0,29.8],[62.5,29.4],[63.6,29.5],
  [64.4,29.6],[65.1,29.5],[66.3,29.9],[66.4,30.9],[67.8,31.5],[68.2,31.8],[69.3,31.9],[69.5,33.0],[70.3,33.3],[70.0,34.0],
  [71.0,34.0],[71.1,34.7],[71.5,35.3],[71.5,36.0],[72.8,36.8],[73.8,36.9],[74.6,37.0],[75.4,36.6],[77.8,35.5],[76.8,34.7],
  [75.8,34.5],[74.3,34.8],[74.0,34.3],[74.6,33.4],[74.3,32.8],[75.3,32.3],[74.7,31.9],[74.6,31.0],[73.9,30.5],[73.0,29.9],
  [71.9,29.0],[71.0,28.2],[70.4,28.0],[69.5,27.2],[70.1,26.3],[70.0,25.7],[69.5,24.3],[68.8,23.8],[68.2,23.7],[67.4,24.1],
  [66.7,25.4],[65.0,25.3],[64.0,25.3],[62.4,25.2]
];
