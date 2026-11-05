(function () {
  const P = PROFILE;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (n) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  // Image with graceful initials fallback when the file isn't uploaded yet
  function img(src, label, alt) {
    return `<img src="${esc(src)}" alt="${esc(alt || label)}" data-ph="${esc(label)}" />`;
  }

  // Swap a failed image for an initials placeholder (built via DOM, so no markup can leak)
  function toPlaceholder(t) {
    if (!t || t.tagName !== "IMG" || t.dataset.ph === undefined) return;
    const d = document.createElement("div");
    d.className = "ph";
    d.textContent = t.dataset.ph;
    t.replaceWith(d);
  }
  document.addEventListener("error", (e) => toPlaceholder(e.target), true);

  function age(dob) {
    const d = new Date(dob), t = new Date();
    let a = t.getFullYear() - d.getFullYear();
    const m = t.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < d.getDate())) a--;
    return a;
  }

  const rows = (list) =>
    `<dl class="info">${list
      .filter((r) => r[1])
      .map((r) => `<div class="row"><dt>${esc(r[0])}</dt><dd>${r[2] ? r[1] : esc(r[1])}</dd></div>`)
      .join("")}</dl>`;

  const head = (kicker, title) =>
    `<div class="sec-head"><div class="kicker">${kicker}</div><h2>${title}</h2><div class="bar"></div></div>`;

  const set = (id, html) => { $("#" + id + " .wrap").innerHTML = html; };

  const p = P.personal;
  $("#brandName").textContent = p.name;
  $("#footName").textContent = p.name;
  $("#year").textContent = new Date().getFullYear();

  /* Hero */
  $("#hero").innerHTML = `
    <div class="hero-photo">${img(p.photo, initials(p.name), p.name)}</div>
    <div>
      <div class="eyebrow">Matrimonial Profile</div>
      <h1>${esc(p.name)}</h1>
      <div class="sub">${esc(p.profession)} · ${esc(P.professional.company)}</div>
      <div class="chips">
        <span class="chip">${age(p.dob)} Years</span>
        <span class="chip">${esc(p.currentCity)}</span>
        <span class="chip">${esc(P.astrology.rashi)}</span>
        <span class="chip">${esc(p.education)}</span>
      </div>
      <div class="btns">
        <a class="btn btn-gold" href="#contact">Contact</a>
        <a class="btn btn-ghost" href="#gallery">View Photo Gallery</a>
      </div>
    </div>`;

  /* Personal */
  set("personal", head("About", "Personal Information") + `
    <div class="personal-grid">
      <div class="portrait">${img(p.photo, initials(p.name), p.name)}</div>
      <div class="card">${rows([
        ["Name", p.name],
        ["Age", age(p.dob) + " Years"],
        ["Profession", p.profession],
        ["Education", p.education],
        ["Date of Birth", p.dobDisplay],
        ["Time of Birth", p.birthTime],
        ["Place of Birth", p.birthPlace],
        ["Blood Group", p.bloodGroup],
        ["Permanent Address", p.address],
        ["Location", `<a href="${esc(p.mapUrl)}" target="_blank" rel="noopener">View on Google Maps ↗</a>`, true]
      ])}</div>
    </div>`);

  /* Family */
  set("family", head("Family", "Family Information") + `
    <div class="grid-3">${P.family.map((m) => `
      <div class="card member">
        <div class="avatar">${img(m.photo, initials(m.name), m.name)}</div>
        <span class="role">${esc(m.relation)}</span>
        <h3>${esc(m.name)}</h3>
        ${rows([
          ["Occupation", m.occupation],
          ["Date of Birth", m.dob],
          [m.relation.includes("Sister") ? "Status" : "Native", m.native]
        ])}
      </div>`).join("")}
    </div>`);

  /* Astrology */
  const a = P.astrology;
  set("astrology", head("Horoscope", "Astrology") + `
    <div class="stat-row">
      <div class="stat"><div class="v">${esc(a.rashi)}</div><div class="l">Rashi</div></div>
      <div class="stat"><div class="v">${esc(a.nakshatra)}</div><div class="l">Nakshatra</div></div>
      <div class="stat"><div class="v">${esc(a.god)}</div><div class="l">God</div></div>
      <div class="stat"><div class="v">${esc(a.goddess)}</div><div class="l">Goddess</div></div>
    </div>
    <div class="card">${rows([
      ["Date of Birth", p.dobDisplay],
      ["Time of Birth", p.birthTime],
      ["Place of Birth", p.birthPlace],
      ["Rashi", a.rashi],
      ["Nakshatra", a.nakshatra],
      ["God", a.god],
      ["Goddess", a.goddess]
    ])}</div>`);

  /* Professional */
  const pr = P.professional;
  set("professional", head("Career", "Professional Information") + `
    <div class="stat-row">
      <div class="stat"><div class="v">${esc(pr.company)}</div><div class="l">Company</div></div>
      <div class="stat"><div class="v">${esc(pr.role)}</div><div class="l">Designation</div></div>
      <div class="stat"><div class="v">${esc(pr.experience)}</div><div class="l">Experience</div></div>
      <div class="stat"><div class="v">${esc(pr.ctc)}</div><div class="l">CTC</div></div>
    </div>`);

  /* Education */
  const ed = P.education;
  set("education", head("Academics", "Educational Information") + `
    <div class="card">${rows([
      ["Degree", ed.degree],
      ["College", ed.college],
      ["Year of Passing", ed.yop],
      ["Score", ed.score]
    ])}</div>`);

  /* Contact */
  const c = P.contact;
  const ic = (d) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICON = {
    phone: ic('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    chat: ic('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'),
    mail: ic('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'),
    pin: ic('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),
    linkedin: ic('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
    instagram: ic('<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'),
    github: ic('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'),
    facebook: ic('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>')
  };
  // "9741924068 / 8296740180" -> two separate tappable numbers
  const telHref = (n) => { const d = n.replace(/[^\d+]/g, ""); return "tel:" + (d.startsWith("+") ? d : d.length === 10 ? "+91" + d : d); };
  const phones = (c.phone || "").split(/[\/,;]+/).map((s) => s.trim()).filter(Boolean);
  const waDigits = (c.whatsapp || "").replace(/\D/g, "");
  const waShow = waDigits.length === 12 && waDigits.startsWith("91") ? `+91 ${waDigits.slice(2, 7)} ${waDigits.slice(7)}` : waDigits ? "+" + waDigits : "";
  const contactRows = [
    phones.length && ["Phone", ICON.phone, phones.map((n) => `<a href="${esc(telHref(n))}">${esc(n)}</a>`).join('<span class="sep">/</span>')],
    waDigits && ["WhatsApp", ICON.chat, `<a href="https://wa.me/${waDigits}" target="_blank" rel="noopener">${esc(waShow)}</a>`],
    c.email && ["Email", ICON.mail, `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`],
    p.mapUrl && ["Location", ICON.pin, `<a href="${esc(p.mapUrl)}" target="_blank" rel="noopener">${esc(p.currentCity)} · View on map ↗</a>`]
  ].filter(Boolean);
  const socials = [
    ["LinkedIn", ICON.linkedin, c.linkedin],
    ["Instagram", ICON.instagram, c.instagram],
    ["GitHub", ICON.github, c.github],
    ["Facebook", ICON.facebook, c.facebook]
  ].filter((s) => s[2]);
  const left = `<div class="card contact-card"><h3 class="card-title">Get in touch</h3><ul class="clist">${contactRows.map((r) => `<li><span class="ci">${r[1]}</span><div><div class="cl">${r[0]}</div><div class="cv">${r[2]}</div></div></li>`).join("")}</ul></div>`;
  const right = socials.length ? `<div class="card contact-card"><h3 class="card-title">Connect online</h3><div class="social-grid">${socials.map((s) => `<a class="social" href="${esc(s[2])}" target="_blank" rel="noopener"><span class="ci">${s[1]}</span><span class="st"><b>${s[0]}</b><small>View profile ↗</small></span></a>`).join("")}</div></div>` : "";
  set("contact", head("Connect", "Contact Details") + `<div class="contact-grid${right ? "" : " single"}">${left}${right}</div><p class="note">Families are welcome to reach out via call, WhatsApp or email.</p>`);

  /* Gallery slideshow */
  const g = P.gallery;
  set("gallery", head("Memories", "Photo Gallery") + `
    <div class="slider" id="slider" tabindex="0" aria-label="Photo slideshow">
      ${g.map((s, i) => `<div class="slide${i === 0 ? " on" : ""}">${img(s.src, "Photo " + (i + 1), "Gallery photo " + (i + 1))}${s.caption ? `<div class="cap">${esc(s.caption)}</div>` : ""}</div>`).join("")}
      <button class="arrow prev" aria-label="Previous photo">‹</button>
      <button class="arrow next" aria-label="Next photo">›</button>
    </div>
    <div class="dots">${g.map((_, i) => `<button class="dot${i === 0 ? " on" : ""}" aria-label="Go to photo ${i + 1}"></button>`).join("")}</div>
    <div class="thumbs">${g.map((s, i) => `<button class="thumb${i === 0 ? " on" : ""}" aria-label="Photo ${i + 1}">${img(s.src, i + 1, "Thumbnail " + (i + 1))}</button>`).join("")}</div>`);

  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".dot")];
  const thumbs = [...document.querySelectorAll(".thumb")];
  let cur = 0, timer;
  function show(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("on", k === cur));
    dots.forEach((d, k) => d.classList.toggle("on", k === cur));
    thumbs.forEach((t, k) => t.classList.toggle("on", k === cur));
    // Scroll only the thumbnail strip sideways (never the page)
    const strip = $(".thumbs"), t = thumbs[cur];
    if (strip && t) strip.scrollTo({ left: t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
  }
  const play = () => { clearInterval(timer); timer = setInterval(() => show(cur + 1), 4500); };
  const stop = () => clearInterval(timer);
  if (slides.length) {
    $(".arrow.next").onclick = () => { show(cur + 1); play(); };
    $(".arrow.prev").onclick = () => { show(cur - 1); play(); };
    dots.forEach((d, i) => (d.onclick = () => { show(i); play(); }));
    thumbs.forEach((t, i) => (t.onclick = () => { show(i); play(); }));
    const sl = $("#slider");
    sl.addEventListener("mouseenter", stop);
    sl.addEventListener("mouseleave", play);
    sl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(cur + 1);
      if (e.key === "ArrowLeft") show(cur - 1);
    });
    play();
  }

  // Catch images that had already failed before the listener could see them
  document.querySelectorAll("img[data-ph]").forEach((i) => { if (i.complete && i.naturalWidth === 0) toPlaceholder(i); });

  /* Mobile nav + active link */
  const toggle = $("#navToggle"), links = $("#navLinks");
  toggle.onclick = () => { const o = links.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); };
  links.querySelectorAll("a").forEach((l) => l.addEventListener("click", () => links.classList.remove("open")));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.querySelectorAll("a").forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section").forEach((s) => io.observe(s));
})();
