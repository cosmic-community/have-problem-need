# Long-Form AI Video Studio

![App Preview](https://imgix.cosmicjs.com/5abd9890-8a69-11f1-a539-158ba0e078f0-autopilot-photo-1536440136628-849c177e76a1-1785232052368.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A production pipeline dashboard that solves the AI video length problem. Since AI video tools can only generate 6–15 second clips, this app manages the workflow of splitting one master prompt and story into many short scenes — with consistent characters and locations — that can be stitched into videos up to 10 minutes long. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🎬 **Video Projects dashboard** with master prompts, stories, target durations, and generation status
- 🎞️ **Ordered scene timeline** showing each short clip's prompt, duration, and preview
- ⏱️ **Automatic runtime totals** — sums per-scene seconds so you can track progress toward 10 minutes
- 👤 **Character library** with consistency prompts to keep the same character across every clip
- 📍 **Location library** with visual prompts for consistent settings
- 🔗 **Connected content** — scenes link characters and locations via Cosmic object relationships
- 📱 Fully responsive, dark cinematic design
- ⚡ Server components, strict TypeScript, and pre-build type checking

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a687a53f5196dac661fb595&clone_repository=6a687ba3f5196dac661fb5dc)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: i have a problem we need to solve this the problem is the ai video generation there is a certain limit for 15 seconds 6 and 8 seconds video generation ai only i need to create a video generator ai upto 10 minites by using the single prompt and story and character and locations how can i create it and se it with free"

### Code Generation Prompt

> Build a Next.js application for a website called "Have problem need". The content is managed in Cosmic CMS with the following object types: video-projects, scenes, characters, locations. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router, React Server Components
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for all content
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [TypeScript](https://www.typescriptlang.org/) — Strict typing throughout
- [Bun](https://bun.sh/) — Package manager and runtime

## Getting Started

### Prerequisites

- Bun installed (or Node.js 18+)
- A Cosmic account and bucket with the video-projects, scenes, characters, and locations object types

### Installation

1. Install dependencies:

```bash
bun install
```

2. Set environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)

3. Run the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

Fetch all video projects with connected scenes (depth 2 resolves scenes plus their characters and locations):

```typescript
const response = await cosmic.objects
  .find({ type: 'video-projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(2)
```

Fetch scenes sorted manually by scene number:

```typescript
const response = await cosmic.objects
  .find({ type: 'scenes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const scenes = response.objects.sort((a, b) => {
  const numA = Number(a.metadata?.scene_number ?? 0)
  const numB = Number(b.metadata?.scene_number ?? 0)
  return numA - numB
})
```

## Cosmic CMS Integration

This app uses four connected object types:

- **video-projects** — the master container: single prompt, full story, target duration, status, and connected scenes
- **scenes** — the short 6–8 second clips: scene prompt, duration, connected characters, and a connected location
- **characters** — reusable consistency assets with a consistency prompt and reference image
- **locations** — reusable settings with a visual prompt and reference image

Scenes connect to characters and locations via object metafields, resolved with the `depth` parameter. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (recommended)

1. Push this repository to GitHub
2. Import it into [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push to GitHub and import into Netlify
2. Build command: `bun run build`, publish directory: `.next`
3. Add the same environment variables in Site Settings

<!-- README_END -->