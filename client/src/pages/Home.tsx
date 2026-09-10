import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  BatteryLow,
  Check,
  ChevronRight,
  CircleAlert,
  Copy,
  EyeOff,
  Fingerprint,
  Ghost,
  Laugh,
  LockKeyhole,
  Menu,
  MousePointer2,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TimerReset,
  Volume2,
  WifiOff,
  X,
  Zap,
} from "lucide-react";

type Bug = {
  id: number;
  tag: string;
  title: string;
  detail: string;
  joke: string;
  icon: () => ReactNode;
  color: string;
};

function BugIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    pointer: <MousePointer2 size={18} />,
    ghost: <Ghost size={18} />,
    timer: <TimerReset size={18} />,
    slider: <SlidersHorizontal size={18} />,
    fingerprint: <Fingerprint size={18} />,
    copy: <Copy size={18} />,
    wifi: <WifiOff size={18} />,
    eye: <EyeOff size={18} />,
    battery: <BatteryLow size={18} />,
    volume: <Volume2 size={18} />,
    lock: <LockKeyhole size={18} />,
    activity: <Activity size={18} />,
    spark: <Sparkles size={18} />,
    laugh: <Laugh size={18} />,
    search: <Search size={18} />,
  };
  return icons[name] ?? <CircleAlert size={18} />;
}

export const BUGS: Bug[] = [
  { id: 1, tag: "TAP", title: "Кнопка-неуловимка", detail: "Убегает от пальца на 24 px.", joke: "Она просто не готова к ответственности.", icon: () => <BugIcon name="pointer" />, color: "coral" },
  { id: 2, tag: "VISUAL", title: "Призрачный текст", detail: "Заголовок исчезает при взгляде.", joke: "CSS тоже иногда хочет побыть интровертом.", icon: () => <BugIcon name="ghost" />, color: "lilac" },
  { id: 3, tag: "TIMING", title: "Ответ через эпоху", detail: "Кнопка думает ровно 1.5 сек.", joke: "Пожалуйста, не торопите её — она в потоке.", icon: () => <BugIcon name="timer" />, color: "mint" },
  { id: 4, tag: "INPUT", title: "Слайдер наоборот", detail: "Громкость уменьшается к максимуму.", joke: "Тише! Мы почти добрались до 100%.", icon: () => <BugIcon name="slider" />, color: "yellow" },
  { id: 5, tag: "AUTH", title: "Палец не опознан", detail: "Сканер ищет большой палец.", joke: "Мизинец проходит только по VIP-пропуску.", icon: () => <BugIcon name="fingerprint" />, color: "blue" },
  { id: 6, tag: "CLIPBOARD", title: "Копирует не то", detail: "В буфер летит важное «хаха». ", joke: "Срочный релиз мемов уже в пути.", icon: () => <BugIcon name="copy" />, color: "pink" },
  { id: 7, tag: "NETWORK", title: "Wi‑Fi из параллельной вселенной", detail: "Сеть есть, но только по четвергам.", joke: "Пинг ушёл за кофе. Вернётся с печенькой.", icon: () => <BugIcon name="wifi" />, color: "mint" },
  { id: 8, tag: "LAYER", title: "Модалка-под-слоем", detail: "Открывается, но стесняется.", joke: "Попробуй позвать её ещё раз погромче.", icon: () => <BugIcon name="eye" />, color: "coral" },
  { id: 9, tag: "POWER", title: "Батарейка драматизирует", detail: "100% заряда выглядит как 2%.", joke: "Телефон просто хочет внимания.", icon: () => <BugIcon name="battery" />, color: "yellow" },
  { id: 10, tag: "SOUND", title: "Звук на беззвучном", detail: "Иконка кричит, но очень тихо.", joke: "Это уже не баг, а ASMR.", icon: () => <BugIcon name="volume" />, color: "lilac" },
  { id: 11, tag: "ACCESS", title: "Замок с характером", detail: "Разблокируется после комплимента.", joke: "Скажи: «ты красивый интерфейс».", icon: () => <BugIcon name="lock" />, color: "blue" },
  { id: 12, tag: "SCROLL", title: "Скролл в отпуске", detail: "Прокручивает в сторону мечты.", joke: "Там внизу ничего нет, зато горизонт красиво.", icon: () => <BugIcon name="activity" />, color: "pink" },
  { id: 13, tag: "ANIMATION", title: "Вечный лоадер", detail: "Крутится, потому что может.", joke: "Он уже почти загрузил уверенность.", icon: () => <BugIcon name="spark" />, color: "coral" },
  { id: 14, tag: "COPY", title: "Кнопка говорит за всех", detail: "«Отправить» внезапно пишет репорт.", joke: "Коллективная ответственность включена.", icon: () => <BugIcon name="laugh" />, color: "mint" },
  { id: 15, tag: "SEARCH", title: "Поиск по настроению", detail: "Ищет «что-нибудь прикольное».", joke: "Результат: ты уже это нашёл.", icon: () => <BugIcon name="search" />, color: "yellow" },
  { id: 16, tag: "TOUCH", title: "Двойной тап-паникёр", detail: "Один тап видит как два.", joke: "Он просто очень рад тебя видеть.", icon: () => <BugIcon name="pointer" />, color: "lilac" },
  { id: 17, tag: "FORM", title: "Поле-экстрасенс", detail: "Знает, что ты хотел ввести.", joke: "Но всё равно просит ещё раз.", icon: () => <BugIcon name="fingerprint" />, color: "blue" },
  { id: 18, tag: "STATE", title: "Toggle врёт", detail: "Показывает ON, думает OFF.", joke: "Классика: главное — уверенный вид.", icon: () => <BugIcon name="activity" />, color: "pink" },
  { id: 19, tag: "ERROR", title: "Ошибка с самооценкой", detail: "Считает себя фичей.", joke: "И, честно говоря, неплохо получается.", icon: () => <BugIcon name="spark" />, color: "coral" },
  { id: 20, tag: "EASTER EGG", title: "Секретный режим кота", detail: "Нажми 3 раза и не задавай вопросов.", joke: "Мяу-верификация пройдена.", icon: () => <BugIcon name="laugh" />, color: "yellow" },
];

