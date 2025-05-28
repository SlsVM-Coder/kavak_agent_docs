export default function Installation() {
  return (
    <>
      <h2>Manual de Instalación y Despliegue del Bot Comercial de Kavak</h2>
      <p>
        Este manual guía paso a paso la instalación, configuración, pruebas y
        despliegue de tu bot de WhatsApp para Kavak, partiendo desde un entorno
        limpio.
      </p>

      <ol>
        <li>
          <strong>Prerequisitos</strong>
          <ul>
            <li>Git (v2.+)</li>
            <li>Python 3.11 o 3.13</li>
            <li>Docker & Docker Compose</li>
            <li>Ngrok (para exponer localmente)</li>
            <li>Cuenta de OpenAI con su API Key</li>
            <li>Cuenta de Twilio Sandbox para WhatsApp</li>
          </ul>
        </li>

        <li>
          <strong>Clonar el repositorio</strong>
          <pre>
            <code className="bash">
              git clone https://github.com/SlsVM-Coder/kavak_agent_bot.git cd
              kavak-agent-bot
            </code>
          </pre>
        </li>

        <li>
          <strong>Variables de entorno</strong>
          <p>
            Crea un archivo <code>.env</code> en la raíz con:
          </p>
          <pre>
            <code className="ini">
              # .env OPENAI_API_KEY=sk-... OPENAI_MODEL=gpt-4o
              TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              TWILIO_WHATSAPP_NUMBER=whatsapp:+1415xxxxxxx # Ruta al catálogo
              CSV (Docker Compose monta /app/data por defecto)
              CATALOG_CSV_PATH=/app/data/catalog.csv
            </code>
          </pre>
        </li>

        <li>
          <strong>Entorno Python local (opcional)</strong>
          <p>Si quieres probar sin Docker:</p>
          <pre>
            <code className="bash">
              python3 -m venv venv source venv/bin/activate pip install
              --upgrade pip pip install -r requirements.txt # Copia el catálogo
              al directorio correcto mkdir -p app/data cp data/catalog.csv
              app/data/catalog.csv
            </code>
          </pre>
        </li>

        <li>
          <strong>Ejecutar pruebas</strong>
          <pre>
            <code className="bash">pytest --maxfail=1 -q</code>
          </pre>
          <ul>
            <li>Debes ver al menos 6 tests verdes en ~2s.</li>
            <li>
              Asegúrate de que no queden errores de importación ni fallos de
              aserciones.
            </li>
          </ul>
        </li>

        <li>
          <strong>Levantado con Docker Compose</strong>
          <p>1. Construir y arrancar en segundo plano:</p>
          <pre>
            <code className="bash">docker-compose up --build -d</code>
          </pre>
          <p>2. Verificar contenedor y ver logs:</p>
          <pre>
            <code className="bash">
              docker-compose ps docker logs -f kavak-agent-bot
            </code>
          </pre>
        </li>

        <li>
          <strong>Exponer localmente con ngrok</strong>
          <p>En otra terminal:</p>
          <pre>
            <code className="bash">ngrok http 8000</code>
          </pre>
          <p>
            Copia la URL HTTPS que te brinda (ej.{" "}
            <code>https://abcd1234.ngrok.io</code>).
          </p>
        </li>

        <li>
          <strong>Configurar Webhook en Twilio Sandbox</strong>
          <ol>
            <li>
              Ingresa a{" "}
              <a href="https://www.twilio.com/console">Twilio Console</a> →
              WhatsApp Sandbox.
            </li>
            <li>En “When a message comes in”, pega:</li>
            <pre>
              <code className="bash">https://abcd1234.ngrok.io/whatsapp/</code>
            </pre>
            <li>Guarda la configuración.</li>
          </ol>
        </li>

        <li>
          <strong>Pruebas finales</strong>
          <p>
            <em>Con curl</em>:
          </p>
          <pre>
            <code className="bash">
              curl -i -X POST http://localhost:8000/whatsapp/ \ -H
              "Content-Type: application/x-www-form-urlencoded" \
              --data-urlencode
              "From=whatsapp:+&lt;tu-código-país&gt;&lt;tu-número-asociado-con-Twilio&gt;"
              \ --data-urlencode "Body=Hola"
            </code>
          </pre>

          <p>
            <em>O vía ngrok</em>:
          </p>
          <pre>
            <code className="bash">
              curl -i -X POST
              https://&lt;tu-dominio-ngrok&gt;.ngrok-free.app/whatsapp/ \ -H
              "Content-Type: application/x-www-form-urlencoded" \
              --data-urlencode
              "From=whatsapp:+&lt;tu-código-país&gt;&lt;tu-número-asociado-con-Twilio&gt;"
              \ --data-urlencode "Body=Hola"
            </code>
          </pre>

          <ul>
            <li>Debes recibir un XML de TwiML con tu mensaje de respuesta.</li>
            <li>
              Desde WhatsApp, envía “Hola” a tu número de sandbox y comprueba el
              flujo.
            </li>
          </ul>
        </li>

        <li>
          <strong>Despliegue en Producción (Opcional)</strong>
          <ul>
            <li>
              Publicar imagen en Docker Hub / ECR:
              <pre>
                <code className="bash">
                  docker tag kavak-agent-bot:latest
                  tu-repo/kavak-agent-bot:1.0.0 docker push
                  tu-repo/kavak-agent-bot:1.0.0
                </code>
              </pre>
            </li>
            <li>Orquestación en Kubernetes usando Helm chart / Terraform.</li>
            <li>
              CI/CD: configurar pipeline para build, test y rollout automático.
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
}
