(() => {
const $ = s => document.querySelector(s), esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl = u => /^(https?:\/\/|mailto:|assets\/)/i.test(u || "") ? u : "";
const cfg = window.CONFIG || {}, configured = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
const sb = configured ? supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
const preview = new URLSearchParams(location.search).has("preview");

async function load() {
  const out = {}; Object.keys(SCHEMA).forEach(k => out[k] = []);
  if (sb) {
    try {
      let useDraft = false;
      if (preview) { const { data: { session } } = await sb.auth.getSession(); useDraft = !!session; $("#previewBar").hidden = !useDraft; }
      const { data, error } = await sb.from("items").select("*").eq("deleted", false).order("sort").order("created_at");
      if (error) throw error;
      (data || []).forEach(r => { const d = useDraft ? r.data : r.live; if (d && !d._hidden && out[r.section]) out[r.section].push(d); });
      if (data && data.length) return out;
    } catch (e) { console.warn("Using starter content:", e.message); }
  }
  return structuredClone(window.DEFAULTS);
}
const link = (u, t) => safeUrl(u) ? `<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>` : "";
const tags = t => t ? `<div class="tags">${t.split(",").map(x => `<span>${esc(x.trim())}</span>`).join("")}</div>` : "";
const R = {
  projects: p => `<article class="card">${safeUrl(p.image) ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">` : ""}<h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>${tags(p.tech)}
    <div class="links">${link(p.github, "GitHub")}${link(p.demo, "Live demo")}</div><p class="status">${esc(p.status || "")}</p></article>`,
  certificates: c => `<article class="card"><h3>${esc(c.name)}</h3><p class="muted">${esc(c.issuer)}${c.date ? " · " + esc(c.date) : ""}</p><div class="links">${link(c.file, "View certificate")}${link(c.link, "Verify")}</div></article>`,
  achievements: a => `<article class="card"><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p></article>`,
  extras: x => `<article class="card"><p class="status">${esc(x.type)}${x.date ? " · " + esc(x.date) : ""}</p><h3>${esc(x.title)}</h3><p class="muted">${esc(x.subtitle)}</p><p>${esc(x.description)}</p>${link(x.link, "Open")}</article>`,
  interests: i => `<span>${esc(i.title)}</span>`,
  education: e => `<div><h3>${esc(e.title)}</h3><p class="muted">${esc(e.institution)} · ${esc(e.period)}</p><p>${esc(e.details)}</p></div>`,
  experience: e => `<div><h3>${esc(e.title)}</h3><p class="muted">${esc(e.org)} · ${esc(e.duration)}</p><p>${esc(e.description)}</p></div>`
};
const target = { education: "educationList", experience: "experienceList" };

function render(d) {
  const p = d.profile[0] || {};
  $("#h-name").textContent = p.name || ""; $("#h-headline").textContent = p.headline || ""; $("#h-tagline").textContent = p.tagline || "";
  $("#h-intro").textContent = p.intro || ""; $("#a-about").textContent = p.about || ""; $("#a-obj").textContent = p.objective || "";
  if (p.photo) $("#photo").src = p.photo;
  $("#photo").onerror = () => { $("#photo").hidden = true; $("#initials").hidden = false; };
  if (safeUrl(p.resume)) $("#resumeBtn").href = p.resume;
  [["#s-li","#c-li",p.linkedin],["#s-gh","#c-gh",p.github]].forEach(([a, b, u]) => { [a, b].forEach(s => { const el = $(s); safeUrl(u) ? el.href = u : el.hidden = true; }); });
  if (p.email) { const e = $("#c-em"); e.href = "mailto:" + p.email; e.hidden = false; }
  window.__email = p.email;
  const groups = {}; d.skills.forEach(s => (groups[s.category] ||= []).push(s.name));
  $("#skillsGrid").innerHTML = Object.entries(groups).map(([c, n]) => `<article class="card"><h3>${esc(c)}</h3><div class="tags">${n.map(x => `<span>${esc(x)}</span>`).join("")}</div></article>`).join("");
  Object.keys(R).forEach(k => { $("#" + (target[k] || k + "Grid")).innerHTML = d[k].map(R[k]).join(""); });
  document.querySelectorAll("section[data-s]").forEach(s => s.hidden = !d[s.dataset.s].length); // empty sections disappear
  document.querySelectorAll("section").forEach(s => s.classList.add("reveal"));
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .05 });
  document.querySelectorAll(".reveal").forEach(s => io.observe(s));
}

// UI
const root = document.documentElement;
root.dataset.theme = localStorage.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
$("#themeBtn").onclick = () => { root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"; localStorage.theme = root.dataset.theme; };
$("#menuBtn").onclick = e => { const o = $("#menu").classList.toggle("open"); e.target.setAttribute("aria-expanded", o); };
$("#menu").onclick = e => e.target.tagName === "A" && $("#menu").classList.remove("open");
$("#toTop").onclick = () => scrollTo({ top: 0 }); addEventListener("scroll", () => $("#toTop").hidden = scrollY < 600);
$("#year").textContent = "© " + new Date().getFullYear();

$("#form").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, v = Object.fromEntries(new FormData(f)); let ok = true;
  const rules = { name: x => x.trim() ? "" : "Enter your name.", email: x => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x) ? "" : "Enter a valid email address.", message: x => x.trim().length >= 10 ? "" : "Write at least 10 characters." };
  for (const k in rules) { const m = rules[k](v[k]); f.elements[k].parentElement.querySelector(".err").textContent = m; if (m) ok = false; }
  if (!ok) return; const msg = $("#formMsg");
  if (!sb) { msg.textContent = window.__email ? "" : "Contact form storage isn't configured yet."; if (window.__email) location.href = `mailto:${window.__email}?subject=${encodeURIComponent("Portfolio message from " + v.name)}&body=${encodeURIComponent(v.message)}`; return; }
  const { error } = await sb.from("messages").insert({ name: v.name.trim(), email: v.email.trim(), message: v.message.trim() });
  msg.textContent = error ? "Could not send your message. Please use the email or LinkedIn buttons." : "Message sent. Thank you."; if (!error) f.reset();
});
load().then(render);
})();
