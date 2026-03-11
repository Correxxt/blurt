import { SessionFolder } from '../types/folder';
import { authService } from './authService';
import { getSupabaseClient } from './supabaseClient';

type FolderRow = {
  id: string;
  user_id: string;
  name: string;
  created_at_ms: number;
};

const toFolder = (row: FolderRow): SessionFolder => ({
  id: row.id,
  name: row.name,
  createdAtMs: row.created_at_ms,
});

const toRow = (folder: SessionFolder, userId: string): FolderRow => ({
  id: folder.id,
  user_id: userId,
  name: folder.name,
  created_at_ms: folder.createdAtMs,
});

const requireUserId = async (): Promise<string> => {
  const user = await authService.getCurrentUser();
  if (!user) {
    throw new Error('Not authenticated.');
  }
  return user.id;
};

export const folderStoreCloud = {
  async list(): Promise<SessionFolder[]> {
    const supabase = getSupabaseClient();
    const userId = await requireUserId();
    const { data, error } = await supabase.from('folders').select('*').eq('user_id', userId).order('name', { ascending: true });
    if (error) {
      throw error;
    }
    return (data ?? []).map((row) => toFolder(row as FolderRow));
  },

  async save(folder: SessionFolder): Promise<void> {
    const supabase = getSupabaseClient();
    const userId = await requireUserId();
    const { error } = await supabase.from('folders').upsert(toRow(folder, userId), { onConflict: 'id' });
    if (error) {
      throw error;
    }
  },

  async remove(id: string): Promise<void> {
    const supabase = getSupabaseClient();
    const userId = await requireUserId();
    const { error } = await supabase.from('folders').delete().eq('user_id', userId).eq('id', id);
    if (error) {
      throw error;
    }
  },
};
