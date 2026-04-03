import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/8ae099d5-14f7-4bfd-8ed4-584f259765c5/files/2657c332-295d-4fe0-b8b0-4111c462fffa.jpg";
const GALLERY_IMG1 = "https://cdn.poehali.dev/projects/8ae099d5-14f7-4bfd-8ed4-584f259765c5/files/d472bfb6-c84d-4dfa-b6f0-15a4e625c258.jpg";
const GALLERY_IMG2 = "https://cdn.poehali.dev/projects/8ae099d5-14f7-4bfd-8ed4-584f259765c5/files/af80bc78-388a-42b2-abe9-7e9e23925a73.jpg";

const NAV_LINKS = [
  { href: "#about", label: "О нас" },
  { href: "#products", label: "Меню" },
  { href: "#gallery", label: "Галерея" },
  { href: "#order", label: "Заказать" },
];

const PRODUCTS = [
  { emoji: "🥐", name: "Круассан с маслом", desc: "Слоёное тесто, 72 слоя, французский рецепт", price: "89 ₽", badge: null },
  { emoji: "🍞", name: "Хлеб на закваске", desc: "48 часов ферментации, хрустящая корочка", price: "290 ₽", badge: "Хит" },
  { emoji: "🎂", name: "Медовик классический", desc: "9 коржей, домашние сливки, грецкий орех", price: "650 ₽", badge: null },
  { emoji: "🥐", name: "Эклер с ванилью", desc: "Заварное тесто, крем патисьер, глазурь", price: "120 ₽", badge: "Новинка" },
  { emoji: "🫓", name: "Чиабатта с травами", desc: "Розмарин, тимьян, оливковое масло", price: "210 ₽", badge: null },
  { emoji: "🍩", name: "Синнамон-ролл", desc: "Корица, коричневый сахар, глазурь из крем-чиза", price: "145 ₽", badge: "Топ" },
];

const DISCOUNTS = [
  { icon: "Percent", title: "Счастливые часы", desc: "Скидка 20% на всю выпечку с 17:00 до 19:00", label: "Каждый день" },
  { icon: "Gift", title: "3 по цене 2", desc: "При покупке трёх круассанов — один в подарок", label: "До 30 апреля" },
  { icon: "Star", title: "Утренний комплект", desc: "Кофе + любой круассан = 199 ₽ до 10:00", label: "Каждое утро" },
];

