import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const SCAN_MODEL = 'claude-sonnet-4-5-20250514';
const API_TIMEOUT_MS = 25_000;

type ScanCategory = 'dog' | 'cat' | 'person' | 'nature' | 'food' | 'other_animal' | 'object' | 'blurry';

const VALID_CATEGORIES: ScanCategory[] = [
  'dog', 'cat', 'person', 'nature', 'food', 'other_animal', 'object', 'blurry',
];

const BREED_SLUGS = [
  'labrador-retriever','golden-retriever','german-shepherd','french-bulldog','poodle-standard',
  'beagle','rottweiler','dachshund','yorkshire-terrier','boxer','siberian-husky','great-dane',
  'doberman-pinscher','shih-tzu','australian-shepherd','cavalier-king-charles-spaniel',
  'pomeranian','boston-terrier','havanese','border-collie','cocker-spaniel-american',
  'english-springer-spaniel','irish-setter','weimaraner','vizsla','brittany',
  'chesapeake-bay-retriever','english-cocker-spaniel','german-shorthaired-pointer',
  'nova-scotia-duck-tolling-retriever','collie-rough','shetland-sheepdog','belgian-malinois',
  'old-english-sheepdog','cardigan-welsh-corgi','pembroke-welsh-corgi','belgian-tervuren',
  'australian-cattle-dog','miniature-american-shepherd','bernese-mountain-dog','saint-bernard',
  'alaskan-malamute','newfoundland','akita','portuguese-water-dog','samoyed','great-pyrenees',
  'bullmastiff','cane-corso','bloodhound','basset-hound','whippet','greyhound','afghan-hound',
  'rhodesian-ridgeback','basenji','irish-wolfhound','saluki','petit-basset-griffon-vendeen',
  'bull-terrier','staffordshire-bull-terrier','west-highland-white-terrier','scottish-terrier',
  'miniature-schnauzer','airedale-terrier','cairn-terrier','jack-russell-terrier',
  'soft-coated-wheaten-terrier','wire-fox-terrier','border-terrier','chihuahua','maltese','pug',
  'papillon','chinese-crested','brussels-griffon','italian-greyhound','toy-poodle',
  'miniature-pinscher','bichon-frise','bulldog-english','dalmatian','chow-chow','lhasa-apso',
  'shiba-inu','chinese-shar-pei','keeshond','finnish-spitz','american-eskimo-dog',
  'tibetan-terrier','coton-de-tulear','norwegian-lundehund','xoloitzcuintli',
  'lagotto-romagnolo','nederlandse-kooikerhondje','biewer-terrier','russian-tsvetnaya-bolonka',
  'miniature-poodle','goldendoodle','labradoodle','cockapoo','bernedoodle','cavapoo','maltipoo',
  'aussiedoodle','schnoodle','puggle','shorkie','morkie','pomsky','goldador','boxador',
  'german-shepherd-mix','american-pit-bull-terrier','husky-mix','lab-mix','mixed-breed-small',
  'mixed-breed-medium','mixed-breed-large','american-staffordshire-terrier','bedlington-terrier',
  'cesky-terrier','dandie-dinmont-terrier','glen-of-imaal-terrier','irish-terrier',
  'kerry-blue-terrier','lakeland-terrier','manchester-terrier','norfolk-terrier',
  'norwich-terrier','parson-russell-terrier','rat-terrier','sealyham-terrier','skye-terrier',
  'smooth-fox-terrier','welsh-terrier','affenpinscher','english-toy-spaniel','japanese-chin',
  'manchester-terrier-toy','pekingese','silky-terrier','toy-fox-terrier',
  'american-hairless-terrier','lowchen','schipperke','tibetan-spaniel','azawakh','barbet',
  'bracco-italiano','danish-swedish-farmdog','mudi','peruvian-inca-orchid','thai-ridgeback',
  'clumber-spaniel','english-setter','field-spaniel','flat-coated-retriever',
  'irish-water-spaniel','sussex-spaniel','welsh-springer-spaniel','spinone-italiano',
  'bearded-collie','belgian-sheepdog','bouvier-des-flandres','canaan-dog',
  'entlebucher-mountain-dog','finnish-lapphund','icelandic-sheepdog',
  'polish-lowland-sheepdog','puli','pumi','swedish-vallhund','anatolian-shepherd-dog',
  'black-russian-terrier','boerboel','chinook','dogue-de-bordeaux','giant-schnauzer',
  'greater-swiss-mountain-dog','komondor','leonberger','mastiff','neapolitan-mastiff',
  'tibetan-mastiff','american-foxhound','black-and-tan-coonhound','borzoi','cirneco-delletna',
  'english-foxhound','harrier','ibizan-hound','norwegian-elkhound','otterhound','pharaoh-hound',
  'plott-hound','redbone-coonhound','scottish-deerhound','treeing-walker-coonhound',
  'wirehaired-pointing-griffon','cavachon','yorkipoo','sheepadoodle','whoodle','chorkie',
  'chiweenie',
];

