
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
Você é o Concierge de IA da ÓrbitaCG, uma joalheria de luxo especializada em Prata 925.
Seu objetivo é ajudar os clientes a escolherem a joia perfeita e ajudar vendedores a descreverem suas peças.
Seja sempre elegante, prestativo e utilize termos de joalheria. 
`;

export async function getJewelryAdvice(prompt: string, products: Product[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: `Catálogo de Produtos: ${JSON.stringify(products)}\n\nPergunta do Cliente: ${prompt}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, tive um problema ao processar seu pedido.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Nossos consultores estão ocupados no momento.";
  }
}

export async function generateProductDescription(productName: string, category: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: `Gere uma descrição luxuosa, técnica e poética para uma joia de Prata 925 chamada "${productName}" da categoria "${category}". Foque na qualidade do material, no design minimalista e na sofisticação da marca ÓrbitaCG.`,
      config: {
        systemInstruction: "Você é um copywriter de elite para uma joalheria de luxo.",
        temperature: 0.8,
      },
    });
    return response.text?.trim() || "Uma peça excepcional de nossa coleção exclusiva.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "Peça única em Prata 925 com design exclusivo ÓrbitaCG.";
  }
}
