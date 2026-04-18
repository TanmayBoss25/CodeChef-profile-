 const certificates = [
            // ── EXAMPLE (replace or add your own below) ──────────────
            {
                icon: "🤖",
                title: "AI Tools Certificate",
                issuer: "Be10x",
                date: "2025",
                category: "AI tools",
                link: "AI TOOLS CERTIFICATE.pdf"
            },
            {
                icon: "📕",
                title: "SST NSet Logical Resoning Certificate",
                issuer: "Scalar School of Technology",
                date: "2026",
                category: "Subject-Lr",
                link: "SSTNSETLogicalResoningCertificate.png"
            },
            {
                icon: "🪼",
                title: "Meet Your Seniors Scalar MasterClass Certificate",
                issuer: "Scalar School of Technology",
                date: "2026",
                category: "None",
                link: "ScalarmasterclassMeetYourSeniors.png"
            },
            {
                icon: "📏",
                title: "SST Nset Mathematics Certificate",
                issuer: "Scalar School of Technology",
                date: "2026",
                category: "Subject-Math",
                link: "SSTNSETMathcertificate.png"
            },
           
         
        ];
        /* ════════════════════════════════════════════════
           END OF EDITABLE SECTION — don't touch below
        ═══════════════════════════════════════════════ */

        function buildCerts(filter) {
            const grid = document.getElementById('certs-grid');
            const empty = document.getElementById('certs-empty');
            const cards = grid.querySelectorAll('.cert-card');
            cards.forEach(c => c.remove());

            const filtered = filter === 'All'
                ? certificates
                : certificates.filter(c => c.category === filter);

            empty.style.display = filtered.length === 0 ? 'block' : 'none';

            filtered.forEach(cert => {
                const card = document.createElement('div');
                card.className = 'cert-card reveal';
                card.innerHTML = `
        <span class="cert-badge">${cert.category}</span>
        <div class="cert-icon">${cert.icon}</div>
        <div class="cert-title">${cert.title}</div>
        <div class="cert-issuer">🏛 ${cert.issuer}</div>
        <div class="cert-date">📅 ${cert.date}</div>
        ${cert.link
                        ? `<a class="cert-link" href="${cert.link}" target="_blank" rel="noopener">
               View Certificate ↗
             </a>`
                        : `<span class="cert-link" style="opacity:0.45;cursor:default;">Link coming soon</span>`
                    }`;
                grid.appendChild(card);
                // re-observe for reveal animation
                observer.observe(card);
            });
        }

        function buildFilters() {
            const container = document.getElementById('cert-filters');
            const categories = ['All', ...new Set(certificates.map(c => c.category))];
            let active = 'All';
            categories.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = 'cert-filter-btn' + (cat === 'All' ? ' active' : '');
                btn.textContent = cat;
                btn.onclick = () => {
                    container.querySelectorAll('.cert-filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    active = cat;
                    buildCerts(active);
                };
                container.appendChild(btn);
            });
            buildCerts('All');
        }
        /* ── THEME TOGGLE ─────────────────────── */
        let dark = true;
        function toggleTheme() {
            dark = !dark;
            document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
            document.getElementById('themeIcon').textContent = dark ? '☀️' : '🌙';
            document.getElementById('themeLabel').textContent = dark ? 'Light' : 'Dark';
        }
        // Set initial theme to dark
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeIcon').textContent = '☀️';
        document.getElementById('themeLabel').textContent = 'Light';

        /* ── TYPING ANIMATION ─────────────────── */
        const lines = [
            "Fresher Frontend Developer.",
            "JEE Aspirant & Problem Solver.",
            " Coder 🎧",
            "AI Tool Enthusiast.",
            "Passionate about Tech & CS.",
        ];
        let li = 0, ci = 0, deleting = false;
        const el = document.getElementById('typed-text');
        function type() {
            const cur = lines[li];
            if (!deleting) {
                el.textContent = cur.slice(0, ++ci);
                if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
            } else {
                el.textContent = cur.slice(0, --ci);
                if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
            }
            setTimeout(type, deleting ? 45 : 70);
        }
        type();

        /* ── SKILLS DATA ──────────────────────── */
        const skills = [
            { name: "C / C++", pct: 30, note: "DSA & Problem Solving" },
            { name: "HTML & CSS", pct: 95, note: "Layouts, Animations, Responsive" },
            { name: "JavaScript", pct: 30, note: "DOM, APIs, Logic" },
            { name: "GitHub", pct: 80, note: "Version Control, Pages" },
            { name: "AI Tools", pct: 90, note: "Prompt Engineering, Productivity" },
        ];
        const grid = document.getElementById('skills-grid');
        skills.forEach(s => {
            const div = document.createElement('div');
            div.className = 'skill-item reveal';
            div.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div style="font-size:0.78rem;color:var(--muted);margin-bottom:0.45rem;font-family:'DM Mono',monospace;">${s.note}</div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" data-pct="${s.pct}"></div>
      </div>`;
            grid.appendChild(div);
        });

        /* ── SCROLL REVEAL + BAR ANIMATE ─────── */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    // animate skill bars
                    const bar = e.target.querySelector('.skill-bar-fill');
                    if (bar) {
                        setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, 100);
                    }
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        buildFilters();

        /* ── GITHUB API ───────────────────────── */
        fetch('https://api.github.com/users/tanmayboss25')
            .then(r => r.json())
            .then(d => {
                document.getElementById('stat-followers').textContent = d.followers ?? '—';
                document.getElementById('stat-repos').textContent = d.public_repos ?? '—';
            })
            .catch(() => { });

        /* ── CONTACT FORM ─────────────────────── */
        async function handleSubmit(e) {
            e.preventDefault();
            const status = document.getElementById('form-status');
            const btn = e.target.querySelector('button[type="submit"]');
            btn.textContent = 'Sending…'; btn.disabled = true;

            const formData = new FormData(e.target);

            const res = await fetch('https://formspree.io/f/xgopalrg', {  // ← paste YOUR endpoint here
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                status.textContent = '✓ Message sent! I\'ll get back to you soon.';
                status.className = 'form-status success';
                e.target.reset();
            } else {
                status.textContent = '✗ Something went wrong. Try again.';
                status.className = 'form-status';
            }
            btn.textContent = 'Send Message ↗'; btn.disabled = false;
        }
   
