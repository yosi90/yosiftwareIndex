# Petición de Yosiftadísticas: medición anónima de las webs sin backend

Fecha: 2026-10-06
Proyecto solicitante: Yosiftadísticas, repositorio privado `yosi90/yosiftadisticas` (en el servidor: `C:\Users\Yosi\Desktop\Yosiftadisticas`)

## Contexto

Yosiftadísticas envía al propietario, por Notificapp, informes de si sus webs se usan: cuántas personas entran y cuánto tiempo permanecen. La medición es anónima: un script central, sin cookies ni identificadores, y un colector propio en `https://estadisticas.yosiftware.es`. Las webs **no** implementan seguimiento propio: solo cargan el script.

Esta petición es común a las webs cuyo código no vive en el servidor. Cada agente aplica solo la parte de su web.

| Web | Repositorio | Hosting |
| --- | --- | --- |
| `https://yosiftware.es` (hall) | `yosi90/yosiftwareIndex` | Firebase `yosiftware-index` |
| `https://cv.yosiftware.es` | `yosi90/Cv` | Firebase `yosiftware-cv` |
| `https://zoogenesis.yosiftware.es` | `yosi90/ZooGenesis` | Firebase `yosiftware-zoogenesis` |
| `https://dia.yosiftware.es` | `yosi90/rueda-mental` | Firebase `galatea-dias` |
| `https://tv.yosiftware.es` | `yosi90/television` | GitHub Pages |
| `https://poke-voice.yosiftware.es` | `yosi90/pokemon-voice` | GitHub Pages |
| `https://istqb.yosiftware.es` | `yosi90/Syllabus-cert.-study` | GitHub Pages |

`libros-front` y `fichasangular` **no** deben aplicar esta petición: recibirán las instrucciones de sus APIs (Libros y Fichas), porque allí la exclusión del propietario depende de la cuenta.

## Cómo tramitarla

1. Copia este documento a `docs/peticiones/` de tu repositorio (crea la carpeta si no existe) y tramítalo allí según tus normas.
2. Copia la carpeta `estadisticas-kit/` del repositorio `yosi90/yosiftadisticas` (rama `main`) a la raíz de tu proyecto. Añade `/estadisticas-kit/` al `.gitignore` y lee `README.md` e `INTEGRACION.md`.

## Qué pedimos

1. **Cargar el script.** Añade `<script defer src="https://estadisticas.yosiftware.es/s.js"></script>` al `<head>` de cada documento HTML servido. En una aplicación de una sola página basta con `index.html`. No lo copies ni lo configures.
2. **Exclusión del propietario.** Sin backend no hace falta nada: el colector descarta la red de casa del propietario, y él puede marcar cualquier otro dispositivo con `?yt-ignorar`. Si la web tiene inicio de sesión (por ejemplo, Firebase Auth) y quieres excluir también por cuenta, puedes guardar `localStorage["yosiftadisticas:excluir"] = "1"` cuando el UID coincida con el del propietario. Es opcional; consulta antes con él.
3. **AGENTS.md:** añade el bloque de `estadisticas-kit/AGENTS_SNIPPET.md`.

## Comprobaciones previas hechas por Yosiftadísticas (2026-10-06)

- Ninguna de estas webs envía cabecera Content-Security-Policy. Si el HTML declara una CSP en `<meta>` o se añade en el futuro, debe admitir `https://estadisticas.yosiftware.es` en `script-src` y `connect-src`.
- Si la web tiene service worker, no debe cachear `s.js` ni interceptar los envíos `POST` a `https://estadisticas.yosiftware.es/v1/e`.
- El script no actúa en `localhost`, `*.web.app`, `*.firebaseapp.com` ni `*.github.io`. Puede ir en el HTML de todos los entornos.
- No se envía URL, ruta, contenido ni ningún otro dato de la web. El propietario aprobó este modelo.

## Calendario

El colector todavía se está construyendo. Puedes preparar el cambio ya, pero **no lo publiques hasta que `https://estadisticas.yosiftware.es/health` responda 200**.

## Fuera de alcance

- Eventos propios, analítica de rutas o de funcionalidades: no se piden y no deben añadirse.
- Conviene mencionar la medición anónima de audiencia en la política de privacidad de la web, si existe.

## Resolución esperada

En tu copia de la petición, añade una sección de resolución con lo implementado y el resultado de la verificación de `INTEGRACION.md` una vez publicado. Después muévela a `docs/peticiones/respondidas/` con un prefijo de estado (`ACEPTADA_`, `ACEPTADA-PARCIALMENTE_` o `RECHAZADA_`) y avisa al propietario. Yosiftadísticas comprobará en el colector que llegan visitas de tu web.

## Resolución (2026-10-07): ACEPTADA

Aplicada la parte del hall (`https://yosiftware.es`, repositorio `yosi90/yosiftwareIndex`, Firebase `yosiftware-index`).

### Implementado

- `estadisticas-kit/` copiado desde `C:\Users\Yosi\Desktop\Yosiftadisticas\estadisticas-kit` (rama `main`, al día con `origin/main`) y añadido `/estadisticas-kit/` al `.gitignore`. `git check-ignore -v estadisticas-kit/README.md` lo confirma.
- `<script defer src="https://estadisticas.yosiftware.es/s.js"></script>` añadido al `<head>` de `src/index.html`, el único HTML de la aplicación (Angular de una sola página). Sin copiarlo ni configurarlo.
- Creado `AGENTS.md` con el bloque de `AGENTS_SNIPPET.md`.
- Exclusión por cuenta: no aplica. La web no tiene inicio de sesión. El propietario ya marcó sus dispositivos con `?yt-ignorar` y el colector descarta la red de su casa.
- No se han añadido eventos, rutas ni otros datos.

### Comprobaciones

- `https://estadisticas.yosiftware.es/health` respondió 200 antes de publicar; `s.js` responde 200 (`application/javascript`).
- Sin service worker (no hay `@angular/service-worker` ni `ngsw`).
- Sin CSP: ni en `<meta http-equiv>` ni en `firebase.json`, y la respuesta publicada (Firebase detrás de Cloudflare) no envía la cabecera `Content-Security-Policy`.
- `https://www.yosiftware.es` redirige con 301 a `https://yosiftware.es`, que está en la lista de hosts de `s.js`.
- La página no define `referrerpolicy`, así que en los envíos a `/v1/e` el navegador manda como mucho el origen, nunca la ruta. El cuerpo solo lleva `v`, `t`, el token aleatorio de visita, los segundos y los indicadores día/semana/mes.

### Publicación y verificación

- Compilado con `ng build` (producción) y desplegado con `firebase deploy --only hosting --project yosiftware-index` el 2026-10-07. El único archivo nuevo fue `index.html`; el JS y el CSS de la aplicación no cambiaron.
- El HTML publicado en `https://yosiftware.es/` (y en `yosiftware-index.web.app`) contiene la etiqueta del script, con `last-modified: Wed, 07 Oct 2026 19:29:18 GMT`.
- Pasos 2 y 3 de `INTEGRACION.md` (inicio de sesión del propietario): no aplican, porque no hay cuentas.
- Paso 1 (ventana privada fuera de la red de casa, ver `204` en `/v1/e`): no se ha podido hacer desde el servidor, que está en la red de casa y cuyos envíos descarta el colector. No se enviaron eventos sintéticos para no falsear las cifras. Queda para que Yosiftadísticas confirme en el colector que llegan visitas de `yosiftware.es`.
