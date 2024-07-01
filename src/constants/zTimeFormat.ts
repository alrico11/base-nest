import { z } from 'zod'
import   dayjs from 'dayjs'

export const zTimeFormat = z.string().refine((value) => {
  const pattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  switch (true) {
    case !pattern.test(value): return false
    case !dayjs(value, 'HH:mm').isValid(): return false
    default: return true
  }
}, { message: 'Invalid time format. Expected "hh:mm".' })
