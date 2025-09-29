const CONFIG = {
      ident: 'dev@ewa:~$',
      nom: 'Ewa Barbara Kadziolka',
      titre: 'Développeuse Full Stack • Testeuse Logiciel',
      email: 'kalistaewa@gmail.com',
      tel: '+33 7 53 43 13 12',
      site: 'https://deotyma.github.io',
      github: 'https://github.com/Deotyma',
      linkedin: 'https://www.linkedin.com/in/ewabarbarakadziolka',
      ville: 'Alfortville (94140), Île-de-France',
      langues: [
        'Polonais (bilingue)',
        'Français (bilingue)',
        'Anglais (B2)',
        'Russe (B2)'
      ],
      competences: [
        'HTML5 • CSS3 • JavaScript (ES202x)',
        'Vue.js • Svelte.js • React.js',
        'D3.js • Three.js • React Three Fiber • GSAP',
        'Accessibilité (a11y) • Écoconception',
        'Tests: Jest • Testing Library • Vitest • PyTest • JUnit • TDD',
        'Python • Java • Node.js • Spring Boot • Django (bases)',
        'Bases de données: PostgreSQL • MongoDB • DynamoDB',
        'AWS • CI/CD (Jenkins, Git)',
        'Chrome Extensions • i18n (Node, chrome.i18n)',
        'Agile • Scrum • Pair programming'
      ],
      projets: [
        {nom:'Teddy Blue — annonces pour parents d’enfants autistes', lien:'#', desc:'Full‑stack: Vue.js, Spring Boot, PostgreSQL, JUnit, Jest, Jenkins.'},
        {nom:'Extension Chrome — chessProblems', lien:'#', desc:'Problèmes d\'échecs à chaque nouvel onglet, validation du coup.'},
        {nom:'Extension LinkedIn — inclusive_search', lien:'#', desc:'Recherche inclusive FR/PL pour l’IT (open source).'},
        {nom:'REX (Three.js)', lien:'#', desc:'dinosaure 3D, textures et animation squelettique.'},
        {nom:'Mars Weather — mobile', lien:'#', desc:'App affichant la météo martienne (React Native).'}
      ],
      experience: [
        {date:'2025 — présent', role:'Développeuse Full Stack (bénévolat)', lieu:'Obywatel Bielik, Pologne (remote)', desc:'Flutter web, design fonctionnel, TDD, no‑code (Xeno), design d’API (Django).'},
        {date:'2023 — 2024', role:'Développeuse Fullstack & DevOps (alternance)', lieu:'Société Générale, Fontenay‑sous‑Bois', desc:'UI Vue.js/Quasar, APIs (Python/Chalice), tests front/back (0 → 48% cov.), AWS, DynamoDB, Jenkins, Git.'},
        {date:'2022', role:'Développeuse Frontend (stage)', lieu:'Iroco, Paris', desc:'Login/signup, landing page, a11y, green tech, tests (Svelte, Jest, Testing Library).'},
        {date:'2024 — présent', role:'Développeuse web (bénévolat)', lieu:"Club d’échecs Le Cavalier de l’Espérance", desc:'Refonte/creation du site du club.'}
      ],
      formation: [
        {date:'2025 — en cours', diplome:'IBM AI Engineering (Coursera)', ecole:'—', desc:'Spécialisation IA (modèles & déploiement).'},
        {date:'2024 — en cours', diplome:'Certification Three.js (Three.js Journey)', ecole:'Ivry‑sur‑Seine', desc:'Visualisation 3D et WebGL.'},
        {date:'2022 — 2024', diplome:'RNCP Concepteur Développeur d’Applications Web (Bac+4)', ecole:'Simplon, Paris', desc:'Java, Spring Boot, JUnit, Vue.js, PostgreSQL, Git.'},
        {date:'2022', diplome:'Certification Python Essentielle', ecole:'Greta Metehor, Paris', desc:'—'},
        {date:'2021 — 2022', diplome:'Certification Développeur Frontend', ecole:'Konexio, Paris', desc:'JavaScript, React.js, Node.js, MongoDB.'},
        {date:'2004 — 2007', diplome:'Licence en Psychologie', ecole:'Université Paris VIII, Saint‑Denis', desc:'—'}
      ]
    };

    // =============================
    // 🖥️ Terminal moteur — version complète stable
    // =============================
    const terminal = document.getElementById('terminal');
    const input = document.getElementById('cmd');
    const inputLine = document.getElementById('input-line');
    const promptEl = document.getElementById('prompt');

    promptEl.textContent = CONFIG.ident;

    const history = [];
    let historyIndex = -1;

    const ALL_COMMANDS = [
      'help','about','whoami','ls','skills','experience','projects','education','languages','contact','links','clear','cat','open','date','theme','sudo','echo','cv','ascii','hire-me'
    ];

    // Utilitaires
    const scrollToBottom = () => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: document.body.scrollHeight });
      });
    };
    const escapeHtml = (str) => String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    function print(html, className='') {
      const line = document.createElement('div');
      line.className = 'line';
      line.innerHTML = '<span class="prompt">'+escapeHtml(CONFIG.ident)+'</span> <div class="'+className+'">'+html+'</div>';
      terminal.appendChild(line);
      scrollToBottom();
    }

    function printRaw(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      terminal.appendChild(div);
      scrollToBottom();
    }

    // Typewriter (intro)
    async function typeLine(text, speed=12) {
      const line = document.createElement('div');
      line.className = 'line';
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = CONFIG.ident;
      const out = document.createElement('div');
      line.appendChild(prompt);
      line.appendChild(out);
      terminal.appendChild(line);
      let i=0; const safe = escapeHtml(text);
      for (; i<=safe.length; i++) {
        out.innerHTML = safe.slice(0, i) + '<span class="blink">█</span>';
        await new Promise(r=>setTimeout(r, speed));
      }
      out.textContent = text;
      scrollToBottom();
    }

    // Commandes
    const COMMANDS = {
      help() {
        const lines = [
          'Commandes disponibles:',
          '',
          'help                — cette aide',
          'about | whoami      — résumé rapide',
          'ls                  — lister les fichiers/sections',
          'cat <fichier>       — afficher un fichier (ex: cat skills.txt)',
          'skills              — compétences',
          'projects            — projets',
          'experience          — expériences',
          'education           — formation',
          'languages           — langues',
          'contact | links     — coordonnées et liens',
          'open <github|linkedin|site> — ouvrir un lien',
          'date                — date/heure locale',
          'theme <green|amber|mono> — changer le thème',
          'clear               — nettoyer l\'écran',
          'ascii               — afficher l\'ASCII art HIRE ME',
          'sudo hire-me        — (easter egg)'
        ];
        return lines.join('\n');
      },
      about() {
        const lines = [
          CONFIG.nom+' — '+CONFIG.titre,
          CONFIG.ville,
          'Passion: accessibilité, WebGL/3D, extensions Chrome, apps responsables.',
          'Objectif: rejoindre une équipe front/fullstack (agile, TDD) avec impact.'
        ];
        return lines.join('\n');
      },
      whoami() { return this.about(); },
      ls() {
        return 'welcome.txt  skills.txt  projects/  experience.txt  education.txt  languages.txt  contact.txt  README.md';
      },
      skills() {
        return CONFIG.competences.map(function(s){return '• '+s;}).join('\n');
      },
      projects() {
        var rows = CONFIG.projets.map(function(p){
          var link = (p.lien && p.lien !== '#') ? ' ('+p.lien+')' : '';
          return '- '+p.nom+link+'\n  '+p.desc;
        }).join('\n');
        return rows || 'Aucun projet listé.';
      },
      experience() {
        return CONFIG.experience.map(function(e){
          return '- '+e.date+' — '+e.role+' @ '+e.lieu+'\n  '+e.desc;
        }).join('\n');
      },
      education() {
        return CONFIG.formation.map(function(f){
          return '- '+f.date+' — '+f.diplome+' — '+f.ecole+'\n  '+f.desc;
        }).join('\n');
      },
      languages() {
        return CONFIG.langues.map(function(l){return '• '+l;}).join('\n');
      },
      contact() {
        const lines = [
          'Email: <a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a>',
          'Site: <a href="' + CONFIG.site + '" target="_blank" rel="noopener">' + CONFIG.site + '</a>',
          'GitHub: <a href="' + CONFIG.github + '" target="_blank" rel="noopener">' + CONFIG.github + '</a>',
          'LinkedIn: <a href="' + CONFIG.linkedin + '" target="_blank" rel="noopener">' + CONFIG.linkedin + '</a>'
        ];
        return lines.join('<br>');
      },
      links() { return this.contact(); },
      cat(args) {
        args = args || [];
        const f = (args[0]||'').toLowerCase();
        if (!f) return 'Utilisation: cat <fichier>\nTapez: welcome.txt, skills.txt, experience.txt, education.txt, contact.txt, README.md';
        if (f.indexOf('welcome')>-1) return this.ascii();
        if (f.indexOf('skills')>-1) return this.skills();
        if (f.indexOf('experience')>-1) return this.experience();
        if (f.indexOf('education')>-1) return this.education();
        if (f.indexOf('languages')>-1) return this.languages();
        if (f.indexOf('contact')>-1) return this.contact();
        if (f.indexOf('readme')>-1) return [
          '# README',
          'Ce CV interactif s\'utilise comme un terminal.',
          "Tapez 'help' pour les commandes.",
          'Personnalisez le bloc CONFIG dans index.html.'
        ].join('\n');
        if (f.indexOf('projects')===0) return this.projects();
        return 'cat: '+f+': fichier introuvable';
      },
      open(args) {
        args = args || [];
        const key = (args[0]||'').toLowerCase();
        const map = { github: CONFIG.github, linkedin: CONFIG.linkedin, site: CONFIG.site };
        if (!key || !map[key]) return 'Utilisation: open <github|linkedin|site>';
        window.open(map[key], '_blank', 'noopener');
        return 'Ouverture de '+key+'…';
      },
      date() {
        const d = new Date();
        return d.toLocaleString();
      },
      theme(args) {
        args = args || [];
        const t = (args[0]||'').toLowerCase();
        const ok = ['green','amber','mono'];
        if (ok.indexOf(t)===-1) return 'Thèmes: '+ok.join(', ')+'\nUtilisation: theme <'+ok.join('|')+'>';
        document.documentElement.setAttribute('data-theme', t);
        return 'Thème appliqué: '+t;
      },
      sudo(args) {
        args = args || [];
        if (args.join(' ') === 'hire-me') return HIRE_ME();
        return 'sudo: permission refusée';
      },
      echo(args) { args=args||[]; return args.join(' '); },
      cv() { return this.about() + '\n\n' + this.skills(); },
      ascii() {
        // Build ASCII lines
        const art = [
          '  _  _      _                                             ',
          ' | || |    (_)      _ _    ___      o O O  _ __     ___   ',
          " | __ |    | |     | '_|  / -_)    o      | '  \\   / -_)  ",
          ' |_||_|   _|_|_   _|_|_   \\___|   TS__[O] |_|_|_|  \\___|  ',
          '_|"""""|_|"""""|_|"""""|_|"""""| {======|_|"""""|_|"""""| ',
          '"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'. /o--000\'"`-0-0-\'"`-0-0-\'' ,
          '',
          'HIRE ME — '+CONFIG.nom
        ];

        // Create a line container with a <pre> to preserve spacing
        const line = document.createElement('div');
        line.className = 'line';
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = CONFIG.ident;
        const pre = document.createElement('pre');
        pre.style.margin = '0';
        pre.style.whiteSpace = 'pre';
        pre.setAttribute('aria-label','Animation ASCII HIRE ME');
        line.appendChild(prompt);
        line.appendChild(pre);

        // Reduced-motion: show static
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
          pre.textContent = art.join('\n');
          return line;
        }

        // Compute starting offset so the train enters from the right
        const container = document.querySelector('.container') || document.body;
        const approxCharWidth = 8; // px (rough mono estimate)
        const containerPx = container.getBoundingClientRect().width - 140; // leave room for prompt
        const cols = Math.max(0, Math.floor(containerPx / approxCharWidth));
        let start = Math.max(10, cols); // start fully off-screen to the right
        let pos = start;

        function draw(offset){
          const pad = ' '.repeat(Math.max(0, offset));
          pre.textContent = art.map(function(l){ return pad + l; }).join('\n');
          window.requestAnimationFrame(()=>window.scrollTo({top: document.body.scrollHeight}));
        }

        draw(pos);
        const fps = 30;
        const step = 2; // characters per frame
        const timer = setInterval(function(){
          pos -= step;
          draw(pos);
          if (pos <= 0) {
            clearInterval(timer);
          }
        }, 1000/fps);

        return line;
      }
    };

    function HIRE_ME() {
      window.open('https://dfrad1ytun997.cloudfront.net/uploads/videos/compiled-68cbcbabeff86.mp4', '_blank', 'noopener');
      const lines = [
        '[sudo] permission accordée.',
        'Exécution: onboarding.sh',
        '→ Cloner repo… OK',
        '→ Installer dépendances… OK',
        '→ Lancer sprint 0… READY 🚀'
      ];
      return lines.join('\n');
    }

    // Auto-complétion par Tab
    function complete(part) {
      if (!part) return '';
      const matches = ALL_COMMANDS.filter(function(c){ return c.indexOf(part)===0; });
      if (matches.length === 1) return matches[0];
      if (matches.length > 1) print(escapeHtml(matches.join('  ')), 'muted');
      return part;
    }

    // Gestion saisie
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const raw = input.value;
        const value = raw.trim();
        if (!value) { print(''); input.value=''; return; }
        history.unshift(value); historyIndex = -1;

        // Afficher la commande saisie
        const echoLine = document.createElement('div');
        echoLine.className = 'line';
        echoLine.innerHTML = '<span class="prompt">'+escapeHtml(CONFIG.ident)+'</span> <div>'+escapeHtml(value)+'</div>';
        terminal.appendChild(echoLine);

        // Parser
        const parts = value.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        const fn = COMMANDS[cmd];
        if (fn) {
          const out = fn.call(COMMANDS, args);
          // Detect commands that return HTML (contact, links)
          if ((cmd === 'contact' || cmd === 'links') && typeof out === 'string') {
            printRaw('<div>' + out + '</div>');
          } else if (typeof out === 'string') {
            printRaw('<div>' + escapeHtml(out).replace(/\n/g, '<br>') + '</div>');
          } else if (out instanceof Node) {
            terminal.appendChild(out);
            scrollToBottom();
          }
        } else {
          print('Commande inconnue: '+escapeHtml(cmd)+'. Tape \u0027help\u0027.', 'danger');
        }
        input.value = '';
        e.preventDefault();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        historyIndex = Math.min(historyIndex + 1, history.length - 1);
        input.value = history[historyIndex] || '';
        setTimeout(function(){ input.setSelectionRange(input.value.length, input.value.length); }, 0);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        historyIndex = Math.max(historyIndex - 1, -1);
        input.value = historyIndex === -1 ? '' : (history[historyIndex] || '');
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const parts = input.value.split(/\s+/);
        if (parts.length === 1) {
          input.value = complete(parts[0]);
        } else {
          const c = parts[0];
          const p = parts[1] || '';
          if (c === 'open') {
            const opts = ['github','linkedin','site'];
            const matches = opts.filter(function(o){ return o.indexOf(p)===0; });
            if (matches.length === 1) parts[1] = matches[0];
            else if (matches.length > 1) print(escapeHtml(matches.join('  ')), 'muted');
            input.value = parts.join(' ');
          }
          if (c === 'theme') {
            const opts = ['green','amber','mono'];
            const matches = opts.filter(function(o){ return o.indexOf(p)===0; });
            if (matches.length === 1) parts[1] = matches[0];
            else if (matches.length > 1) print(escapeHtml(matches.join('  ')), 'muted');
            input.value = parts.join(' ');
          }
        }
      }
    });

    // Focus input au clic & intro
    document.addEventListener('click', function(){ input.focus(); });
    window.addEventListener('load', async function() {
      input.focus();
      await typeLine('Bienvenue, '+CONFIG.nom+'.');
      await typeLine("Tapez 'help' pour commencer.");
      printRaw('<div class="muted">Astuce: tapez <span class="tag">whoami</span>, <span class="tag">projects</span>, <span class="tag">open github</span> ou <span class="tag">sudo hire-me</span>.</div>');

      // =============================
      // ✅ Auto-tests rapides
      // =============================
      try {
        // 1) help -> string non vide
        const t1 = COMMANDS.help();
        console.assert(typeof t1 === 'string' && t1.length > 10, 'help doit retourner une string non vide');
        // 2) ascii -> Node insérable
        const t2 = COMMANDS.ascii();
        console.assert(t2 instanceof Node, 'ascii doit retourner un Node (animation)');
        // 3) replace("\\n",'<br>') fonctionne
        const html = escapeHtml('a\nb');
        const rendered = html.replace(/\n/g,'<br>');
        console.assert(rendered.indexOf('<br>')!==-1, 'remplacement de fin de ligne doit fonctionner');
        console.log('%cSelf-test OK','color:#33ff33');
      } catch (e) {
        console.error('Self-test failed:', e);
      }
    });