import { useState } from "react";
import { AlertTriangle, ArrowLeft, Check, ChevronLeft, ChevronRight, FileText, Flag, Send, ShieldAlert, Sparkles, Zap } from "lucide-react";

const STEPS = [
  { id: 1, label: "Вход", title: "Войди в приложение", instruction: "Открой приложение доставки и войди под тестовым пользователем. Проверь, что экран приветствия, поля и кнопка работают предсказуемо.", checks: ["Поля принимают корректные данные", "Кнопка входа даёт понятный статус", "Ошибка отображается рядом с полем"], bug: "Кнопка входа иногда молчит после нажатия" },
  { id: 2, label: "Каталог", title: "Найди любимый бургер", instruction: "Перейди в каталог, найди бургер и открой карточку товара. Проверь цену, состав, фото и добавление в корзину.", checks: ["Карточка открывается с первого тапа", "Цена совпадает с ценой в каталоге", "Добавление в корзину даёт обратную связь"], bug: "Счётчик корзины показывает на один бургер больше" },
  { id: 3, label: "Корзина", title: "Примени промокод", instruction: "Открой корзину, измени количество товара и попробуй применить промокод QA2026. Сверь сумму до и после скидки.", checks: ["Количество товара меняется без перезагрузки", "Промокод принимает валидное значение", "Итоговая сумма пересчитывается корректно"], bug: "После удаления товара скидка остаётся в итоговой сумме" },
  { id: 4, label: "Доставка", title: "Выбери способ доставки", instruction: "Выбери адрес, время доставки и способ оплаты. Попробуй переключиться между вариантами и проверь сохранение выбора.", checks: ["Выбранный адрес виден полностью", "Радиокнопка меняет состояние", "Стоимость доставки обновляется"], bug: "Радиокнопка меняет подпись, но не меняет способ оплаты" },
  { id: 5, label: "Заказ", title: "Подтверди заказ", instruction: "Проверь финальный экран заказа перед отправкой. Сверь товары, адрес, сумму и доступность кнопки подтверждения.", checks: ["Все данные заказа совпадают", "Кнопка доступна только при заполненных данных", "После нажатия появляется номер заказа"], bug: "Кнопка подтверждения выглядит отключённой, хотя нажимается" },
];

type Report = { title: string; severity: string; expected: string; actual: string; step: number };