const colorClass: Record<string, string> = {
  coral: "bug-coral",
  lilac: "bug-lilac",
  mint: "bug-mint",
  yellow: "bug-yellow",
  blue: "bug-blue",
  pink: "bug-pink",
};

export default function Home() {
  const [passed, setPassed] = useState<number[]>([]);
  const [toast, setToast] = useState("Система готова. Баги тоже.");
  const [runaway, setRunaway] = useState({ x: 0, y: 0 });
  const [secretTaps, setSecretTaps] = useState(0);
  const [fakeModal, setFakeModal] = useState(false);
  const [shake, setShake] = useState<number | null>(null);
  const [inverted, setInverted] = useState(54);
  const [isFakeOnline, setIsFakeOnline] = useState(true);

  const progress = useMemo(() => Math.round((passed.length / BUGS.length) * 100), [passed.length]);

  const markPassed = (id: number) => {
    setPassed((current) => (current.includes(id) ? current : [...current, id]));
  };

  const runBug = (bug: Bug) => {
    markPassed(bug.id);
    setToast(`${bug.title}: ${bug.joke}`);
    if (bug.id === 1) setRunaway({ x: Math.round(Math.random() * 68 - 34), y: Math.round(Math.random() * 24 - 12) });
    if (bug.id === 2) setShake(2);
    if (bug.id === 3) {
      setToast("Думаем… не выключай экран");
      window.setTimeout(() => setToast("Ответ готов. Мы тоже удивлены."), 1500);
    }
    if (bug.id === 4) setInverted((value) => (value > 10 ? value - 17 : 100));
    if (bug.id === 6) navigator.clipboard?.writeText("хаха, поймано в BUG LAB");
    if (bug.id === 7) setIsFakeOnline((value) => !value);
    if (bug.id === 8) setFakeModal(true);
    if (bug.id === 12) window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    if (bug.id === 13) setToast("Загрузка: 99%… (всегда 99%)");
    if (bug.id === 20) {
      const next = secretTaps + 1;
      setSecretTaps(next);
      if (next >= 3) setToast("МЯУ. Секретный кот активирован.");
    }
  };

  return (
    <main className="bug-lab-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><Zap size={16} fill="currentColor" /></div>
          <div><strong>BUG LAB</strong><span>mobile playground</span></div>
        </div>
        <nav className="site-nav" aria-label="Основная навигация">
          <a className="nav-link active" href="/">Главная</a>
          <a className="nav-link" href="/bugs">Баги</a>
          <a className="nav-link" href="/lab">Лаборатория</a>
          <a className="nav-link" href="/about">О проекте</a>
        </nav>
        <button className="icon-button" aria-label="Открыть меню" onClick={() => setToast("Разделы открываются через навигацию выше.")}><Menu size={21} /></button>
      </header>

      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> QA / FIELD TEST 04</div>
          <h1>Лови баги.<br /><em>Не верь кнопкам.</em></h1>
          <p className="hero-lede">Мобильный полигон для тех, кто знает: самый опасный баг — тот, который выглядит как фича.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => document.getElementById("bug-grid")?.scrollIntoView({ behavior: "smooth" })}><Play size={16} fill="currentColor" /> Начать тест</button>
            <button className="ghost-button" onClick={() => { setPassed([]); setToast("Сбросили прогресс. Баги скучали."); }}><RotateCcw size={16} /> Сбросить</button>
          </div>
        </div>
        <div className="hero-console">
          <div className="console-top"><span><i /><i /><i /></span><small>run://bug-lab</small><span className="live-chip">LIVE</span></div>
          <div className="console-body">
            <div className="console-line"><span className="line-no">01</span><span className="code-muted">const</span> <span className="code-hot">mood</span> = <span className="code-string">"chaotic-good"</span>;</div>
            <div className="console-line"><span className="line-no">02</span><span className="code-muted">await</span> <span className="code-hot">tap</span>(<span className="code-string">"everything"</span>);</div>
            <div className="console-line"><span className="line-no">03</span><span className="code-comment">// no refunds for curiosity</span></div>
            <div className="console-status"><span className="status-ok"><Check size={13} /> SYSTEMS NOMINALLY OK</span><span>{passed.length.toString().padStart(2, "0")} / 20 caught</span></div>
          </div>
        </div>
      </section>

      <section className="stats-strip container" aria-label="Статистика тестирования">
        <div className="stat"><span>20</span><small>штучных багов</small></div>
        <div className="stat"><span>{progress}%</span><small>уровень хаоса</small></div>
        <div className="stat"><span>{isFakeOnline ? "ON" : "OFF"}</span><small>вайб-соединение</small></div>
        <div className="stat-note"><ShieldCheck size={17} /><span>Безопасно для пальцев.<br />Сомнительно для дедлайнов.</span></div>
      </section>

      <section className="runaway-zone container">
        <div className="section-kicker"><span>01 / warm-up</span><span>поймай до того, как убежит</span></div>
        <div className="runaway-card">
          <div><span className="mini-label">INTERACTION TEST</span><h2>Нажми, если сможешь</h2><p>Проверка реакции, терпения и мелкой моторики.</p></div>
          <div className="runaway-stage">
            <button className="runaway-button" style={{ transform: `translate(${runaway.x}px, ${runaway.y}px)` }} onPointerEnter={(event) => { if (event.pointerType === "mouse") setRunaway({ x: Math.round(Math.random() * 56 - 28), y: Math.round(Math.random() * 28 - 14) }); }} onClick={() => { markPassed(1); setRunaway({ x: 0, y: 0 }); setToast("Невероятно. Ты поймал беглянку."); }}><MousePointer2 size={16} /> Поймать</button>
            <span className="runaway-caption">она нервничает ↗</span>
          </div>
        </div>
      </section>

      <section className="bug-section container" id="bug-grid">
        <div className="section-heading"><div><div className="eyebrow">THE COLLECTION</div><h2>20 маленьких<br /><em>катастроф.</em></h2></div><p>Каждая карточка — отдельная проверка. Нажимай всё, что выглядит подозрительно.</p></div>
        <div className="bug-grid">
          {BUGS.map((bug) => {
            const done = passed.includes(bug.id);
            return <article key={bug.id} className={`bug-card ${colorClass[bug.color]} ${shake === bug.id ? "is-shaking" : ""}`} onAnimationEnd={() => setShake(null)}>
              <div className="bug-card-top"><span className="bug-number">#{String(bug.id).padStart(2, "0")}</span><span className="bug-tag">{bug.tag}</span><span className="bug-icon"><bug.icon /></span></div>
              <h3>{bug.title}</h3><p>{bug.detail}</p>
              <div className="bug-card-bottom"><span className="bug-joke">{done ? "Поймано. Но почему работает?" : bug.joke}</span><button className={`small-action ${done ? "is-done" : ""}`} onClick={() => runBug(bug)} aria-label={`Проверить баг: ${bug.title}`}>{done ? <Check size={17} /> : <ChevronRight size={18} />}</button></div>
            </article>;
          })}
        </div>
      </section>

      <section className="progress-card container">
        <div className="progress-top"><div><span className="mini-label">SESSION REPORT</span><h2>{passed.length === 20 ? "Ты сломал всё. Идеально." : "Прогресс подозрительно хороший."}</h2></div><span className="progress-percent">{progress}%</span></div>
        <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        <div className="progress-bottom"><span>{passed.length} поймано из 20</span><span>{toast}</span></div>
      </section>

      <footer className="footer container"><span>BUG LAB © 2026</span><span>made for curious thumbs</span><button onClick={() => setToast("Пасхалка: попробуй трижды нажать на #20.")}>нашёл баг? <ArrowUpRight size={14} /></button></footer>

      {fakeModal && <div className="modal-backdrop" onClick={() => setFakeModal(false)}><div className="fake-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setFakeModal(false)} aria-label="Закрыть"><X size={18} /></button><div className="modal-icon"><EyeOff size={24} /></div><span className="mini-label">LAYER ERROR 008</span><h2>Модалка есть.</h2><p>Но она делает вид, что её нет. Проверь z-index и свои чувства.</p><button className="primary-button full" onClick={() => setFakeModal(false)}>Ладно, я понял</button></div></div>}
    </main>
  );
}
