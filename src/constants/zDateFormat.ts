import { z } from 'zod'
import   dayjs from 'dayjs'

export const zDateFormat = z.string().refine((value) => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  switch (true) {
    case !pattern.test(value): return false
    case !dayjs(value, 'YYYY-MM-DD').isValid(): return false
    default: return true
  }
}, { message: 'Invalid date format. Expected "yyyy-mm-dd".' })