export default function ScenarioPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [reports, setReports] = useState<Report[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState("Следуй шагам и записывай подозрительное");
  const step = STEPS[stepIndex];
  const [form, setForm] = useState({ title: "", severity: "Medium", expected: "", actual: "" });

  const completeStep = () => {
    setCompleted((current) => current.includes(step.id) ? current : [...current, step.id]);
    setToast(`Шаг ${step.id} отмечен. Ищи следующий сигнал.`);
  };

  const submitReport = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.actual.trim()) {
      setToast("Заполни хотя бы название и фактический результат");
      return;
    }
    setReports((current) => [...current, { ...form, step: step.id }]);
    setForm({ title: "", severity: "Medium", expected: "", actual: "" });
    setShowReport(false);
    setToast("Баг-репорт сохранён в этой сессии");
  };

  return <main className="bug-lab-shell scenario-shell"><div className="grain" /><header className="topbar"><a href="/" className="brand-lockup"><div className="brand-mark"><Zap size={16} fill="currentColor" /></div><div><strong>BUG LAB</strong><span>scenario runner</span></div></a><a className="icon-button" href="/bugs" aria-label="К списку багов"><ArrowLeft size={19} /></a></header>
    <section className="scenario-page container">
      <div className="scenario-intro"><div className="eyebrow"><span className="pulse-dot" /> SCENARIO / FOOD DELIVERY QA</div><h1>Один заказ.<br /><em>Пять точек риска.</em></h1><p>Пройди пользовательский сценарий от входа до подтверждения заказа. Если заметил несоответствие — зафиксируй его в баг‑репорте.</p></div>
      <div className="scenario-progress"><div className="scenario-progress-top"><span>ПРОГРЕСС СЦЕНАРИЯ</span><strong>{completed.length} / {STEPS.length} шагов</strong></div><div className="progress-track"><span style={{ width: `${(completed.length / STEPS.length) * 100}%` }} /></div></div>
      <div className="scenario-layout"><aside className="step-list"><div className="step-list-title">USER FLOW</div>{STEPS.map((item, index) => <button key={item.id} className={`step-item ${index === stepIndex ? "active" : ""} ${completed.includes(item.id) ? "done" : ""}`} onClick={() => setStepIndex(index)}><span className="step-index">{completed.includes(item.id) ? <Check size={13} /> : `0${item.id}`}</span><span><small>{item.label}</small><strong>{item.title}</strong></span><ChevronRight size={15} /></button>)}</aside>
        <div className="scenario-main"><div className="scenario-step-head"><span className="mini-label">STEP 0{step.id} / {step.label.toUpperCase()}</span><span className="step-status">{completed.includes(step.id) ? <><Check size={13} /> ПРОЙДЕН</> : "В РАБОТЕ"}</span></div><h2>{step.title}</h2><p className="step-instruction">{step.instruction}</p><div className="checklist"><div className="mini-label">ЧТО ПРОВЕРИТЬ</div>{step.checks.map((check) => <div className="check-row" key={check}><span><Check size={14} /></span>{check}</div>)}</div><div className="scenario-simulator"><div className="simulator-bar"><span><i /><i /><i /></span><small>test-app / checkout</small><span className="simulator-badge">LIVE</span></div><div className="simulator-body"><div className="simulator-avatar">{step.id === 1 ? "QA" : step.id === 2 ? "🍔" : step.id === 3 ? "%" : step.id === 4 ? "⌖" : "✓"}</div><strong>{step.id === 1 ? "Добро пожаловать" : step.id === 2 ? "Что будем заказывать?" : step.id === 3 ? "Твоя корзина" : step.id === 4 ? "Куда доставить?" : "Проверь заказ"}</strong><span className="simulator-hint">{step.bug}</span><button onClick={completeStep}><Sparkles size={16} /> Проверить состояние</button></div></div><div className="scenario-actions"><button className="ghost-button" onClick={() => setShowReport(true)}><Flag size={16} /> Нашёл баг</button><button className="primary-button" onClick={() => { completeStep(); if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1); }}>{stepIndex === STEPS.length - 1 ? "Завершить сценарий" : "Следующий шаг"}<ChevronRight size={16} /></button></div><div className="scenario-toast"><ShieldAlert size={15} /> {toast}</div></div></div>
      <section className="reports-panel"><div className="reports-panel-head"><div><div className="mini-label">SESSION REPORTS</div><h2>Баг‑репорты</h2></div><span className="report-count"><FileText size={15} /> {reports.length}</span></div>{reports.length === 0 ? <p className="reports-empty">Здесь появятся твои отчёты. Сначала пройди шаг и нажми «Нашёл баг».</p> : <div className="report-list">{reports.map((report, index) => <div className="report-row" key={`${report.title}-${index}`}><span className={`severity severity-${report.severity.toLowerCase()}`}>{report.severity}</span><div><strong>{report.title}</strong><small>Шаг {report.step} · {report.actual}</small></div><Check size={16} /></div>)}</div>}</section>
    </section>
    <footer className="footer container"><span>BUG LAB © 2026</span><a href="/bugs">каталог багов <ChevronRight size={14} /></a></footer>
    {showReport && <div className="modal-backdrop" onClick={() => setShowReport(false)}><form className="report-modal" onSubmit={submitReport} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setShowReport(false)}>×</button><div className="modal-icon"><AlertTriangle size={23} /></div><span className="mini-label">NEW BUG REPORT / STEP 0{step.id}</span><h2>Зафиксировать баг</h2><p>Опиши проблему так, чтобы другой тестировщик смог повторить её.</p><label>Название бага<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Например: кнопка не меняет состояние" /></label><label>Серьёзность<select value={form.severity} onChange={(event) => setForm({ ...form, severity: event.target.value })}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label><label>Ожидаемый результат<textarea value={form.expected} onChange={(event) => setForm({ ...form, expected: event.target.value })} placeholder="Что должно было произойти?" /></label><label>Фактический результат<textarea value={form.actual} onChange={(event) => setForm({ ...form, actual: event.target.value })} placeholder="Что произошло на самом деле?" /></label><button className="primary-button full" type="submit"><Send size={15} /> Сохранить отчёт</button></form></div>}
  </main>;
}
