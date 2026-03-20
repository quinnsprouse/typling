import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import {
  type Library,
  type SavedPrompt,
  loadLibrary,
  addFolder,
  renameFolder,
  deleteFolder,
  addPrompt,
  updatePrompt,
  deletePrompt,
  getFolderPrompts,
  getRootPrompts,
} from '@/lib/library'

// ─── Presets ───────────────────────────────────────────────────

const PRESETS: { id: string; title: string; text: string }[] = [
  {
    id: 'pangram-1',
    title: 'pangram',
    text: 'the quick brown fox jumps over the lazy dog',
  },
  {
    id: 'pangram-2',
    title: 'pangram ii',
    text: 'pack my box with five dozen liquor jugs',
  },
  {
    id: 'pangram-3',
    title: 'pangram iii',
    text: 'how vexingly quick daft zebras jump',
  },
  {
    id: 'quote',
    title: 'quote',
    text: 'the only way to do great work is to love what you do',
  },
  {
    id: 'numbers',
    title: 'numbers',
    text: 'flight 370 departed at 12:41 am on march 8 2014',
  },
  {
    id: 'symbols',
    title: 'symbols',
    text: 'email user@host.com & enter $50 (or 25%) today!',
  },
  {
    id: 'code',
    title: 'code',
    text: 'const sum = (a, b) => a + b; // add two numbers',
  },
]

// ─── Types ─────────────────────────────────────────────────────

type InlineForm =
  | null
  | { type: 'new-folder' }
  | { type: 'new-prompt'; folderId: string | null }
  | { type: 'edit-prompt'; prompt: SavedPrompt }
  | { type: 'rename-folder'; folderId: string; currentName: string }

interface SidebarProps {
  open: boolean
  onClose: () => void
  onSelectPrompt: (text: string) => void
  activePrompt: string
}

// ─── Sidebar ───────────────────────────────────────────────────

