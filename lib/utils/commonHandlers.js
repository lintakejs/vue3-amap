export function getAmapEditor(editor, create) {
  if (!editor.value) {
    editor.value = create();
  }

  return editor.value;
}