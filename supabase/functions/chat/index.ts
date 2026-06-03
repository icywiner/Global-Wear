import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const SYSTEM_PROMPT = `Eres el asistente de compras de GlobalWear Compare.

Objetivo:
- Responder solo lo que el usuario pregunta.
- Usar únicamente el contexto entregado por la app.
- Priorizar país, ciudad, marca, categoría y productos visibles.
- No inventar productos, precios, ciudades ni marcas.
- No mezclar temas ni agregar contexto irrelevante.
- Mantener respuestas breves: una respuesta directa, una breve aclaración si hace falta, y nada más.

Reglas de estilo:
- Responde siempre en español.
- Si la pregunta es simple, responde en una o dos frases.
- Si no hay datos suficientes, responde: "No encontré productos disponibles para esa búsqueda en este momento." y, si corresponde, pide un solo dato faltante.
- Si la pregunta pide comparar o buscar el más barato, devuelve el resultado exacto y evita explicaciones generales.
- Si el contexto incluye moneda, úsala tal como viene de la app.
- Nunca des historia de marcas, categorías completas ni textos promocionales.

GlobalWear es una plataforma para comparar precios, disponibilidad y ofertas de ropa internacional.`;

function buildContextMessage(context: {
  countryName?: string;
  cityName?: string;
  currency?: string;
  currencySymbol?: string;
  brand?: string | null;
  category?: string | null;
  visibleProducts?: Array<{
    name: string;
    brand: string;
    category: string;
    price: number;
    currency: string;
    currencySymbol: string;
  }>;
}) {
  const lines: string[] = ['Contexto de la app:'];

  if (context.countryName || context.cityName) {
    lines.push(`- Ubicacion activa: ${[context.countryName, context.cityName].filter(Boolean).join(' · ')}`);
  }
  if (context.currency || context.currencySymbol) {
    lines.push(`- Moneda activa: ${context.currencySymbol || ''} ${context.currency || ''}`.trim());
  }
  if (context.brand) {
    lines.push(`- Marca seleccionada: ${context.brand}`);
  }
  if (context.category) {
    lines.push(`- Categoria seleccionada: ${context.category}`);
  }

  if (context.visibleProducts && context.visibleProducts.length > 0) {
    lines.push(`- Productos visibles: ${context.visibleProducts.length}`);
    lines.push('- Muestra de productos visibles:');
    context.visibleProducts.slice(0, 8).forEach((item) => {
      lines.push(`  - ${item.name} | ${item.brand} | ${item.category} | ${item.currencySymbol}${item.price.toLocaleString()} ${item.currency}`);
    });
  } else {
    lines.push('- Productos visibles: ninguno');
  }

  return lines.join('\n');
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const contextMessage = buildContextMessage(context || {});

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: contextMessage },
          ...messages,
        ],
        temperature: 0.2,
        max_tokens: 220,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Intentá de nuevo en unos segundos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos agotados." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
