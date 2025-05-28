export default function Roadmap() {
  return (
    <>
      <h2>Roadmap &amp; Backlog para Poner el Bot en Producción</h2>

      {/* Epics y Tareas Principales */}
      <h3>Epics y Tareas Principales</h3>
      <table>
        <thead>
          <tr>
            <th>Epic</th>
            <th>Tarea / Historia</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1. Contenerización &amp; Infra</td>
            <td>
              • Escribir Dockerfile y docker-compose.yml.
              <br />
              • Publicar imagen en registry (Docker Hub/ECR).
              <br />• Definir IaC (Helm chart o Terraform) para Kubernetes.
            </td>
            <td>Alta</td>
          </tr>
          <tr>
            <td>2. CI/CD</td>
            <td>
              • Configurar pipeline (GitHub Actions/GitLab CI) que:
              <br />
              &nbsp;&nbsp;– Build y test con pytest.
              <br />
              &nbsp;&nbsp;– Linter (flake8/mypy).
              <br />
              &nbsp;&nbsp;– Despliegue automático a staging y, tras validación,
              producción.
            </td>
            <td>Alta</td>
          </tr>
          <tr>
            <td>3. Seguridad &amp; Configuración</td>
            <td>
              • Gestionar secretos (OpenAI/Twilio) con Vault o AWS Secrets
              Manager.
              <br />
              • HTTPS con cert-manager en Ingress.
              <br />• Rate-limit y CORS en API Gateway.
            </td>
            <td>Media</td>
          </tr>
          <tr>
            <td>4. Observabilidad &amp; Alertas</td>
            <td>
              • Logs estructurados (JSON) en ELK/CloudWatch.
              <br />
              • Métricas (requests, latencia, error-rate, tokens) en
              Prometheus/Grafana.
              <br />• Alertas Slack/email para errores y picos de latencia.
            </td>
            <td>Media</td>
          </tr>
          <tr>
            <td>5. Quality &amp; Testing</td>
            <td>
              • Tests unitarios e integración (pytest, TestClient).
              <br />
              • Golden transcripts para regresión de respuestas.
              <br />• Integrar pytest-cov y thresholds en CI.
            </td>
            <td>Alta</td>
          </tr>
          <tr>
            <td>6. Monitoreo de LLM</td>
            <td>
              • Dashboard de consumo de tokens y costes.
              <br />
              • Métrica de fallback-rate para ajustar prompts.
              <br />• Alertas de AuthenticationError o latencias elevadas en
              OpenAI.
            </td>
            <td>Media</td>
          </tr>
        </tbody>
      </table>

      {/* Sección 1 */}
      <h3>1. ¿Cómo pondrías esto en producción?</h3>
      <ol>
        <li>Contenerizar con Docker y exponer el puerto 8000.</li>
        <li>
          Infraestructuras como código (Helm/Terraform) para Kubernetes:
          <ul>
            <li>Deployment, Service, Ingress (TLS), ConfigMap/Secrets.</li>
          </ul>
        </li>
        <li>
          Pipeline CI/CD:
          <ul>
            <li>
              Build: <code>docker build</code>, <code>pytest</code>, lint.
            </li>
            <li>
              Deploy: rollout automático a staging; aprobación manual/automática
              en producción (canary/blue-green).
            </li>
          </ul>
        </li>
        <li>Gestión de secretos: usar Vault o AWS Secrets Manager.</li>
        <li>
          Escalado: definir HPA (Horizontal Pod Autoscaler) basado en CPU y
          métricas personalizadas (requests/sec, latencia).
        </li>
      </ol>

      {/* Sección 2 */}
      <h3>2. ¿Cómo evaluarías el desempeño del agente?</h3>
      <ul>
        <li>
          <strong>SLAs Técnicos</strong>:
          <ul>
            <li>99% de respuestas en &lt; 500 ms (excluyendo llamada LLM).</li>
            <li>Error rate &lt; 1%.</li>
          </ul>
        </li>
        <li>
          <strong>SLAs de Experiencia</strong>:
          <ul>
            <li>Fallback rate (respuestas genéricas) &lt; 10%.</li>
            <li>Duración media de conversación (pasos y tokens).</li>
          </ul>
        </li>
        <li>
          <strong>KPIs de Negocio</strong>:
          <ul>
            <li>Conversión: % de usuarios que solicitan financiamiento.</li>
            <li>Satisfacción: ratio 👍/👎 post-chat.</li>
          </ul>
        </li>
        <li>
          <strong>Costes LLM</strong>:
          <ul>
            <li>Tokens consumidos por conversación, coste mensual.</li>
          </ul>
        </li>
      </ul>

      {/* Sección 3 */}
      <h3>3. ¿Cómo probar que una nueva versión no tenga regresiones?</h3>
      <ol>
        <li>
          <strong>Tests Automatizados</strong>:
          <ul>
            <li>Unit tests para cada handler y utilitario.</li>
            <li>Integration tests E2E con golden transcripts.</li>
          </ul>
        </li>
        <li>
          <strong>Golden-File Diff</strong>:
          <ul>
            <li>
              Comparar la salida actual contra las respuestas “canónicas”.
            </li>
            <li>Si cambia, revisar prompt o lógica.</li>
          </ul>
        </li>
        <li>
          <strong>Despliegue Canary / Blue-Green</strong>:
          <ul>
            <li>Dirigir % de tráfico a la versión nueva.</li>
            <li>Monitorear métricas clave (errores, latencia, fallback).</li>
            <li>Revertir si algo falla.</li>
          </ul>
        </li>
        <li>
          <strong>Pruebas de Carga</strong>:
          <ul>
            <li>
              Con <code>locust</code> o <code>k6</code> simular cientos de
              usuarios concurrentes.
            </li>
            <li>
              Verificar que no se saturen las llamadas al LLM ni el servidor.
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
}
