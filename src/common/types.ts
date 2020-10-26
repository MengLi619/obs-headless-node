import { SourceType } from 'obs-node';

export interface Scene {
  id: string;
  name: string;
  sources: Source[];
}

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  url: string;
  previewUrl: string;
}
