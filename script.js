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
  const btn = (href, label) => href ? `<a class="btn btn-outline" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>` : "";
  const contactBtns = [
    btn(c.phone && "tel:" + c.phone.replace(/\s/g, ""), "📞 " + esc(c.phone)),
    btn(c.whatsapp && "https://wa.me/" + c.whatsapp, "💬 WhatsApp"),
    btn(c.email && "mailto:" + c.email, "✉️ " + esc(c.email)),
    btn(c.linkedin, "LinkedIn"),
    btn(c.instagram, "Instagram"),
    btn(c.github, "GitHub"),
    btn(c.facebook, "Facebook"),
    btn(p.mapUrl, "📍 Location")
  ].join("");
  set("contact", head("Connect", "Contact Details") + `
    <div class="card">
      <div class="contact-list">${contactBtns}</div>
      <p class="note">Families are welcome to reach out via call, WhatsApp or email.</p>
    </div>`);

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
    thumbs[cur] && thumbs[cur].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
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
