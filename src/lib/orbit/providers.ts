export type Provider = {
  id: string;
  name: string;
  url: string;
  host: string;
  base: string;
  model: string;
  steps: [string, string, string];
};

export const PROVIDERS: Provider[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    url: "https://aistudio.google.com/apikey",
    host: "aistudio.google.com",
    base: "https://generativelanguage.googleapis.com/v1beta/openai",
    model: "gemini-2.5-flash",
    steps: ["Sign in with your Google account.", "Tap Create API key.", "Copy the key and paste it here."],
  },
  {
    id: "groq",
    name: "Groq",
    url: "https://console.groq.com/keys",
    host: "console.groq.com",
    base: "https://api.groq.com/openai/v1",
    model: "llama-3.3-70b-versatile",
    steps: ["Create or sign in to a Groq account.", "Open API Keys and tap Create API Key.", "Copy the key shown once."],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    url: "https://openrouter.ai/keys",
    host: "openrouter.ai",
    base: "https://openrouter.ai/api/v1",
    model: "meta-llama/llama-3.3-70b-instruct:free",
    steps: ["Sign in to OpenRouter.", "Tap Create Key.", "Copy it, then keep a model that ends in :free."],
  },
  {
    id: "mistral",
    name: "Mistral",
    url: "https://console.mistral.ai/api-keys",
    host: "console.mistral.ai",
    base: "https://api.mistral.ai/v1",
    model: "mistral-small-latest",
    steps: ["Sign in to La Plateforme.", "Open API keys and tap Create new key.", "Copy the key."],
  },
  {
    id: "cerebras",
    name: "Cerebras",
    url: "https://cloud.cerebras.ai",
    host: "cloud.cerebras.ai",
    base: "https://api.cerebras.ai/v1",
    model: "llama-3.3-70b",
    steps: ["Sign in to Cerebras Cloud.", "Open API Keys.", "Generate and copy a key."],
  },
  {
    id: "github",
    name: "GitHub Models",
    url: "https://github.com/settings/personal-access-tokens",
    host: "github.com",
    base: "https://models.github.ai/inference",
    model: "openai/gpt-4.1-mini",
    steps: ["Sign in to GitHub.", "Create a fine-grained token with Models access.", "Copy the token."],
  },
  {
    id: "nvidia",
    name: "NVIDIA NIM",
    url: "https://build.nvidia.com",
    host: "build.nvidia.com",
    base: "https://integrate.api.nvidia.com/v1",
    model: "meta/llama-3.1-70b-instruct",
    steps: ["Sign in to build.nvidia.com.", "Open a model and tap Get API Key.", "Copy the key."],
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    url: "https://huggingface.co/settings/tokens",
    host: "huggingface.co",
    base: "https://router.huggingface.co/v1",
    model: "meta-llama/Llama-3.3-70B-Instruct",
    steps: ["Sign in to Hugging Face.", "Create a token with inference permission.", "Copy the token."],
  },
];

export const PROVIDER_BASES = new Set(PROVIDERS.map((p) => p.base));

export function providerById(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}
