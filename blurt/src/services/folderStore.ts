import { BaseDirectory } from '@tauri-apps/api/path';
import { readTextFile, remove, writeTextFile } from '@tauri-apps/plugin-fs';
import { SessionFolder } from '../types/folder';

const FOLDER_FILE = 'folders.json';
const FOLDER_TMP_FILE = 'folders.json.tmp';

type FolderFileSchema = {
  folders: SessionFolder[];
};

const writeFoldersAtomically = async (folders: SessionFolder[]) => {
  const payload = JSON.stringify({ folders }, null, 2);
  await writeTextFile(FOLDER_TMP_FILE, payload, { baseDir: BaseDirectory.AppData });
  await writeTextFile(FOLDER_FILE, payload, { baseDir: BaseDirectory.AppData });
  try {
    await remove(FOLDER_TMP_FILE, { baseDir: BaseDirectory.AppData });
  } catch {
    // tmp cleanup is best-effort
  }
};

const readFoldersSchema = async (): Promise<FolderFileSchema> => {
  try {
    const content = await readTextFile(FOLDER_FILE, { baseDir: BaseDirectory.AppData });
    const parsed = JSON.parse(content) as Partial<FolderFileSchema>;
    return {
      folders: (parsed.folders ?? [])
        .filter((folder) => Boolean(folder?.id))
        .map((folder) => ({
          id: folder.id!,
          name: folder.name?.trim() || 'Untitled Folder',
          createdAtMs: folder.createdAtMs ?? Date.now(),
        })),
    };
  } catch {
    return { folders: [] };
  }
};

export const folderStore = {
  async list(): Promise<SessionFolder[]> {
    const data = await readFoldersSchema();
    return [...data.folders].sort((a, b) => a.name.localeCompare(b.name));
  },

  async save(folder: SessionFolder): Promise<void> {
    const data = await readFoldersSchema();
    const next = data.folders.filter((item) => item.id !== folder.id);
    next.push(folder);
    await writeFoldersAtomically(next);
  },

  async remove(id: string): Promise<void> {
    const data = await readFoldersSchema();
    const next = data.folders.filter((item) => item.id !== id);
    await writeFoldersAtomically(next);
  },
};
