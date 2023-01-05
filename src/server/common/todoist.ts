import { POSSIBLE_DAY_STEPS_WORDNUMBERS } from '@/lib/const'

const UNSAFE_ELEMENTS = ['ev', 'every', 'day', '', 'and']

export const cleanseRecurrenceString = (humanString: string) => {
  return humanString
    .toLowerCase()
    .trim()
    .split(/[, ]/)
    .filter((el) => !UNSAFE_ELEMENTS.includes(el))
}

export const containsWordNumbers = (
  safeEl: ReturnType<typeof cleanseRecurrenceString>
) => {
  return safeEl.some((el) => POSSIBLE_DAY_STEPS_WORDNUMBERS.includes(el))
}
