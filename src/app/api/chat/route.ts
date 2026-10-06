import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getPlans, getSettings } from '@/lib/db';
import { Plan } from '@/types';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Fallback intelligent responder if GEMINI_API_KEY is not provided or quota exceeded
function generateFallbackResponse(
  userQuery: string,
  plans: Plan[],
  instructorName: string
): { reply: string; recommendedPlan?: Plan } {
  const query = userQuery.toLowerCase();

  // 1. Beginner inquiry
  if (query.includes('beginner') || query.includes('start') || query.includes('new to yoga') || query.includes('first time')) {
    const beginnerPlan = plans.find(p => p.level === 'BEGINNER' || p.level === 'ALL_LEVELS') || plans[0];
    return {
      reply: `Namaste. Welcome to your practice. If you are new to yoga, you are in the right place.\n\n${instructorName}'s foundational sessions focus on gentle somatic alignment, breath awareness, and joint mobility rather than forcing complex shapes. You do not need flexibility to begin—flexibility is simply a byproduct of regular practice.\n\nI recommend starting with our gentle cohort or foundational private session:`,
      recommendedPlan: beginnerPlan,
    };
  }

  // 2. Back pain / neck / desk worker stiffness
  if (
    query.includes('back') ||
    query.includes('pain') ||
    query.includes('neck') ||
    query.includes('desk') ||
    query.includes('stiff') ||
    query.includes('spine') ||
    query.includes('sciatica')
  ) {
    const privateOrStretch = plans.find(p => p.type === 'PRIVATE') || plans.find(p => p.level === 'BEGINNER') || plans[0];
    return {
      reply: `I completely understand. Prolonged sitting and screen posture create thoracic tightness, forward head tilt, and lower back compression.\n\nIn our practice, we gently decompress the lumbar spine with supported postures (like Balasana / Child's Pose and Supta Padangusthasana) combined with diaphragmatic breathing to release deep tension.\n\n*A gentle note: if you have acute disc herniation or sharp nerve pain, always seek approval from your physician.* For personalized attention, a 1-on-1 private sequence is ideal:`,
      recommendedPlan: privateOrStretch,
    };
  }

  // 3. Batch timings / Schedule
  if (query.includes('time') || query.includes('timing') || query.includes('schedule') || query.includes('slot') || query.includes('morning') || query.includes('evening')) {
    const batchPlan = plans.find(p => p.type === 'BATCH') || plans[0];
    return {
      reply: `Our regular live cohorts run in two peaceful time slots:\n\n• **Morning Sadhana**: 7:00 AM – 8:00 AM IST (focused on energizing Surya flows and pranayama)\n• **Evening Unwind**: 6:30 PM – 7:30 PM IST (focused on hip opening, nervous system restoration & deep breath)\n\nFor 1-on-1 private sessions, timings are completely flexible to match your time zone (including US, UK, and Europe).`,
      recommendedPlan: batchPlan,
    };
  }

  // 4. Preparation, food, props
  if (query.includes('eat') || query.includes('food') || query.includes('wear') || query.includes('prop') || query.includes('mat') || query.includes('prepare')) {
    return {
      reply: `Here are a few mindful guidelines before unrolling your mat:\n\n• **Meals**: Practice on an empty stomach. Wait 2 to 2.5 hours after a main meal, or have a light fruit/tender coconut water 45 minutes prior.\n• **Attire**: Comfortable, breathable, stretchable clothing (cotton or athletic wear) that allows free hip and ribcage movement.\n• **Props**: A non-slip yoga mat (4–6mm). Having two cork or foam yoga blocks and a strap (or long towel) nearby is wonderfully helpful for gentle modifications.\n• **Hydration**: Drink water beforehand, but avoid large gulps during active asana practice.`,
    };
  }

  // 5. Pricing or membership
  if (query.includes('price') || query.includes('cost') || query.includes('fee') || query.includes('how much') || query.includes('plan')) {
    const featuredPlan = plans.find(p => p.isFeatured) || plans[0];
    const planSummary = plans.map(p => `• **${p.title}**: ₹${p.price.toLocaleString()} (${p.duration})`).join('\n');
    return {
      reply: `Here is our current offering overview:\n\n${planSummary}\n\nAll cohorts include live interactive feedback, video alignment reviews, and breathwork guidance. Here is our most popular option:`,
      recommendedPlan: featuredPlan,
    };
  }

  // Default warm yogic reply
  const defaultPlan = plans[0];
  return {
    reply: `Namaste. Thank you for reaching out. ${instructorName}'s studio offers intimate live cohorts, focused private 1-on-1 journeys, and restorative weekend workshops.\n\nWhether your intention is cultivating everyday peace, relieving spinal tension, or deepening your pranayama breath, we are here to support your journey. How can I best guide your practice today?`,
    recommendedPlan: defaultPlan,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content;

    // Fetch live active plans & settings from database
    const [plans, settings] = await Promise.all([
      getPlans(false).catch(() => []),
      getSettings().catch(() => null),
    ]);

    const instructorName = settings?.instructorName || 'Dhaarna Sharma';
    const instagramHandle = settings?.instagramHandle || '@yogawithdhaarna';
    const apiKey = process.env.GEMINI_API_KEY;

    // If no Gemini API key is configured in the environment, gracefully use intelligent fallback
    if (!apiKey) {
      const fallback = generateFallbackResponse(lastUserMessage, plans, instructorName);
      return NextResponse.json({
        reply: fallback.reply,
        recommendedPlan: fallback.recommendedPlan || null,
        provider: 'assistant-offline',
      });
    }

    // Prepare system instructions with live database plans grounded into context
    const plansContext = plans.map(p => {
      let feats: string[] = [];
      try {
        feats = Array.isArray(p.features) ? p.features : JSON.parse(p.features as any);
      } catch {
        feats = [];
      }
      return `- ID: ${p.id} | Title: "${p.title}" | Type: ${p.type} | Level: ${p.level} | Price: ₹${p.price} (USD: $${p.priceUsd}) | Duration: ${p.duration} | Badge: ${p.badge || 'None'} | Highlights: ${feats.slice(0, 3).join(', ')}`;
    }).join('\n');

    const systemPrompt = `You are "Prana", the serene, knowledgeable, and mindful AI Yoga Concierge for the studio "Yoga with Dhaarna" led by certified yoga instructor ${instructorName} (${instagramHandle}).

YOUR ROLE & TONE:
- Speak with warm, grounded, authentic yogic presence. Use tranquil, respectful language (e.g. "Namaste", "gentle awareness", "breath-led movement").
- Be concise, welcoming, and helpful (keep responses to 2 to 3 well-formatted short paragraphs or bullet points).
- Avoid robotic corporate customer service phrases.
- If the user asks about physical tightness, back pain, desk worker posture, or flexibility, explain practical yogic perspectives (e.g. decompression of spine, hip openers, diaphragmatic breathing, mindful modifications).
- SAFETY DISCLAIMER: If someone mentions acute medical trauma, severe disc herniation, post-surgery, or pregnancy, gently remind them that yoga is complementary and they should check with their medical physician.

CURRENT LIVE OFFERINGS & PRICING (FROM OUR STUDIO DATABASE):
${plansContext || 'Private 1-on-1 and Group Cohorts available.'}

SCHEDULE & PRACTICE DETAILS:
- Morning Live Cohort: 7:00 AM – 8:00 AM IST
- Evening Live Cohort: 6:30 PM – 7:30 PM IST
- Private 1-on-1: Flexible personalized scheduling across all global timezones (IST, US, UK, Europe, Australia).
- Practice Preparation: Practice on empty stomach (2.5 hrs after food or 45 mins after light fruit), comfortable cotton/stretch wear, 4-6mm yoga mat, 2 blocks/strap recommended.

RECOMMENDING A CLASS:
When the user's question relates to choosing a plan, starting practice, price, or suitable class, recommend the single most fitting plan from the list above. At the very end of your response, output the exact tag:
[[RECOMMEND:PLAN_ID]]
Replace PLAN_ID with the exact ID from the list above. Only include one such tag if a recommendation is relevant.`;

    try {
      const ai = new GoogleGenAI({ apiKey });
      const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

      // Format conversation history for Gemini
      const formattedContents = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: modelName,
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      });

      let replyText = response.text || '';

      // Extract recommended plan ID if tag is present: [[RECOMMEND:xyz]]
      let recommendedPlan: Plan | null = null;
      const match = replyText.match(/\[\[RECOMMEND:([a-zA-Z0-9_-]+)\]\]/);
      if (match) {
        const planId = match[1];
        recommendedPlan = plans.find(p => p.id === planId) || null;
        replyText = replyText.replace(/\[\[RECOMMEND:[a-zA-Z0-9_-]+\]\]/, '').trim();
      }

      // If no tag found but user asked for plans/classes, match the first featured/relevant plan
      if (!recommendedPlan && (lastUserMessage.toLowerCase().includes('plan') || lastUserMessage.toLowerCase().includes('join') || lastUserMessage.toLowerCase().includes('price'))) {
        recommendedPlan = plans.find(p => p.isFeatured) || plans[0] || null;
      }

      return NextResponse.json({
        reply: replyText,
        recommendedPlan,
        provider: 'gemini',
      });
    } catch (genError: any) {
      console.warn('Gemini API call failed, falling back to mindful assistant:', genError?.message);
      const fallback = generateFallbackResponse(lastUserMessage, plans, instructorName);
      return NextResponse.json({
        reply: fallback.reply,
        recommendedPlan: fallback.recommendedPlan || null,
        provider: 'assistant-fallback',
      });
    }
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Unable to process mindful reflection at this time' },
      { status: 500 }
    );
  }
}
