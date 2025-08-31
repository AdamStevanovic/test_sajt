# Papagaj glas – profesionalni demo (Next.js + Vercel)

Frontend (Next.js) poziva tvoj Hugging Face Space preko `@gradio/client`.

## Quick start

1. `npm i`
2. Napravi `.env.local` i postavi:
   ```env
   HF_SPACE=Korisnik/NazivSpacea   # npr. Adam995/parrot_voice
   # HF_TOKEN=hf_xxx               # ako je Space private
   ```
3. `npm run dev` i otvori `http://localhost:3000`

## Deploy na Vercel
- Importuj repo na Vercel → Project Settings → **Environment Variables**:
  - `HF_SPACE` = `Korisnik/NazivSpacea`
  - `HF_TOKEN` = (prazno za public; postavi ako je private)
- Deploy.

## Napomene
- Ovaj frontend očekuje da tvoj Space ima jedan `/predict` endpoint sa inputima:
  `(audio, pitch, speed, remove_hiss)` i da vraća jedan **audio** izlaz.
- Ako u Space-u promeniš redosled ili broj inputa, uskladi `route.ts`.
