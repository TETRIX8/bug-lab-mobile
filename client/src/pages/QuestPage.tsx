import { useState } from "react";
import { ArrowLeft, Check, ChevronRight, RotateCcw, Sparkles, Zap } from "lucide-react";
import { useParams } from "wouter";
import { BUGS } from "./Home";

function QuestHeader() {
  return <header className="topbar"><a href="/" className="brand-lockup" aria-label="BUG LAB — на главную"><div className="brand-mark"><Zap size={16} fill="currentColor" /></div><div><strong>BUG LAB</strong><span>mobile playground</span></div></a><a className="icon-button back-button" href="/bugs" aria-label="Вернуться к квестам"><ArrowLeft size={19} /></a></header>;
}

export default function QuestPage() {
  const { id } = useParams();
  const quest = BUGS.find((item) => item.id === Number(id));
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("Квест ждёт твоего большого пальца");
  const [fakeValue, setFakeValue] = useState(50);

  if (!quest) return <main className="bug-lab-shell"><QuestHeader /><section className="subpage container quest-page"><div className="eyebrow">404 / QUEST NOT FOUND</div><h1>Этот квест<br /><em>убежал.</em></h1><a className="primary-button" href="/bugs">К списку квестов</a></section></main>;

  const complete = () => { setDone(true); setMessage(`Квест #${quest.id} пройден. Баг официально пойман.`); };

  return <main className={`bug-lab-shell quest-theme-${quest.color}`}><div className="grain" /><QuestHeader /><section className="subpage container quest-page"><div className="quest-breadcrumb"><a href="/bugs"><ArrowLeft size={14} /> Все квесты</a><span>QUEST #{String(quest.id).padStart(2, "0")}</span></div><div className="quest-layout"><div><div className="eyebrow"><span className="pulse-dot" /> {quest.tag} / MOBILE TEST</div><h1>{quest.title}<br /><em>поймай это.</em></h1><p className="about-lede">{quest.detail} Это отдельный тест: пройди его и проверь, как интерфейс реагирует на твой палец.</p></div><div className="quest-meta"><span className="quest-icon"><quest.icon /></span><span>LEVEL {quest.id % 4 + 1}</span><span>TOUCH READY</span></div></div><div className="quest-challenge"><div className="challenge-top"><span className="mini-label">INTERACTION ZONE / #{String(quest.id).padStart(2, "0")}</span><span className={done ? "challenge-state passed" : "challenge-state"}>{done ? <><Check size={13} /> PASSED</> : "WAITING"}</span></div><h2>{done ? "Идеально поймано." : "Попробуй сломать сценарий."}</h2><p>{done ? "Теперь можно возвращаться к списку и выбрать следующий квест." : quest.joke}</p><div className={`challenge-demo ${done ? "completed" : ""}`}>
      {quest.id === 4 ? <><input aria-label="Шуточный слайдер" type="range" min="0" max="100" value={fakeValue} onChange={(event) => setFakeValue(Number(event.target.value))} /><span className="demo-value">Громкость: {100 - fakeValue}%</span></> : <button className="challenge-button" onClick={complete}>{done ? <Check size={18} /> : <Sparkles size={18} />} {done ? "Поймано" : "Запустить баг"}</button>}
    </div><div className="challenge-message">{message}</div></div><div className="quest-actions"><button className="ghost-button" onClick={() => { setDone(false); setMessage("Квест ждёт твоего большого пальца"); setFakeValue(50); }}><RotateCcw size={16} /> Сбросить</button><a className="primary-button" href={`/quest/${quest.id === 20 ? 1 : quest.id + 1}`}>Следующий квест <ChevronRight size={16} /></a></div></section><footer className="footer container"><span>BUG LAB © 2026</span><a href="/bugs">все квесты <ChevronRight size={14} /></a></footer></main>;
}