const SYSTEM_PROMPT = `You are a dog breed identification expert. Analyze the provided image and respond with ONLY valid JSON (no markdown, no code fences).

Your task:
1. Determine if the image contains a dog.
2. If it does, identify the breed from this exact list of slugs: ${JSON.stringify(BREED_SLUGS)}
3. Estimate your confidence (0-100).
4. If mixed breed or uncertain, provide a secondary breed guess.
5. If NOT a dog, categorize what you see.
6. Write a short, witty one-liner reaction in the voice of "Bernard" - a charming, slightly sarcastic bulldog breed expert with a monocle.
7. For dogs, include one fun fact about the breed.

Response JSON schema:
{
  "category": "dog" | "cat" | "person" | "nature" | "food" | "other_animal" | "object" | "blurry",
  "breed": {
    "name": "Human-readable breed name",
    "slug": "exact-slug-from-the-list",
    "confidence": 0-100,
    "secondaryBreed": { "name": "...", "slug": "...", "confidence": 0-100 } | null
  } | null,
  "pawstonReaction": "A witty Bernard one-liner about what he sees",
  "funFact": "One interesting fact about this breed" | null
}

Rules:
- "breed" must be null if category is not "dog"
- "slug" MUST be from the provided list - pick the closest match
- For mixed breeds, set primary to the dominant breed, secondary to the other
- If the photo is too blurry to identify anything, use category "blurry"
- Keep pawstonReaction under 120 characters
- Keep funFact under 150 characters`;

function stripCodeFences(text: string): string {
  return text.replace(/^\`\`\`(?:json)?\s*\n?/i, '').replace(/\n?\`\`\`\s*$/i, '').trim();
}

function validateScanResult(raw: unknown) {
  if (typeof raw !== 'object' || raw === null) throw new Error('Invalid response: not an object');
  const obj = raw as Record<string, unknown>;
  const category = VALID_CATEGORIES.includes(obj.category as ScanCategory) ? (obj.category as ScanCategory) : 'object';
  const pawstonReaction = typeof obj.pawstonReaction === 'string' && obj.pawstonReaction.length > 0 ? obj.pawstonReaction : "I'm not sure what I'm looking at here.";
  const funFact = typeof obj.funFact === 'string' && obj.funFact.length > 0 ? obj.funFact : null;
  let breed = null;
  if (category === 'dog' && obj.breed && typeof obj.breed === 'object') {
    const b = obj.breed as Record<string, unknown>;
    const name = typeof b.name === 'string' ? b.name : 'Unknown';
    const slug = typeof b.slug === 'string' ? b.slug : 'mixed-breed-medium';
    const confidence = typeof b.confidence === 'number' ? Math.max(0, Math.min(100, Math.round(b.confidence))) : 50;
    let secondaryBreed = null;
    if (b.secondaryBreed && typeof b.secondaryBreed === 'object') {
      const sb = b.secondaryBreed as Record<string, unknown>;
      secondaryBreed = {
        name: typeof sb.name === 'string' ? sb.name : 'Unknown',
        slug: typeof sb.slug === 'string' ? sb.slug : 'mixed-breed-medium',
        confidence: typeof sb.confidence === 'number' ? Math.max(0, Math.min(100, Math.round(sb.confidence))) : 30,
      };
    }
    breed = { name, slug, confidence, secondaryBreed };
  }
  return { category, breed, pawstonReaction, funFact };
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) { rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS }); return true; }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please wait a moment and try again.' }, { status: 429, headers });
    }
    const body = await request.json();
    const { imageBase64, mediaType = 'image/jpeg' } = body;
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json({ error: 'Missing required field: imageBase64' }, { status: 400, headers });
    }
    if (imageBase64.length > 14_000_000) {
      return NextResponse.json({ error: 'Image too large. Please use a smaller image.' }, { status: 413, headers });
    }
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json({ error: 'Service misconfigured. Contact support.' }, { status: 500, headers });
    }
    const client = new Anthropic({ apiKey });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
    try {
      const response = await client.messages.create(
        {
          model: SCAN_MODEL, max_tokens: 512, system: SYSTEM_PROMPT,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp', data: imageBase64 } },
              { type: 'text', text: 'Identify this image. Respond with JSON only.' },
            ],
          }],
        },
        { signal: controller.signal },
      );
      const rawText = response.content[0].type === 'text' ? response.content[0].text : '';
      const cleanText = stripCodeFences(rawText);
      const rawParsed = JSON.parse(cleanText);
      const result = validateScanResult(rawParsed);
      return NextResponse.json(result, { headers });
    } finally { clearTimeout(timeout); }
  } catch (error) {
    console.error('Scan API error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out. Please try again.' }, { status: 504, headers });
    }
    return NextResponse.json({ error: 'Failed to analyze image. Please try again.' }, { status: 500, headers });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
  });
}
