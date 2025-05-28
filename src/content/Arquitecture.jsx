import { Img } from "../components/Img";

export default function Architecture() {
  return (
    <>
      <h2>Arquitectura de Componentes</h2>
      <p>
        El siguiente diagrama de alto nivel muestra los componentes y su
        interacción:
      </p>
      <Img
        src="/Diagrama_alto_nivel_componentes_arquitectura.png"
        alt="Diagrama de alto nivel de componentes y arquitectura"
        width="800px"
      />

      <h3>Leyenda de componentes</h3>
      <ul>
        <li>
          <strong>Usuario WhatsApp</strong>: envía y recibe mensajes desde el
          sandbox de Twilio.
        </li>
        <li>
          <strong>Twilio Sandbox (API Gateway)</strong>: recibe webhooks de
          WhatsApp y los reenvía a tu FastAPI.
        </li>
        <li>
          <strong>FastAPI/Uvicorn</strong>: servidor que expone el
          endpoint&nbsp;
          <code>/whatsapp/</code>.
        </li>
        <li>
          <strong>Router</strong>: despacha la petición al servicio principal.
        </li>
        <li>
          <strong>WhatsAppService</strong>: orquestador que:
          <ul>
            <li>
              <strong>SessionManager</strong>: mantiene el estado de la
              conversación por usuario.
            </li>
            <li>
              <strong>Handlers</strong>: lógica dividida por pasos (saludo,
              selección, financiamiento, etc.).
            </li>
            <li>
              <strong>LLMService</strong>: wrapper para llamadas a OpenAI, con
              prompts y cache si aplica.
            </li>
            <li>
              <strong>RecommendationService</strong>: lee{" "}
              <code>catalog.csv</code> y sugiere autos.
            </li>
            <li>
              <strong>FinancingCalculator</strong>: genera planes basados en
              enganche, plazo e interés.
            </li>
          </ul>
        </li>
        <li>
          <strong>OpenAI API</strong>: modelo GPT para generación de lenguaje.
        </li>
        <li>
          <strong>Docker Container</strong>: empaqueta toda la aplicación y sus
          dependencias.
        </li>
        <li>
          <strong>ngrok (opcional)</strong>: expone tu contenedor local al
          internet para Twilio.
        </li>
      </ul>
    </>
  );
}
