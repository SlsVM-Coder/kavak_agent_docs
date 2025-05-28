import { Img } from "../components/Img";

export default function Prompts() {
  return (
    <>
      <h2>Arquitectura de Prompts &amp; Agents/Tools</h2>
      <p>
        Cada handler construye prompts específicos (saludo, selección,
        validación, etc.) que se envían junto al <code>SYSTEM_PROMPT</code> a la
        API de OpenAI. Los resultados guían el flujo.
      </p>

      {/* Diagrama de prompts */}
      <Img
        src="/Diagrama_prompts_arquitectura.png"
        alt="Diagrama de prompts y arquitectura de agentes"
        width="600px"
      />

      {/* Descripción breve */}
      <h3>Descripción breve:</h3>
      <ol>
        <li>
          <strong>Prompt Layer</strong>
          <ul>
            <li>
              <code>SYSTEM_PROMPT</code> (contexto general de “Agente de
              Kavak”).
            </li>
            <li>User Prompt (mensajes dinámicos creados por cada handler).</li>
            <li>
              Ambos se envían juntos al <strong>LLMService</strong> (wrapper de
              OpenAI).
            </li>
          </ul>
        </li>
        <li>
          <strong>Agents / Handlers</strong>
          <ul>
            <li>
              Cada handler construye un user prompt específico (saludo,
              opciones, validaciones, errores).
            </li>
            <li>
              <strong>LLMService</strong> expone métodos como{" "}
              <code>chat_user(...)</code> para conversaciones guiadas.
            </li>
          </ul>
        </li>
        <li>
          <strong>Tools</strong>
          <ul>
            <li>
              <strong>RecommendationService</strong>: busca en el catálogo (CSV)
              para sugerir autos.
            </li>
            <li>
              <strong>FinancingCalculator</strong>: calcula pagos mensuales y
              totales.
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
}
