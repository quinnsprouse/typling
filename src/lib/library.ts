export interface SavedPrompt {
  id: string
  title: string
  text: string
  folderId: string | null
}

export interface SavedFolder {
  id: string
  name: string
}

export interface Library {
  folders: SavedFolder[]
  prompts: SavedPrompt[]
}

const STORAGE_KEY = 'typing-app-library'

const EMPTY_LIBRARY: Library = { folders: [], prompts: [] }

export function loadLibrary(): Library {
  if (typeof window === 'undefined') return EMPTY_LIBRARY
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_LIBRARY
    return JSON.parse(raw) as Library
  } catch {
    return EMPTY_LIBRARY
  }
}

function save(library: Library) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library))
}

export function addFolder(library: Library, name: string): Library {
  const next: Library = {
    ...library,
    folders: [
      ...library.folders,
      { id: crypto.randomUUID(), name: name.trim() },
    ],
  }
  save(next)
  return next
}

export function renameFolder(
  library: Library,
  folderId: string,
  name: string
): Library {
  const next: Library = {
    ...library,
    folders: library.folders.map((f) =>
      f.id === folderId ? { ...f, name: name.trim() } : f
    ),
  }
  save(next)
  return next
}

export function deleteFolder(library: Library, folderId: string): Library {
  const next: Library = {
    folders: library.folders.filter((f) => f.id !== folderId),
    prompts: library.prompts.filter((p) => p.folderId !== folderId),
  }
  save(next)
  return next
}

export function addPrompt(
  library: Library,
  title: string,
  text: string,
  folderId: string | null
): Library {
  const next: Library = {
    ...library,
    prompts: [
      ...library.prompts,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        text: text.trim(),
        folderId,
      },
    ],
  }
  save(next)
  return next
}

export function updatePrompt(
  library: Library,
  promptId: string,
  title: string,
  text: string
): Library {
  const next: Library = {
    ...library,
    prompts: library.prompts.map((p) =>
      p.id === promptId ? { ...p, title: title.trim(), text: text.trim() } : p
    ),
  }
  save(next)
  return next
}

export function deletePrompt(library: Library, promptId: string): Library {
  const next: Library = {
    ...library,
    prompts: library.prompts.filter((p) => p.id !== promptId),
  }
  save(next)
  return next
}

export function getFolderPrompts(
  library: Library,
  folderId: string
): SavedPrompt[] {
  return library.prompts.filter((p) => p.folderId === folderId)
}

export function getRootPrompts(library: Library): SavedPrompt[] {
  return library.prompts.filter((p) => p.folderId === null)
}
