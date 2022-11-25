/** Выбор случайного элемента из массива */
export const pick = (
  /** Элементы для выбора */
  ...a: any[]
) => a[Math.floor(a.length * Math.random())];
