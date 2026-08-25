import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <!-- Header -->
  <header class="header">
    <div class="container">
      <a href="/" class="logo">Doctor<span>Fomin</span></a>
      <nav>
        <ul class="nav">
          <li><a href="#services">Услуги</a></li>
          <li><a href="#about">О враче</a></li>
          <li><a href="#contacts">Контакты</a></li>
          <li><a href="tel:+79990000000" class="btn btn-primary">Записаться на прием</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <h1>Профессиональная медицинская помощь</h1>
      <p class="lead">
        Опытный подход, современные методы и забота о вашем здоровье.
        Запишитесь на консультацию — первый шаг к выздоровлению.
      </p>
      <a href="tel:+79990000000" class="btn btn-primary">Записаться на прием</a>
    </div>
  </section>

  <!-- Services -->
  <section id="services" class="section">
    <div class="container">
      <div class="services-heading">
        <h2>Наши услуги</h2>
      </div>
      <div class="services-grid">
        <div class="service-card">
          <h3>Первичная консультация</h3>
          <p>Сбор анамнеза, осмотр и составление индивидуального плана лечения.</p>
        </div>
        <div class="service-card">
          <h3>Диагностика</h3>
          <p>Современные методы обследования для точного выявления заболеваний.</p>
        </div>
        <div class="service-card">
          <h3>Лечение и наблюдение</h3>
          <p>Комплексная терапия и регулярный контроль динамики состояния.</p>
        </div>
        <div class="service-card">
          <h3>Профилактика</h3>
          <p>Поддержание здоровья и профилактические осмотры.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer id="contacts" class="footer">
    <div class="container">
      <div class="footer-col">
        <div class="footer-title">Адрес</div>
        <span>г. Москва, ул. Примерная, д. 10</span>
      </div>
      <div class="footer-col">
        <div class="footer-title">Телефон</div>
        <a href="tel:+79990000000">+7 (999) 000-00-00</a>
      </div>
      <div class="footer-col">
        <div class="footer-title">Email</div>
        <a href="mailto:info@doctorfomin.com">info@doctorfomin.com</a>
      </div>
      <div class="footer-col">
        <div class="footer-title">Режим работы</div>
        <span>Пн–Пт: 09:00 – 18:00</span>
        <span>Сб: 10:00 – 14:00</span>
      </div>
    </div>
  </footer>
`
