/* terminal.js — interactive portfolio terminal (vanilla JS, no dependencies)
 *
 *  1. DATA      ← edit your content here
 *  2. DOM helpers + output builders
 *  3. Commands
 *  4. Shell (history, autocomplete, suggestions, events)
 *
 * Everything is rendered with textContent / createElement (never innerHTML),
 * so anything a visitor types is displayed as plain text.
 */
(function () {
  'use strict';

  /* =====================================================================
   * 1. DATA — edit your content here
   * ===================================================================== */
  const DATA = {
    name: 'Madan Belbase',
    role: 'Backend & ML Engineer',
    location: 'Kathmandu, Nepal',
    email: 'madanbelbase927@gmail.com',
    resumeFile: 'MadanBelbase.pdf',

    about: {
      summary:
        'Computer Engineering student at NCIT (Pokhara University, 100% merit scholarship) working across machine learning and backend engineering: computer vision, NLP and the FastAPI services that serve them.',
      tagline: 'Building real-time computer-vision pipelines, deep-learning models and the backends that put them into production.',
      focus: ['Machine Learning', 'Computer Vision', 'NLP', 'Backend (FastAPI / Node.js)'],
      technical: ['Python', 'PyTorch', 'TensorFlow / Keras', 'YOLOv8', 'OpenCV', 'FastAPI', 'Docker'],
      soft: ['Leadership', 'Problem Solving', 'Collaboration'],
    },

    // level = the percentage shown on the bar
    skills: [
      { name: 'Python', note: 'Primary language · ML & backend', level: 90, color: '#60a5fa' },
      { name: 'FastAPI', note: 'Backend / model-serving APIs', level: 82, color: '#4ade80' },
      { name: 'PyTorch', note: 'Deep learning framework', level: 78, color: '#fb923c' },
      { name: 'YOLOv8 / OpenCV', note: 'Object detection & computer vision', level: 78, color: '#22d3ee' },
      { name: 'TensorFlow / Keras', note: 'LSTM & NLP models', level: 75, color: '#facc15' },
      { name: 'JavaScript / TS', note: 'Programming languages', level: 80, color: '#facc15' },
      { name: 'Node.js / Express', note: 'Runtime & web framework', level: 80, color: '#4ade80' },
      { name: 'React', note: 'Frontend library', level: 76, color: '#22d3ee' },
      { name: 'Docker', note: 'Containers & deployment', level: 65, color: '#60a5fa' },
      { name: 'Git / GitHub', note: 'Version control', level: 88, color: '#f87171' },
      { name: 'AWS', note: 'S3, EC2 · Cloud Architecting', level: 55, color: '#fb923c' },
    ],
    alsoFamiliar: [
      'C++', 'MongoDB', 'EasyOCR / PaddleOCR', 'Hugging Face Transformers', 'Multi-Head Attention',
      'BPE Tokenization', 'Object Detection', 'OpenStreetMap (OSM)',
    ],

    projects: [
      {
        id: 'challan',
        name: 'Two-Wheeler Violation Detection & E-Challan',
        desc: 'Minor project (ongoing). Real-time computer-vision pipeline on CCTV/RTSP streams using YOLOv8 for rider/vehicle, helmet-violation and triple-riding detection, with EasyOCR / PaddleOCR for number-plate recognition (ANPR). Includes a violation engine, evidence generation, FastAPI backend and monitoring dashboard; models are GPU-optimized for edge deployment on NVIDIA Jetson.',
        stack: [['YOLOv8', '#22d3ee'], ['PyTorch', '#fb923c'], ['OpenCV', '#4ade80'], ['EasyOCR / PaddleOCR', '#c084fc'], ['FastAPI', '#4ade80']],
        links: [],
        thumb: '',
      },
      {
        id: 'sentiment',
        name: 'Sentiment Analysis using LSTM',
        desc: 'End-to-end NLP pipeline in TensorFlow/Keras classifying IMDB movie reviews (50,000 labeled) as positive or negative. Embeddings learned from scratch (10,000 vocab → 128 dims) feeding a 64-unit LSTM with SpatialDropout1D and recurrent dropout; includes training-curve visualizations and custom text inference.',
        stack: [['TensorFlow', '#facc15'], ['Keras', '#f87171'], ['LSTM', '#c084fc'], ['Python', '#60a5fa']],
        links: [],
        thumb: '',
      },
      {
        id: 'slotswapper',
        name: 'SlotSwapper',
        desc: 'A full-stack web application that allows users to swap, request, and manage time slots seamlessly.',
        stack: [['React', '#61dafb'], ['Node.js', '#8cc84b'], ['MongoDB', '#4ade80']],
        links: [['Live demo', 'https://madanbelbase.github.io/SlotSwapper/']],
        thumb: 'image/thumb-slotswapper.webp',
      },
      {
        id: 'blog',
        name: 'Blog Site',
        desc: 'Personal blog on AI & Machine Learning and backend engineering, built with AstroJS and Tailwind CSS.',
        stack: [['AstroJS', '#c084fc'], ['Tailwind', '#06b6d4'], ['JavaScript', '#f7df1e']],
        links: [['madanbelbase.com.np', 'https://madanbelbase.com.np']],
        thumb: 'image/thumb-blog.webp',
      },
      {
        id: 'portfolio',
        name: 'Portfolio Website',
        desc: 'Modern responsive portfolio with an interactive terminal. You are looking at it right now.',
        stack: [['HTML', '#e34f26'], ['Tailwind', '#06b6d4'], ['JavaScript', '#f7df1e']],
        links: [['Source code', 'https://github.com/MadanBelbase/Portfolio']],
        thumb: 'image/thumb-portfolio.webp',
      },
    ],

    experience: [
      {
        role: 'Frontend Developer (OSGeo Foundation Grant)',
        org: 'OSMSG Nepal (OpenStreetMap Statistics Generator)',
        place: 'Remote',
        period: 'Dec 2025 – Aug 2026',
        points: [
          'Developed and maintained open-source geospatial web applications for the global OSM community.',
          'Collaborated with international developers on OSM contributor data visualization tools.',
        ],
      },
      {
        role: 'Core ML & Deep Learning Contributor',
        org: 'Two-Wheeler Violation Detection & E-Challan System',
        place: 'Minor project',
        period: 'Ongoing',
        points: [
          'Building YOLOv8 detection for riders, helmet violations and triple riding from CCTV/RTSP streams.',
          'Implementing ANPR with EasyOCR / PaddleOCR and a FastAPI backend with monitoring dashboard.',
          'Optimizing models for GPU acceleration ahead of NVIDIA Jetson edge deployment.',
        ],
      },
      {
        role: 'College Ambassador',
        org: 'Hackademia 2.0 & 3.0',
        place: 'Kathmandu, Nepal',
        period: '2024 – Present',
        points: [
          'Promoted educational initiatives and workshops to enhance student engagement in technology.',
          'Organized events and outreach programs to inform students about opportunities in the tech field.',
        ],
      },
      {
        role: 'College Representative',
        org: 'AWS Cloud Club Nepal · CFC Kathmandu · NTC Nepal Tek Community',
        place: '',
        period: '',
        points: ['Represented the college in cloud and tech communities; active member of Nepal Open Source Klub (NOSK) since 2024.'],
      },
    ],

    education: [
      {
        school: 'Nepal College of Information Technology (NCIT), Pokhara University',
        degree: 'B.E. Computer Engineering · 100% merit-based scholarship',
        years: '2023 – Present',
      },
      { school: 'Coursework', degree: 'Machine Learning, AI, NLP, Deep Learning, Data Structures & Algorithms, Statistics', years: '' },
    ],

    achievements: [
      ['100% merit scholarship', 'Awarded by Pokhara University & the Government of Nepal.'],
      ['AWS Academy Graduate – Cloud Architecting', 'Sep 2025. Also AWS Educate – Introduction to Cloud 101 (Jun 2025).'],
      ['OSGeo Foundation grant', 'Frontend developer on OSMSG Nepal (Dec 2025 – Aug 2026).'],
      ['111 Days of Learning Challenge', 'Completed. Also a participant in Leapfrog LSP 2025 and Orbit Engineering Hacks 2024.'],
      ['Hackathon Ambassador', 'Hackademia 2.0 & 3.0, and an active hackathon participant.'],
    ],

    blog: [
      {
        title: 'Webhook Security – Don’t Let Hackers Spoof Your Data',
        excerpt: 'Best practices for securing webhooks and preventing malicious data injection into your systems.',
        tags: ['Security', 'Webhooks'],
        date: 'Mar 2026',
        url: 'https://madanbelbase.com.np/blog/webhook-security--dont-let-hackers-spoof-your-data/',
      },
      {
        title: 'Why Your API Is Overworked',
        excerpt: 'How webhooks solve the polling problem and improve system efficiency.',
        tags: ['API', 'Performance'],
        date: 'Mar 2026',
        url: 'https://madanbelbase.com.np/blog/why-your-api-is-overworked-how-webhooks-solve-the-polling-problem/',
      },
      {
        title: 'Why Your App Crashes',
        excerpt: 'When the API sends unexpected data – and how Zod fixes it.',
        tags: ['Zod', 'TypeScript'],
        date: 'Mar 2026',
        url: 'https://madanbelbase.com.np/blog/why-your-app-crashes-when-the-api-sends-unexpected-data/',
      },
    ],
    blogHome: 'https://madanbelbase.com.np',
    blogUpcoming: 'YOLOv8 project deep-dive · LSTM end-to-end implementation · AI for Nepal',

    socials: [
      ['GitHub', 'https://github.com/MadanBelbase', 'github.com/MadanBelbase'],
      ['LinkedIn', 'https://www.linkedin.com/in/madan-belbase/', 'linkedin.com/in/madan-belbase'],
      ['X / Twitter', 'https://x.com/belbase_madan_', 'x.com/belbase_madan_'],
      ['Facebook', 'https://www.facebook.com/profile.php?id=61554181993528', 'Facebook profile'],
    ],
  };

  /* =====================================================================
   * 2. DOM HELPERS + OUTPUT BUILDERS
   * ===================================================================== */
  const $ = (sel, root) => (root || document).querySelector(sel);

  function el(tag, cls, ...kids) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    kids.flat(Infinity).forEach((k) => {
      if (k === null || k === undefined || k === false) return;
      n.append(k.nodeType ? k : document.createTextNode(String(k)));
    });
    return n;
  }
  const span = (cls, text) => el('span', cls, text);
  const line = (...kids) => el('div', 't-line', ...kids);
  const gap = () => el('div', 't-gap');

  /** "// title" header, same comment style as the rest of the site */
  const head = (title) => el('div', 't-head', span('t-comment', '// '), span('t-title', title));

  /** Clickable command (works with mouse, touch and keyboard) */
  function cmd(name, label) {
    const b = el('button', 't-cmd', label || name);
    b.type = 'button';
    b.dataset.run = name;
    return b;
  }

  /** External link that announces it opens a new tab */
  function link(href, text, opts) {
    const a = el('a', 't-link', text, el('span', 'sr-only', ' (opens in new tab)'));
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    if (opts && opts.download) {
      a.removeAttribute('target');
      a.setAttribute('download', '');
    }
    return a;
  }

  function tag(name, color) {
    const t = el('span', 't-tag', name);
    if (color) t.style.setProperty('--c', color);
    return t;
  }

  function kv(rows) {
    return el(
      'div',
      't-kv',
      rows.map(([k, v]) => el('div', 't-row', span('t-key', k), el('span', 't-val', v)))
    );
  }

  /** "Try: [cmd] [cmd]" footer to keep visitors moving */
  function tryNext(...names) {
    return el('div', 't-next', span('t-dim', 'Try: '), names.map((n, i) => [i ? ' ' : '', cmd(n)]));
  }

  function errorBlock(msg, ...extra) {
    return el('div', 't-out', line(span('t-err', msg)), ...extra);
  }

  /* ---- section outputs ---- */
  function outAbout() {
    const a = DATA.about;
    return el(
      'div',
      't-out',
      head('about.txt'),
      line(span('t-name', DATA.name), span('t-dim', ' — '), span('t-role', DATA.role)),
      line(a.summary),
      line(a.tagline),
      gap(),
      kv([
        ['focus', a.focus.join(' · ')],
        ['technical', a.technical.join(' · ')],
        ['soft skills', a.soft.join(' · ')],
        ['location', DATA.location],
      ]),
      gap(),
      tryNext('skills', 'projects', 'experience', 'contact')
    );
  }

  function outSkills() {
    const rows = DATA.skills.map((s) => {
      const fill = el('i');
      fill.style.width = s.level + '%';
      fill.style.background = s.color;
      const name = span('t-skill-name', s.name);
      name.style.color = s.color;
      return el(
        'div',
        't-skill',
        name,
        el('span', 't-bar', fill),
        span('t-skill-pct', s.level + '%'),
        span('t-skill-note t-dim', s.note)
      );
    });
    return el(
      'div',
      't-out',
      head('skills.json'),
      ...rows,
      gap(),
      kv([
        ['also familiar', DATA.alsoFamiliar.join(' · ')],
        ['soft skills', DATA.about.soft.join(' · ')],
      ]),
      gap(),
      tryNext('projects', 'experience')
    );
  }

  function outProjectsList() {
    const items = DATA.projects.map((p, i) =>
      el(
        'div',
        't-item',
        line(span('t-idx', '[' + (i + 1) + ']'), ' ', span('t-item-title', p.name), ' ', span('t-dim', '→ '), cmd('project ' + p.id)),
        line(span('t-dim', p.desc)),
        el('div', 't-tags', p.stack.map(([n, c]) => tag(n, c))),
        p.links.length ? line(p.links.map(([label, href], j) => [j ? '  ' : '', link(href, label)])) : null
      )
    );
    return el(
      'div',
      't-out',
      head('projects/'),
      ...items,
      line(span('t-dim', 'Open one for details, e.g. '), cmd('project slotswapper'), span('t-dim', ' or '), cmd('project 2')),
      gap(),
      tryNext('blog', 'skills')
    );
  }

  function outProjectDetail(p, n) {
    let img = null;
    if (p.thumb) {
      img = el('img', 't-thumb');
      img.src = p.thumb;
      img.alt = 'Screenshot of ' + p.name;
      img.width = 640;
      img.height = 360;
      img.loading = 'lazy';
      img.decoding = 'async';
    }
    return el(
      'div',
      't-out',
      head('projects/' + p.id),
      line(span('t-idx', '[' + n + ']'), ' ', span('t-item-title', p.name)),
      img,
      line(p.desc),
      gap(),
      kv([
        ['stack', el('span', 't-tags t-tags-inline', p.stack.map(([nm, c]) => tag(nm, c)))],
        ['links', p.links.length ? p.links.map(([label, href], j) => [j ? '  ' : '', link(href, label)]) : span('t-dim', 'none yet')],
      ]),
      gap(),
      el('div', 't-next', cmd('projects', '← all projects'))
    );
  }

  function outExperience() {
    const items = DATA.experience.map((e) =>
      el(
        'div',
        't-item',
        line(span('t-org', e.org), e.place ? span('t-dim', ' · ' + e.place) : null),
        line(span('t-role-sm', e.role), e.period ? span('t-dim', '  ' + e.period) : null),
        el('ul', 't-list', e.points.map((pt) => el('li', null, pt)))
      )
    );
    return el(
      'div',
      't-out',
      head('experience.md'),
      ...items,
      line(span('t-dim', 'Full details in my '), cmd('resume'), span('t-dim', '.')),
      gap(),
      tryNext('education', 'achievements')
    );
  }

  function outEducation() {
    const items = DATA.education.map((e) =>
      el('div', 't-item', line(span('t-org', e.school)), line(span('t-role-sm', e.degree), span('t-dim', '  ' + e.years)))
    );
    return el('div', 't-out', head('education.sql'), ...items, gap(), tryNext('experience', 'skills'));
  }

  function outAchievements() {
    return el(
      'div',
      't-out',
      head('achievements.txt'),
      ...DATA.achievements.map(([t, d]) =>
        el('div', 't-item', line(span('t-ok', '✓ '), span('t-item-title', t)), line(span('t-dim', d)))
      ),
      gap(),
      tryNext('blog', 'projects')
    );
  }

  function outBlog() {
    return el(
      'div',
      't-out',
      head('blog/'),
      ...DATA.blog.map((b) =>
        el(
          'div',
          't-item',
          line(link(b.url, b.title)),
          line(span('t-dim', b.excerpt)),
          line(el('span', 't-tags t-tags-inline', b.tags.map((t) => tag(t, '#22d3ee'))), span('t-dim', '  ' + b.date))
        )
      ),
      line(span('t-dim', 'Upcoming series: ' + DATA.blogUpcoming)),
      line(span('t-dim', 'More at '), link(DATA.blogHome, 'madanbelbase.com.np')),
      gap(),
      tryNext('projects', 'contact')
    );
  }

  function emailRow() {
    const copy = el('button', 't-cmd t-copy', 'copy');
    copy.type = 'button';
    copy.addEventListener('click', () => {
      const done = () => {
        copy.textContent = 'copied ✓';
        setTimeout(() => (copy.textContent = 'copy'), 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(DATA.email).then(done, () => {});
      else done();
    });
    const a = el('a', 't-link', DATA.email);
    a.href = 'mailto:' + DATA.email;
    return [a, ' ', copy];
  }

  function outContact() {
    return el(
      'div',
      't-out',
      head('contact.json'),
      kv([
        ['email', emailRow()],
        ['location', DATA.location],
        ...DATA.socials.map(([n, href, shown]) => [n.toLowerCase().replace(/\s*\/\s*/, '/'), link(href, shown)]),
      ]),
      gap(),
      line(span('t-dim', 'Prefer a form? Run '), cmd('message'), span('t-dim', ' to write to me from here.')),
      gap(),
      tryNext('resume', 'message')
    );
  }

  function outSocials() {
    return el('div', 't-out', head('socials.json'), kv(DATA.socials.map(([n, href, shown]) => [n, link(href, shown)])), gap(), tryNext('contact'));
  }

  function outResume() {
    return el(
      'div',
      't-out',
      head('resume.pdf'),
      line(link(DATA.resumeFile, 'Open resume (PDF)'), span('t-dim', '   or   '), link(DATA.resumeFile, 'download', { download: true })),
      gap(),
      tryNext('experience', 'education', 'contact')
    );
  }

  /* =====================================================================
   * 3. COMMANDS
   * ===================================================================== */
  const FILES = {
    'about.txt': 'about',
    'skills.json': 'skills',
    'projects/': 'projects',
    'experience.md': 'experience',
    'education.sql': 'education',
    'achievements.txt': 'achievements',
    'blog/': 'blog',
    'contact.json': 'contact',
    'resume.pdf': 'resume',
  };

  const COMMANDS = [
    { name: 'about', desc: 'Who I am and what I focus on', run: outAbout },
    { name: 'skills', aliases: ['skill', 'stack'], desc: 'Technical skills and proficiency', run: outSkills },
    { name: 'projects', aliases: ['ls-projects', 'work'], desc: 'Things I have built', run: outProjectsList },
    {
      name: 'project',
      usage: 'project <name>',
      needsArg: true,
      desc: 'Details for one project (name or number)',
      complete: () => DATA.projects.map((p) => p.id),
      run: (args) => {
        const q = args.join(' ').toLowerCase().trim();
        if (!q) return errorBlock('project: missing name. Usage: project <name>', line(span('t-dim', 'Available: '), DATA.projects.map((p, i) => [i ? ' ' : '', cmd('project ' + p.id)])));
        let idx = /^\d+$/.test(q) ? parseInt(q, 10) - 1 : DATA.projects.findIndex((p) => p.id === q || p.name.toLowerCase() === q);
        if (idx < 0 || Number.isNaN(idx)) idx = DATA.projects.findIndex((p) => p.id.startsWith(q) || p.name.toLowerCase().includes(q));
        const p = DATA.projects[idx];
        if (!p) return errorBlock('project: no project matches "' + args.join(' ') + '".', line(span('t-dim', 'Try: '), DATA.projects.map((x, i) => [i ? ' ' : '', cmd('project ' + x.id)])));
        return outProjectDetail(p, idx + 1);
      },
    },
    { name: 'experience', aliases: ['exp'], desc: 'Roles, projects and community work', run: outExperience },
    { name: 'education', aliases: ['edu', 'school'], desc: 'Academic background', run: outEducation },
    { name: 'achievements', aliases: ['awards', 'wins'], desc: 'Highlights so far', run: outAchievements },
    { name: 'blog', aliases: ['articles', 'posts'], desc: 'Technical articles I have written', run: outBlog },
    { name: 'contact', aliases: ['email', 'hire'], desc: 'Email, location and social links', run: outContact },
    { name: 'socials', aliases: ['links', 'github', 'linkedin'], desc: 'Just the social links', run: outSocials },
    { name: 'resume', aliases: ['cv'], desc: 'View or download my resume (PDF)', run: outResume },
    {
      name: 'message',
      aliases: ['mail', 'msg'],
      desc: 'Open the contact form',
      run: () => {
        if (window.PortfolioUI && window.PortfolioUI.openMessage) {
          window.PortfolioUI.openMessage();
          return el('div', 't-out', line(span('t-ok', '✓ '), 'Opening the contact form… (Esc closes it)'));
        }
        return el('div', 't-out', line('The form is unavailable. Email me at ', emailRow()));
      },
    },
    {
      name: 'ls',
      desc: 'List portfolio files',
      shell: true,
      run: () =>
        el(
          'div',
          't-out',
          el('div', 't-files', Object.keys(FILES).map((f) => cmd(FILES[f], f))),
          line(span('t-dim', 'Open any file with '), span('t-key', 'cat <file>'), span('t-dim', ', or just click it.'))
        ),
    },
    {
      name: 'cat',
      usage: 'cat <file>',
      needsArg: true,
      desc: 'Show a file (try: cat about.txt)',
      shell: true,
      complete: () => Object.keys(FILES),
      run: (args) => {
        const f = (args[0] || '').toLowerCase();
        if (!f) return errorBlock('cat: missing file. Usage: cat <file>', line(span('t-dim', 'See '), cmd('ls'), span('t-dim', ' for the file list.')));
        const key = Object.keys(FILES).find((k) => k === f || k === f + '/' || k.replace(/\.\w+$/, '') === f);
        if (!key) return errorBlock('cat: ' + args[0] + ': No such file or directory', line(span('t-dim', 'See '), cmd('ls'), span('t-dim', ' for the file list.')));
        return find(FILES[key]).run([]);
      },
    },
    { name: 'whoami', desc: 'Who are you?', shell: true, run: () => el('div', 't-out', line('visitor', span('t-dim', ' — welcome! New here? Try '), cmd('about'), span('t-dim', '.'))) },
    { name: 'pwd', desc: 'Print working directory', shell: true, hidden: true, run: () => el('div', 't-out', line('/home/visitor/madan-belbase')) },
    { name: 'date', desc: 'Show the current date', shell: true, hidden: true, run: () => el('div', 't-out', line(new Date().toString())) },
    { name: 'echo', desc: 'Print text', shell: true, hidden: true, run: (args) => el('div', 't-out', line(args.join(' '))) },
    {
      name: 'history',
      desc: 'Commands you have run',
      shell: true,
      run: () =>
        history.length
          ? el('div', 't-out', history.map((h, i) => line(span('t-dim', String(i + 1).padStart(3) + '  '), cmd(h))))
          : el('div', 't-out', line(span('t-dim', 'No history yet.'))),
    },
    { name: 'clear', aliases: ['cls'], desc: 'Clear the screen (Ctrl+L)', shell: true, run: () => 'CLEAR' },
    {
      name: 'help',
      aliases: ['?', 'h', 'commands'],
      usage: 'help [command]',
      desc: 'List all commands',
      shell: true,
      complete: () => COMMANDS.filter((c) => !c.hidden).map((c) => c.name),
      run: (args) => (args[0] ? outHelpOne(args[0]) : outHelp()),
    },
    // Easter eggs (hidden from help)
    { name: 'sudo', hidden: true, desc: '', run: () => el('div', 't-out', line(span('t-err', 'visitor is not in the sudoers file. '), span('t-dim', 'This incident will be reported to… nobody. Try '), cmd('help'), span('t-dim', '.'))) },
    { name: 'rm', hidden: true, desc: '', run: () => el('div', 't-out', line(span('t-err', 'rm: permission denied. '), span('t-dim', 'This portfolio is read-only. Nice try!'))) },
    { name: 'exit', aliases: ['quit', 'logout'], hidden: true, desc: '', run: () => el('div', 't-out', line(span('t-dim', 'There is no exit — you are the user. Scroll up, or run '), cmd('contact'), span('t-dim', ' to say hello.'))) },
  ];

  const find = (name) => COMMANDS.find((c) => c.name === name || (c.aliases || []).includes(name));

  function outHelp() {
    const row = (c) =>
      el(
        'div',
        't-row t-help-row',
        c.needsArg ? span('t-key', c.usage) : cmd(c.name),
        span('t-dim', c.desc)
      );
    const portfolio = COMMANDS.filter((c) => !c.hidden && !c.shell);
    const shell = COMMANDS.filter((c) => !c.hidden && c.shell);
    return el(
      'div',
      't-out',
      head('help'),
      line(span('t-dim', 'Click a command, or type it and press Enter.')),
      gap(),
      el('div', 't-sub', 'Portfolio'),
      el('div', 't-kv t-kv-help', portfolio.map(row)),
      gap(),
      el('div', 't-sub', 'Shell'),
      el('div', 't-kv t-kv-help', shell.map(row)),
      gap(),
      line(span('t-dim', 'Tips: '), span('t-key', '↑ ↓'), span('t-dim', ' history · '), span('t-key', 'Tab'), span('t-dim', ' autocomplete · '), span('t-key', 'Ctrl+L'), span('t-dim', ' clear · '), span('t-key', 'Esc'), span('t-dim', ' leave the input')),
      line(span('t-dim', 'Example: '), cmd('project slotswapper'))
    );
  }

  function outHelpOne(name) {
    const c = find(name.toLowerCase());
    if (!c || c.hidden) return errorBlock('help: no help for "' + name + '".', line(span('t-dim', 'Run '), cmd('help'), span('t-dim', ' to list commands.')));
    return el(
      'div',
      't-out',
      kv([
        ['command', c.name],
        ['usage', c.usage || c.name],
        ['about', c.desc],
        ['aliases', c.aliases && c.aliases.length ? c.aliases.join(', ') : '—'],
      ])
    );
  }

  /* =====================================================================
   * 4. SHELL
   * ===================================================================== */
  const termEl = $('#term');
  const screen = $('#termScreen');
  const out = $('#termOut');
  const input = $('#termInput');
  const suggest = $('#termSuggest');
  if (!termEl || !screen || !out || !input) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)');
  const MAX_ENTRIES = 60;
  const MAX_HISTORY = 50;

  /* ---- history (kept for the browser tab session) ---- */
  let history = [];
  try {
    history = JSON.parse(sessionStorage.getItem('portfolio.history') || '[]').filter((x) => typeof x === 'string').slice(-MAX_HISTORY);
  } catch (e) {
    history = [];
  }
  let hIdx = history.length;
  let draft = '';

  function remember(text) {
    if (history[history.length - 1] !== text) history.push(text);
    if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);
    hIdx = history.length;
    draft = '';
    try {
      sessionStorage.setItem('portfolio.history', JSON.stringify(history));
    } catch (e) {
      /* storage unavailable — history simply lasts until reload */
    }
  }

  /* ---- printing ---- */
  function promptNode() {
    return el(
      'span',
      't-prompt',
      span('t-user', 'visitor'),
      span('t-at', '@'),
      span('t-host', 'madan'),
      span('t-colon', ':'),
      span('t-path', '~'),
      span('t-dollar', '$')
    );
  }

  function newEntry(text) {
    const entry = el('div', 't-entry');
    if (text !== null) entry.append(el('div', 't-echo', promptNode(), span('t-typed', ' ' + text)));
    out.append(entry);
    while (out.children.length > MAX_ENTRIES) out.firstChild.remove();
    return entry;
  }

  function reveal(entry) {
    requestAnimationFrame(() => {
      const max = screen.scrollHeight - screen.clientHeight;
      screen.scrollTop = Math.max(0, Math.min(entry.offsetTop - 8, max));
    });
  }

  function scrollToBottom() {
    screen.scrollTop = screen.scrollHeight;
  }

  /* ---- parsing / lookup ---- */
  const tokenize = (s) => (s.match(/"[^"]*"|'[^']*'|\S+/g) || []).map((t) => t.replace(/^["']|["']$/g, ''));

  function levenshtein(a, b) {
    const m = a.length;
    const n = b.length;
    const d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }

  function didYouMean(word) {
    const w = word.toLowerCase();
    let best = null;
    let bestScore = Infinity;
    COMMANDS.filter((c) => !c.hidden).forEach((c) => {
      [c.name].concat(c.aliases || []).forEach((n) => {
        let score = levenshtein(w, n);
        if (n.startsWith(w) || w.startsWith(n)) score = Math.min(score, 1);
        if (score < bestScore) {
          bestScore = score;
          best = c.name;
        }
      });
    });
    return bestScore <= Math.max(2, Math.floor(w.length / 3)) ? best : null;
  }

  function exec(raw) {
    const text = raw.trim();
    const entry = newEntry(text);
    if (!text) {
      reveal(entry);
      return;
    }
    remember(text);

    const parts = tokenize(text);
    const name = (parts[0] || '').toLowerCase();
    const args = parts.slice(1);
    const c = find(name);

    let result;
    if (!c) {
      const guess = didYouMean(name);
      result = errorBlock(
        'madan-sh: command not found: ' + parts[0],
        guess ? line(span('t-dim', 'Did you mean '), cmd(guess), span('t-dim', '?')) : null,
        line(span('t-dim', 'Type '), cmd('help'), span('t-dim', ' to see what is available.'))
      );
    } else {
      try {
        result = c.run(args, text);
      } catch (err) {
        console.error(err);
        result = errorBlock('Something went wrong running "' + name + '". Please try another command.');
      }
    }

    if (result === 'CLEAR') {
      out.textContent = '';
      scrollToBottom();
      return;
    }
    if (result) entry.append(result);
    reveal(entry);
  }

  /* ---- completion + suggestions ---- */
  const primaryNames = () => COMMANDS.filter((c) => !c.hidden).map((c) => c.name);

  /** Returns [{ text, run }] — `run` means it is a complete command that can run on tap */
  function candidates(value) {
    const raw = value.replace(/^\s+/, '');
    if (!raw) return [];
    const parts = raw.split(/\s+/);
    const typingCommand = parts.length === 1 && !/\s$/.test(raw);
    if (typingCommand) {
      const p = parts[0].toLowerCase();
      return primaryNames()
        .filter((n) => n.startsWith(p))
        .map((n) => ({ text: n, run: !find(n).needsArg }));
    }
    const c = find(parts[0].toLowerCase());
    if (!c || !c.complete) return [];
    const last = /\s$/.test(raw) ? '' : parts[parts.length - 1].toLowerCase();
    const base = parts.slice(0, /\s$/.test(raw) ? parts.length : parts.length - 1).join(' ');
    return c
      .complete()
      .filter((a) => a.toLowerCase().startsWith(last))
      .map((a) => ({ text: (base + ' ' + a).trim(), run: true }));
  }

  function commonPrefix(list) {
    return list.reduce((p, s) => {
      let i = 0;
      while (i < p.length && i < s.length && p[i].toLowerCase() === s[i].toLowerCase()) i++;
      return p.slice(0, i);
    });
  }

  function renderSuggest() {
    const list = candidates(input.value).slice(0, 8);
    const exact = list.length === 1 && list[0].text === input.value.trim();
    suggest.textContent = '';
    if (!list.length || exact) {
      suggest.hidden = true;
      return;
    }
    suggest.append(span('t-dim', 'suggestions: '));
    list.forEach((c) => {
      const b = el('button', 't-sugg', c.text);
      b.type = 'button';
      b.dataset.suggest = c.text;
      b.dataset.runnable = c.run ? '1' : '';
      suggest.append(b);
    });
    suggest.hidden = false;
    if (document.activeElement === input) scrollToBottom();
  }

  function clearSuggest() {
    suggest.hidden = true;
    suggest.textContent = '';
  }

  // Keep the keyboard open / focus in the input when tapping a suggestion
  suggest.addEventListener('mousedown', (e) => e.preventDefault());
  suggest.addEventListener('click', (e) => {
    const b = e.target.closest('[data-suggest]');
    if (!b) return;
    if (b.dataset.runnable) {
      input.value = '';
      clearSuggest();
      exec(b.dataset.suggest);
    } else {
      input.value = b.dataset.suggest + ' ';
      renderSuggest();
    }
    input.focus({ preventScroll: true });
  });

  /* ---- keyboard ---- */
  function setValue(v) {
    input.value = v;
    const n = v.length;
    input.setSelectionRange(n, n);
  }

  input.addEventListener('input', renderSuggest);
  input.addEventListener('focus', () => requestAnimationFrame(scrollToBottom));

  input.addEventListener('keydown', (e) => {
    if (e.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const v = input.value;
      input.value = '';
      clearSuggest();
      exec(v);
      return;
    }

    if (e.key === 'ArrowUp') {
      if (!history.length) return;
      e.preventDefault();
      if (hIdx === history.length) draft = input.value;
      hIdx = Math.max(0, hIdx - 1);
      setValue(history[hIdx]);
      renderSuggest();
      return;
    }

    if (e.key === 'ArrowDown') {
      if (hIdx >= history.length) return;
      e.preventDefault();
      hIdx = Math.min(history.length, hIdx + 1);
      setValue(hIdx === history.length ? draft : history[hIdx]);
      renderSuggest();
      return;
    }

    if (e.key === 'Tab' && !e.shiftKey) {
      // Only take over Tab when there is something to complete — otherwise
      // Tab keeps moving focus, so keyboard users are never trapped.
      const list = candidates(input.value);
      if (!input.value.trim() || !list.length) return;
      e.preventDefault();
      if (list.length === 1) {
        setValue(list[0].text + (list[0].run ? '' : ' '));
      } else {
        const p = commonPrefix(list.map((c) => c.text));
        if (p.length > input.value.trim().length) setValue(p);
      }
      renderSuggest();
      return;
    }

    if (e.key === 'Escape') {
      if (!suggest.hidden) clearSuggest();
      else input.blur();
      return;
    }

    if (e.ctrlKey && !e.altKey && !e.metaKey) {
      const k = e.key.toLowerCase();
      if (k === 'l') {
        e.preventDefault();
        out.textContent = '';
        clearSuggest();
        scrollToBottom();
      } else if (k === 'c' && input.selectionStart === input.selectionEnd) {
        e.preventDefault();
        const entry = newEntry(input.value + '^C');
        input.value = '';
        clearSuggest();
        reveal(entry);
      }
    }
  });

  /* ---- clicks: [data-run] anywhere on the page runs a command ---- */
  function scrollToTerminal() {
    const r = termEl.getBoundingClientRect();
    const visible = r.top >= 0 && r.top < window.innerHeight * 0.5;
    if (!visible) termEl.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-run]');
    if (t) {
      e.preventDefault();
      if (!termEl.contains(t)) scrollToTerminal();
      exec(t.dataset.run);
      if (!coarse.matches) input.focus({ preventScroll: true });
      return;
    }

    // Links to #terminal: land on the prompt (desktop only, to avoid popping up a mobile keyboard)
    const a = e.target.closest('a[href="#terminal"]');
    if (a && !coarse.matches) setTimeout(() => input.focus({ preventScroll: true }), reduceMotion.matches ? 0 : 500);
  });

  // Clicking empty terminal space focuses the prompt (unless selecting text or hitting a control)
  screen.addEventListener('click', (e) => {
    if (e.target.closest('a, button, img')) return;
    const sel = window.getSelection();
    if (sel && String(sel).length) return;
    input.focus();
  });

  /* ---- boot ---- */
  const boot = newEntry(null);
  boot.append(
    el(
      'div',
      't-out',
      line(span('t-name', DATA.name + '’s portfolio shell'), span('t-dim', '  v1.0')),
      line(span('t-dim', 'Last login: ' + new Date().toDateString() + ' as '), 'visitor'),
      gap(),
      line('Welcome! Type ', cmd('help'), ' to list commands, or tap any option above. Start with ', cmd('about'), ', ', cmd('projects'), ' or ', cmd('contact'), '.')
    )
  );

  window.PortfolioTerminal = { run: exec };
})();
