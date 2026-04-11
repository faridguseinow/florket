import { Helmet } from "react-helmet"
import "./style.scss"

export default function Cookies() {
  return (
    <main className="legal_page">
      <Helmet>
        <title>Cookie | Флоркет</title>
      </Helmet>

      <h1>Политика Cookie</h1>
      <p>
        Сайт использует cookie-файлы для корректной работы, сохранения пользовательских
        предпочтений и улучшения качества сервиса.
      </p>
      <p>
        Продолжая пользоваться сайтом, вы соглашаетесь на использование cookie в соответствии
        с настоящей политикой.
      </p>
      <p>
        Вы можете изменить настройки cookie в браузере, но это может повлиять на работу
        некоторых функций сайта.
      </p>
    </main>
  )
}
