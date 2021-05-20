import { Ref } from 'vue'
import { MapEditor } from '../@types/common'

export function getAmapEditor(
  editor: Ref<MapEditor | null>,
  create: (...args: any[]) => MapEditor
) {
  if (!editor.value) {
    editor.value = create()
  }

  return editor.value
}