export function Sidebar({
  open,
  onClose,
  onSelectPrompt,
  activePrompt,
}: SidebarProps) {
  const prefersReducedMotion = useReducedMotion()
  const [library, setLibrary] = useState<Library>(loadLibrary)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [presetsExpanded, setPresetsExpanded] = useState(true)
  const [inlineForm, setInlineForm] = useState<InlineForm>(null)

  useEffect(() => {
    if (open) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          if (inlineForm) {
            setInlineForm(null)
          } else {
            onClose()
          }
        }
      }
      window.addEventListener('keydown', handleEscape, true)
      return () => window.removeEventListener('keydown', handleEscape, true)
    }
  }, [open, onClose, inlineForm])

  function handleSelect(text: string) {
    onSelectPrompt(text)
    onClose()
  }

  function toggleFolder(folderId: string) {
    setExpandedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folderId)) next.delete(folderId)
      else next.add(folderId)
      return next
    })
  }

  // ─── Folder actions ────────────────────────────────────────

  function handleCreateFolder(name: string) {
    if (name.trim().length === 0) return
    const next = addFolder(library, name)
    setLibrary(next)
    setInlineForm(null)
    const created = next.folders[next.folders.length - 1]
    setExpandedFolders((prev) => new Set(prev).add(created.id))
  }

  function handleRenameFolder(folderId: string, name: string) {
    if (name.trim().length === 0) return
    setLibrary(renameFolder(library, folderId, name))
    setInlineForm(null)
  }

  function handleDeleteFolder(folderId: string) {
    setLibrary(deleteFolder(library, folderId))
    setExpandedFolders((prev) => {
      const next = new Set(prev)
      next.delete(folderId)
      return next
    })
  }

  // ─── Prompt actions ────────────────────────────────────────

  function handleCreatePrompt(
    title: string,
    text: string,
    folderId: string | null
  ) {
    if (title.trim().length === 0 || text.trim().length === 0) return
    setLibrary(addPrompt(library, title, text, folderId))
    setInlineForm(null)
  }

  function handleUpdatePrompt(promptId: string, title: string, text: string) {
    if (title.trim().length === 0 || text.trim().length === 0) return
    setLibrary(updatePrompt(library, promptId, title, text))
    setInlineForm(null)
  }

  function handleDeletePrompt(promptId: string) {
    setLibrary(deletePrompt(library, promptId))
  }

  const rootPrompts = getRootPrompts(library)

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={transition}
            className="fixed inset-0 z-40 bg-foreground/5 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={prefersReducedMotion ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? undefined : { x: '-100%' }}
            transition={transition}
            className="fixed left-0 top-0 bottom-0 z-50 w-[360px] border-r bg-background overflow-y-auto"
            role="dialog"
            aria-label="Library"
          >
            <div className="flex flex-col p-5 pt-7">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  library
                </h2>
                <button
                  onClick={onClose}
                  className="h-8 px-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-[color] duration-150 ease"
                  aria-label="Close sidebar"
                >
                  close
                </button>
              </div>

              {/* ─── Presets section ─── */}
              <FolderHeader
                name="presets"
                count={PRESETS.length}
                isExpanded={presetsExpanded}
                onToggle={() => setPresetsExpanded((p) => !p)}
              />
              {presetsExpanded && (
                <div className="flex flex-col mb-2">
                  {PRESETS.map((p) => (
                    <PromptRow
                      key={p.id}
                      title={p.title}
                      text={p.text}
                      isActive={activePrompt === p.text}
                      onSelect={() => handleSelect(p.text)}
                    />
                  ))}
                </div>
              )}

              {/* ─── User folders ─── */}
              {library.folders.map((folder) => {
                const folderPrompts = getFolderPrompts(library, folder.id)
                const isExpanded = expandedFolders.has(folder.id)
                const isRenaming =
                  inlineForm?.type === 'rename-folder' &&
                  inlineForm.folderId === folder.id
                const isAddingHere =
                  inlineForm?.type === 'new-prompt' &&
                  inlineForm.folderId === folder.id

                return (
                  <div key={folder.id}>
                    {isRenaming ? (
                      <InlineTextInput
                        defaultValue={inlineForm.currentName}
                        placeholder="folder name..."
                        onSubmit={(name) => handleRenameFolder(folder.id, name)}
                        onCancel={() => setInlineForm(null)}
                      />
                    ) : (
                      <FolderHeader
                        name={folder.name}
                        count={folderPrompts.length}
                        isExpanded={isExpanded}
                        onToggle={() => toggleFolder(folder.id)}
                        onAdd={() => {
                          if (!isExpanded) toggleFolder(folder.id)
                          setInlineForm({
                            type: 'new-prompt',
                            folderId: folder.id,
                          })
                        }}
                        onRename={() =>
                          setInlineForm({
                            type: 'rename-folder',
                            folderId: folder.id,
                            currentName: folder.name,
                          })
                        }
                        onDelete={() => handleDeleteFolder(folder.id)}
                      />
                    )}

                    {isExpanded && (
                      <div className="flex flex-col mb-2">
                        {folderPrompts.map((p) =>
                          inlineForm?.type === 'edit-prompt' &&
                          inlineForm.prompt.id === p.id ? (
                            <InlinePromptForm
                              key={p.id}
                              defaultTitle={p.title}
                              defaultText={p.text}
                              onSubmit={(title, text) =>
                                handleUpdatePrompt(p.id, title, text)
                              }
                              onCancel={() => setInlineForm(null)}
                            />
                          ) : (
                            <PromptRow
                              key={p.id}
                              title={p.title}
                              text={p.text}
                              isActive={activePrompt === p.text}
                              onSelect={() => handleSelect(p.text)}
                              onEdit={() =>
                                setInlineForm({
                                  type: 'edit-prompt',
                                  prompt: p,
                                })
                              }
                              onDelete={() => handleDeletePrompt(p.id)}
                            />
                          )
                        )}

                        {isAddingHere ? (
                          <InlinePromptForm
                            onSubmit={(title, text) =>
                              handleCreatePrompt(title, text, folder.id)
                            }
                            onCancel={() => setInlineForm(null)}
                          />
                        ) : (
                          folderPrompts.length === 0 &&
                          !isAddingHere && (
                            <button
                              onClick={() =>
                                setInlineForm({
                                  type: 'new-prompt',
                                  folderId: folder.id,
                                })
                              }
                              className="px-4 py-2 text-left text-[11px] text-muted-foreground/40 hover:text-muted-foreground transition-[color] duration-100 ease"
                            >
                              + add first item
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* ─── Root-level prompts ─── */}
              {rootPrompts.map((p) =>
                inlineForm?.type === 'edit-prompt' &&
                inlineForm.prompt.id === p.id ? (
                  <InlinePromptForm
                    key={p.id}
                    defaultTitle={p.title}
                    defaultText={p.text}
                    onSubmit={(title, text) =>
                      handleUpdatePrompt(p.id, title, text)
                    }
                    onCancel={() => setInlineForm(null)}
                  />
                ) : (
                  <PromptRow
                    key={p.id}
                    title={p.title}
                    text={p.text}
                    isActive={activePrompt === p.text}
                    onSelect={() => handleSelect(p.text)}
                    onEdit={() =>
                      setInlineForm({ type: 'edit-prompt', prompt: p })
                    }
                    onDelete={() => handleDeletePrompt(p.id)}
                  />
                )
              )}

              {/* ─── New folder inline ─── */}
              {inlineForm?.type === 'new-folder' && (
                <InlineTextInput
                  placeholder="folder name..."
                  onSubmit={handleCreateFolder}
                  onCancel={() => setInlineForm(null)}
                />
              )}

              {/* ─── Bottom actions ─── */}
              <div className="flex flex-col gap-0.5 mt-4 pt-4 border-t border-border/60">
                <button
                  onClick={() => setInlineForm({ type: 'new-folder' })}
                  className="flex items-center gap-2 rounded-md px-3 h-9 text-[11px] text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03] transition-[background-color,color] duration-100 ease-out"
                >
                  + new folder
                </button>

                {inlineForm?.type === 'new-prompt' &&
                inlineForm.folderId === null ? (
                  <InlinePromptForm
                    onSubmit={(title, text) =>
                      handleCreatePrompt(title, text, null)
                    }
                    onCancel={() => setInlineForm(null)}
                  />
                ) : (
                  <button
                    onClick={() =>
                      setInlineForm({ type: 'new-prompt', folderId: null })
                    }
                    className="flex items-center gap-2 rounded-md px-3 h-9 text-[11px] text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03] transition-[background-color,color] duration-100 ease-out"
                  >
                    + new item
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Folder header ─────────────────────────────────────────────

function FolderHeader({
  name,
  count,
  isExpanded,
  onToggle,
  onAdd,
  onRename,
  onDelete,
}: {
  name: string
  count: number
  isExpanded: boolean
  onToggle: () => void
  onAdd?: () => void
  onRename?: () => void
  onDelete?: () => void
}) {
  return (
    <div className="group flex items-center h-9">
      <button
        onClick={onToggle}
        className="flex-1 flex items-center gap-2 h-full px-3 rounded-md text-left hover:bg-foreground/[0.03] transition-[background-color] duration-100 ease-out"
      >
        <span
          className={cn(
            'text-[8px] text-muted-foreground transition-transform duration-100',
            isExpanded && 'rotate-90'
          )}
          aria-hidden="true"
        >
          ▶
        </span>
        <span className="flex-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          {name}
        </span>
        <span className="text-[10px] text-muted-foreground/40 tabular-nums">
          {count}
        </span>
      </button>

      {(onAdd ?? onRename ?? onDelete) && (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          {onAdd && (
            <button
              onClick={onAdd}
              className="h-7 w-7 flex items-center justify-center rounded text-[13px] text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.05] transition-[background-color,color] duration-100 ease"
              aria-label={`Add item to ${name}`}
            >
              +
            </button>
          )}
          {onRename && (
            <button
              onClick={onRename}
              className="h-7 w-7 flex items-center justify-center rounded text-[10px] text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.05] transition-[background-color,color] duration-100 ease"
              aria-label={`Rename ${name}`}
              title="Rename"
            >
              ✎
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="h-7 w-7 flex items-center justify-center rounded text-[12px] text-muted-foreground/50 hover:text-destructive hover:bg-foreground/[0.05] transition-[background-color,color] duration-100 ease"
              aria-label={`Delete ${name}`}
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Prompt row ────────────────────────────────────────────────

function PromptRow({
  title,
  text,
  isActive,
  onSelect,
  onEdit,
  onDelete,
}: {
  title: string
  text: string
  isActive: boolean
  onSelect: () => void
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <div className="group flex items-center">
      <button
        onClick={onSelect}
        className={cn(
          'flex-1 flex flex-col gap-0.5 rounded-md px-4 py-2 text-left min-h-[44px] justify-center',
          'transition-[background-color,color] duration-100 ease-out',
          isActive
            ? 'bg-foreground/[0.06] text-foreground'
            : 'text-foreground/70 hover:bg-foreground/[0.03] hover:text-foreground'
        )}
      >
        <span className="text-[12px] leading-tight">{title}</span>
        <span className="text-[11px] leading-tight text-muted-foreground/50 line-clamp-1">
          {text}
        </span>
      </button>

      {(onEdit ?? onDelete) && (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 pr-1">
          {onEdit && (
            <button
              onClick={onEdit}
              className="h-7 w-7 flex items-center justify-center rounded text-[10px] text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.05] transition-[background-color,color] duration-100 ease"
              aria-label={`Edit ${title}`}
              title="Edit"
            >
              ✎
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="h-7 w-7 flex items-center justify-center rounded text-[12px] text-muted-foreground/50 hover:text-destructive hover:bg-foreground/[0.05] transition-[background-color,color] duration-100 ease"
              aria-label={`Delete ${title}`}
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Inline text input (folder name) ───────────────────────────

function InlineTextInput({
  defaultValue = '',
  placeholder,
  onSubmit,
  onCancel,
}: {
  defaultValue?: string
  placeholder: string
  onSubmit: (value: string) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
      }}
      className="flex items-center h-9 px-3 gap-2"
    >
      <span className="text-[8px] text-muted-foreground" aria-hidden="true">
        ▶
      </span>
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Escape') onCancel()
        }}
        onKeyUp={(e) => e.stopPropagation()}
        onBlur={() => {
          if (value.trim().length === 0) onCancel()
        }}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        className="flex-1 bg-transparent text-[11px] uppercase tracking-[0.15em] text-foreground placeholder:text-muted-foreground/30 focus:outline-none border-b border-foreground/15 pb-0.5"
      />
    </form>
  )
}

// ─── Inline prompt form (create / edit) ────────────────────────

function InlinePromptForm({
  defaultTitle = '',
  defaultText = '',
  onSubmit,
  onCancel,
}: {
  defaultTitle?: string
  defaultText?: string
  onSubmit: (title: string, text: string) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(defaultTitle)
  const [text, setText] = useState(defaultText)

  function handleSubmit() {
    if (title.trim().length > 0 && text.trim().length > 0) {
      onSubmit(title, text)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    e.stopPropagation()
    if (e.key === 'Escape') onCancel()
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="mx-2 my-1 rounded-lg border bg-foreground/[0.02] p-3 flex flex-col gap-2">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => e.stopPropagation()}
        placeholder="title"
        spellCheck={false}
        autoComplete="off"
        className="bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => e.stopPropagation()}
        placeholder="text to practice..."
        spellCheck={false}
        autoComplete="off"
        className="bg-transparent text-[12px] leading-relaxed text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none resize-none min-h-[60px]"
      />
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-muted-foreground/30">⌘↵ to save</span>
        <div className="flex gap-1">
          <button
            onClick={onCancel}
            className="h-7 px-2.5 rounded text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-[color] duration-100 ease"
          >
            cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={title.trim().length === 0 || text.trim().length === 0}
            className={cn(
              'h-7 px-2.5 rounded text-[10px] uppercase tracking-[0.1em]',
              'bg-foreground text-background',
              'disabled:opacity-30 disabled:cursor-not-allowed',
              'hover:not-disabled:opacity-80',
              'transition-opacity duration-100 ease-out'
            )}
          >
            save
          </button>
        </div>
      </div>
    </div>
  )
}