const GALLERY = [
  { img: HERO_IMG, caption: "Хлеб на закваске" },
  { img: GALLERY_IMG1, caption: "Ассорти выпечки" },
  { img: GALLERY_IMG2, caption: "Уютная пекарня" },
  { img: GALLERY_IMG1, caption: "Утренняя выпечка" },
  { img: HERO_IMG, caption: "Из печи — к вам" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Section({ children, id, className = "", style }: { children: React.ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      id={id}
      ref={ref}
      style={style}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", comment: "", product: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-golos" style={{ backgroundColor: "var(--cream)" }}>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 shadow-lg" : "py-5"}`}
        style={{
          backgroundColor: scrolled ? "rgba(251,246,236,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span className="text-2xl">🍞</span>
            <div>
              <div className="font-cormorant text-2xl" style={{ color: scrolled ? "var(--brown)" : "white", fontFamily: "'Cormorant', serif", fontWeight: 700, lineHeight: 1 }}>
                Тепло
              </div>
              <div className="uppercase tracking-widest" style={{ color: scrolled ? "var(--warm-gray)" : "rgba(255,255,255,0.7)", fontSize: "9px", letterSpacing: "0.2em" }}>
                Булочная
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: scrolled ? "var(--brown-light)" : "rgba(255,255,255,0.85)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md"
              style={{ backgroundColor: "var(--gold)", color: "var(--brown)" }}
            >
              Заказать
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: scrolled ? "var(--brown)" : "white" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4 border-t" style={{ borderColor: "var(--beige)", backgroundColor: "var(--cream)" }}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-base font-medium" style={{ color: "var(--brown)" }} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(92,61,30,0.85) 0%, rgba(92,61,30,0.55) 50%, rgba(92,61,30,0.15) 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-widest mb-4 animate-fade-in" style={{ color: "var(--gold-light)", letterSpacing: "0.25em" }}>
              Свежая выпечка каждый день
            </p>
            <h1 className="text-6xl md:text-8xl font-light leading-none mb-6 animate-fade-in-up text-white" style={{ fontFamily: "'Cormorant', serif" }}>
              Запах утра<br />
              <em className="font-semibold" style={{ color: "var(--gold-light)" }}>из печи</em>
            </h1>
            <p className="text-lg leading-relaxed mb-10 animate-fade-in-up delay-200" style={{ color: "rgba(255,255,255,0.85)" }}>
              Ремесленный хлеб на закваске, французские круассаны и авторские торты. Готовим с душой с 6 утра.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: "var(--gold)", color: "var(--brown)" }}
              >
                <Icon name="ShoppingBag" size={18} />
                Смотреть меню
              </a>
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold border-2 transition-all duration-300 hover:bg-white hover:text-amber-900"
                style={{ borderColor: "rgba(255,255,255,0.6)", color: "white" }}
              >
                Сделать заказ
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in delay-500">
          <a href="#about" className="flex flex-col items-center gap-2 text-white opacity-50 hover:opacity-90 transition-opacity">
            <span className="text-xs uppercase tracking-widest" style={{ fontSize: "10px" }}>Листать</span>
            <Icon name="ChevronDown" size={20} />
          </a>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
                Наша история
              </p>
              <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif" }}>
                Пекарня с<br /><em className="font-semibold">характером</em>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--warm-gray)" }}>
                Мы открылись в 2018 году с одной печью и большой любовью к настоящему хлебу.
                Сегодня каждое утро наши пекари начинают работу в 4 утра, чтобы к открытию всё было свежим и ароматным.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: "var(--warm-gray)" }}>
                Мы используем только натуральные ингредиенты — без консервантов и улучшителей.
                Закваска для хлеба живёт у нас уже 6 лет.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "6 лет", label: "на рынке" },
                  { num: "40+", label: "позиций в меню" },
                  { num: "500+", label: "постоянных клиентов" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-semibold mb-1" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif" }}>
                      {stat.num}
                    </div>
                    <div className="text-xs uppercase tracking-wide" style={{ color: "var(--warm-gray)", fontSize: "11px" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl" style={{ backgroundColor: "var(--beige)", border: "2px solid var(--gold)", opacity: 0.7 }} />
              <img src={GALLERY_IMG2} alt="Наша пекарня" className="relative z-10 w-full rounded-3xl object-cover shadow-2xl" style={{ height: "480px" }} />
              <div className="absolute -bottom-6 -right-6 z-20 px-6 py-4 rounded-2xl shadow-xl" style={{ backgroundColor: "var(--brown)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="text-white font-semibold text-sm">4.9 из 5</div>
                    <div style={{ color: "var(--gold-light)", fontSize: "11px" }}>248 отзывов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* DISCOUNTS */}
      <Section className="py-16 px-6" style={{ backgroundColor: "var(--brown)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "var(--gold-light)", letterSpacing: "0.2em" }}>
              Специальные предложения
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: "'Cormorant', serif" }}>
              Акции & <em className="font-semibold" style={{ color: "var(--gold-light)" }}>скидки</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DISCOUNTS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 hover-lift cursor-default"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(200,155,60,0.3)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(200,155,60,0.2)" }}>
                  <Icon name={item.icon} fallback="Star" size={22} style={{ color: "var(--gold-light)" }} />
                </div>
                <div className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "rgba(200,155,60,0.2)", color: "var(--gold-light)", fontSize: "10px" }}>
                  {item.label}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'Cormorant', serif", fontSize: "22px" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section id="products" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
              Популярное
            </p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif" }}>
              Любимые<em className="font-semibold"> позиции</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="rounded-2xl p-6 hover-lift group cursor-pointer" style={{ backgroundColor: "var(--beige)", border: "1px solid rgba(139,96,64,0.15)" }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{p.emoji}</span>
                  {p.badge && (
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: p.badge === "Хит" ? "var(--gold)" : "var(--brown)",
                        color: p.badge === "Хит" ? "var(--brown)" : "var(--cream)",
                        fontSize: "11px",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:opacity-75 transition-opacity" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif", fontSize: "20px" }}>
                  {p.name}
                </h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--warm-gray)" }}>
                  {p.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif" }}>
                    {p.price}
                  </span>
                  <button
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{ backgroundColor: "var(--brown)", color: "var(--cream)" }}
                  >
                    <Icon name="Plus" size={14} />
                    В заказ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-24 overflow-hidden" style={{ backgroundColor: "var(--beige)" }}>
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
                Фотогалерея
              </p>
              <h2 className="text-5xl md:text-6xl font-light" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif" }}>
                Наши<em className="font-semibold"> работы</em>
              </h2>
            </div>
            <p className="hidden md:block text-sm" style={{ color: "var(--warm-gray)" }}>← Листайте →</p>
          </div>
        </div>

        <div
          className="flex gap-5 overflow-x-auto pb-4"
          style={{ paddingLeft: "max(24px, calc((100vw - 1152px)/2 + 24px))", paddingRight: "24px", scrollbarWidth: "none" }}
        >
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 group relative overflow-hidden rounded-2xl cursor-pointer hover-lift"
              style={{ width: i % 2 === 0 ? "320px" : "260px", height: "380px" }}
            >
              <img src={item.img} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-end p-5"
                style={{ background: "linear-gradient(to top, rgba(92,61,30,0.85) 0%, transparent 60%)" }}
              >
                <span className="text-white font-medium text-sm">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ORDER FORM */}
      <Section id="order" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
              Свяжитесь с нами
            </p>
            <h2 className="text-5xl md:text-6xl font-light mb-4" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif" }}>
              Сделать<em className="font-semibold"> заказ</em>
            </h2>
            <p className="text-base" style={{ color: "var(--warm-gray)" }}>
              Оставьте заявку — перезвоним в течение 15 минут
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16 rounded-3xl" style={{ backgroundColor: "var(--beige)", border: "2px solid var(--gold)" }}>
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-3xl font-semibold mb-3" style={{ color: "var(--brown)", fontFamily: "'Cormorant', serif" }}>
                Спасибо за заявку!
              </h3>
              <p style={{ color: "var(--warm-gray)" }}>Мы свяжемся с вами совсем скоро</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 md:p-10 flex flex-col gap-5"
              style={{ backgroundColor: "var(--beige)", border: "1px solid rgba(139,96,64,0.2)", boxShadow: "0 20px 60px rgba(92,61,30,0.1)" }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--brown)" }}>Имя</label>
                  <input
                    type="text" placeholder="Ваше имя" value={form.name} required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ backgroundColor: "var(--cream)", border: "1.5px solid rgba(139,96,64,0.2)", color: "var(--brown)" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(139,96,64,0.2)")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--brown)" }}>Телефон</label>
                  <input
                    type="tel" placeholder="+7 (___) ___-__-__" value={form.phone} required
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ backgroundColor: "var(--cream)", border: "1.5px solid rgba(139,96,64,0.2)", color: "var(--brown)" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(139,96,64,0.2)")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--brown)" }}>Что хотите заказать?</label>
                <input
                  type="text" placeholder="Например: торт на день рождения, хлеб на закваске..." value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ backgroundColor: "var(--cream)", border: "1.5px solid rgba(139,96,64,0.2)", color: "var(--brown)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(139,96,64,0.2)")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--brown)" }}>Комментарий</label>
                <textarea
                  placeholder="Пожелания, дата, количество..." value={form.comment} rows={3}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{ backgroundColor: "var(--cream)", border: "1.5px solid rgba(139,96,64,0.2)", color: "var(--brown)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(139,96,64,0.2)")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--brown)", color: "var(--cream)" }}
              >
                <Icon name="Send" size={18} />
                Отправить заявку
              </button>

              <p className="text-center text-xs" style={{ color: "var(--warm-gray)" }}>
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "var(--brown)" }} className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🍞</span>
                <div>
                  <div className="text-2xl font-semibold text-white" style={{ fontFamily: "'Cormorant', serif" }}>Тепло</div>
                  <div style={{ color: "var(--gold-light)", fontSize: "10px", letterSpacing: "0.2em" }} className="uppercase tracking-widest">Булочная</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                Каждое утро с 6:00 мы печём хлеб, круассаны и пирожные. Приходите за теплом и вкусом.
              </p>
              <div className="flex gap-3">
                {["Instagram", "Send", "Phone"].map((icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ backgroundColor: "rgba(200,155,60,0.2)", color: "var(--gold-light)" }}>
                    <Icon name={icon} fallback="Link" size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: "var(--gold-light)", letterSpacing: "0.15em" }}>Меню</h4>
              <ul className="flex flex-col gap-3">
                {["Хлеб", "Выпечка", "Торты", "Десерты", "Напитки"].map((item) => (
                  <li key={item}>
                    <a href="#products" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: "var(--gold-light)", letterSpacing: "0.15em" }}>Контакты</h4>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "MapPin", text: "ул. Хлебная, 12" },
                  { icon: "Clock", text: "Пн–Вс: 7:00–20:00" },
                  { icon: "Phone", text: "+7 (999) 000-00-00" },
                  { icon: "Mail", text: "hello@teplo.ru" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon name={item.icon} fallback="MapPin" size={14} style={{ color: "var(--gold-light)", flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>© 2024 Булочная «Тепло». Все права защищены.</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Сделано с ❤️ и мукой</p>
          </div>
        </div>
      </footer>
    </div>
  );
}