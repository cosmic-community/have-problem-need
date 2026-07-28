import { createBucketClient } from '@cosmicjs/sdk'
import type { VideoProject, Scene, Character, Location } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Safely convert any metafield value to a renderable string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

// Sort scenes by scene_number ascending
export function sortScenes(scenes: Scene[]): Scene[] {
  return [...scenes].sort((a, b) => {
    const numA = Number(a.metadata?.scene_number ?? 0);
    const numB = Number(b.metadata?.scene_number ?? 0);
    return numA - numB;
  });
}

// Sum scene durations in seconds
export function totalSceneSeconds(scenes: Scene[]): number {
  return scenes.reduce((sum, scene) => {
    const seconds = Number(scene.metadata?.duration_seconds ?? 0);
    return sum + (Number.isFinite(seconds) ? seconds : 0);
  }, 0);
}

// Format seconds as m:ss
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export async function getVideoProjects(): Promise<VideoProject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'video-projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    return response.objects as VideoProject[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch video projects');
  }
}

export async function getVideoProject(slug: string): Promise<VideoProject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'video-projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    return (response.object as VideoProject) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch video project');
  }
}

export async function getScenes(): Promise<Scene[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'scenes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return sortScenes(response.objects as Scene[]);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch scenes');
  }
}

export async function getScene(slug: string): Promise<Scene | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'scenes', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return (response.object as Scene) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch scene');
  }
}

export async function getCharacters(): Promise<Character[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'characters' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Character[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch characters');
  }
}

export async function getCharacter(slug: string): Promise<Character | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'characters', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return (response.object as Character) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch character');
  }
}

export async function getLocations(): Promise<Location[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Location[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch locations');
  }
}

export async function getLocation(slug: string): Promise<Location | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'locations', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return (response.object as Location) ?? null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch location');
  }
}