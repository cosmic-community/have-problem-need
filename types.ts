// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// File metafield shape
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Characters
export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    name?: string;
    description?: string;
    consistency_prompt?: string;
    reference_image?: CosmicFile;
  };
}

// Locations
export interface Location extends CosmicObject {
  type: 'locations';
  metadata: {
    name?: string;
    description?: string;
    visual_prompt?: string;
    reference_image?: CosmicFile;
  };
}

// Scenes
export interface Scene extends CosmicObject {
  type: 'scenes';
  metadata: {
    scene_number?: number;
    scene_prompt?: string;
    duration_seconds?: number;
    characters?: Character[];
    location?: Location;
    generated_clip_url?: string;
    preview_image?: CosmicFile;
  };
}

// Video Projects
export interface VideoProject extends CosmicObject {
  type: 'video-projects';
  metadata: {
    master_prompt?: string;
    story?: string;
    target_duration_minutes?: number;
    generation_status?: unknown; // select field - may be string or {key,value}
    scenes?: Scene[];
    cover_image?: CosmicFile;
  };
}

// API response shape
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}