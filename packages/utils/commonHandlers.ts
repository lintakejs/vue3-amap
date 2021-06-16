import { Ref } from 'vue'

export function getAmapEditor(
  editor: Ref<MapEditor | null>,
  create: (...args: any[]) => MapEditor,
) {
  if (!editor.value) {
    editor.value = create()
  }

  return editor.value
}
