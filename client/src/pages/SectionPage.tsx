import { useState } from "react";
import { ArrowLeft, Check, ChevronRight, CircleHelp, MousePointer2, Play, RotateCcw, Sparkles, Zap } from "lucide-react";
import { BUGS } from "./Home";

type Section = "bugs" | "lab" | "about";

const nav = [
  ["/", "Главная"],
  ["/bugs", "Баги"],
  ["/lab", "Лаборатория"],
  ["/about", "О проекте"],
];

function Header({ current }: { current: Section }) {
  return <header className="topbar">
    <a href="/" className="brand-lockup" aria-label="BUG LAB — на главную">
      <div className="brand-mark"><Zap size={16} fill="currentColor" /></div>
      <div><strong>BUG LAB</strong><span>mobile playground</span></div>
    </a>
    <nav className="site-nav" aria-label="Основная навигация">
      {nav.map(([href, label]) => <a key={href} className={`nav-link ${href.slice(1) === current || (href === "/" && current === ("home" as Section)) ? "active" : ""}`} href={href}>{label}</a>)}
    </nav>
    <a className="icon-button back-button" href="/" aria-label="На главную"><ArrowLeft size={19} /></a>
  </header>;
}

export default function SectionPage({ section }: { section: Section }) {
  const [passed, setPassed] = useState<number[]>([]);
  const [toast, setToast] = useState("Выбери любую проверку");
  const [runaway, setRunaway] = useState({ x: 0, y: 0 });

  if (section === "about") return <main className="bug-lab-shell"><div className="grain" /><Header current="about" /><section className="subpage container about-page"><div className="eyebrow"><span className="pulse-dot" /> ABOUT THE CHAOS</div><h1>Тестируй<br /><em>с улыбкой.</em></h1><p className="about-lede">BUG LAB — небольшая песочница для проверки мобильных интерфейсов. Мы специально добавили безобидные странности, чтобы тестирование не выглядело как скучный чек-лист.</p><div className="about-grid"><div className="info-block"><Sparkles size={21} /><h2>Зачем?</h2><p>Чтобы замечать детали: touch-зоны, состояния, загрузки, слои и всё то, что обычно прячется в конце спринта.</p></div><div className="info-block"><CircleHelp size={21} /><h2>Как?</h2><p>Открывай разделы, нажимай карточки и отмечай пойманные сценарии. Здесь ничего не ломается по-настоящему.</p></div></div><a className="primary-button about-cta" href="/bugs"><Play size={16} fill="currentColor" /> Перейти к багам</a></section><Footer /></main>;

  if (section === "lab") return <main className="bug-lab-shell"><div className="grain" /><Header current="lab" /><section className="subpage container lab-page"><div className="eyebrow"><span className="pulse-dot" /> INTERACTION LAB</div><h1>Проверь<br /><em>реакцию.</em></h1><p className="about-lede">Здесь живут самые капризные интеракции. Попробуй пройти мини-тест и не рассмеяться.</p><div className="lab-stage"><span className="mini-label">RUNAWAY BUTTON / TEST 001</span><h2>Нажми, если сможешь</h2><p>На телефоне кнопка не убегает — честная проверка большого пальца.</p><div className="lab-target"><button className="runaway-button" style={{ transform: `translate(${runaway.x}px, ${runaway.y}px)` }} onPointerEnter={(event) => { if (event.pointerType === "mouse") setRunaway({ x: Math.round(Math.random() * 80 - 40), y: Math.round(Math.random() * 38 - 19) }); }} onClick={() => { setRunaway({ x: 0, y: 0 }); setToast("Поймано! Ты быстрее среднего пользователя."); }}><MousePointer2 size={16} /> Поймать</button><span>{toast}</span></div></div><div className="lab-actions"><button className="ghost-button" onClick={() => { setRunaway({ x: 0, y: 0 }); setToast("Сбросили. Она снова тебе доверяет."); }}><RotateCcw size={16} /> Сбросить</button><a className="primary-button" href="/bugs">Все баги <ChevronRight size={16} /></a></div></section><Footer /></main>;

  return <main className="bug-lab-shell"><div className="grain" /><Header current="bugs" /><section className="subpage container bugs-page"><div className="section-heading"><div><div className="eyebrow">THE COLLECTION / 20 TESTS</div><h1>Каталог<br /><em>приколов.</em></h1></div><p>Каждая карточка — отдельная проверка. Открывай квесты по одному.</p></div><div className="bug-grid">{BUGS.map((bug) => { const done = passed.includes(bug.id); return <article key={bug.id} className={`bug-card bug-${bug.color}`}><a className="quest-card-link" href={`/quest/${bug.id}`} aria-label={`Открыть квест ${bug.id}: ${bug.title}`}><div className="bug-card-top"><span className="bug-number">#{String(bug.id).padStart(2, "0")}</span><span className="bug-tag">{bug.tag}</span><span className="bug-icon"><bug.icon /></span></div><h3>{bug.title}</h3><p>{bug.detail}</p><div className="bug-card-bottom"><span className="bug-joke">{done ? "Поймано. Но почему работает?" : bug.joke}</span><span className={`small-action ${done ? "is-done" : ""}`}>{done ? <Check size={17} /> : <ChevronRight size={18} />}</span></div></a></article>; })}</div><div className="catalog-footer"><span>{passed.length} / 20 поймано</span><span>{toast}</span><a href="/lab">Перейти в лабораторию <ChevronRight size={14} /></a></div></section><Footer /></main>;
}

function Footer() { return <footer className="footer container"><span>BUG LAB © 2026</span><span>made for curious thumbs</span><a href="/about">о проекте <ChevronRight size={14} /></a></footer>; }
