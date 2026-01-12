import { z } from 'zod'
import { z제목_설명, z링크, z나열, z메뉴 } from './스키마s';
// import { z제목_설명, z버튼, z이미지, z저자, z참여자, z링크, z나열, z메뉴 } from './스키마s';


export default {
  source: 'landing/index.yml',
  type: 'page',
  schema: z.object({
    hero: z.object({
      links: z.array(z링크())
    }),
    section: z제목_설명().extend({
      headline: z.string().optional(),
      images: z.object({
        mobile: z.string().optional(),
        desktop: z.string().optional()
      }),
      features: z.array(
        z제목_설명().extend({
          icon: z.string().editor({ input: 'icon' })
        })
      )
    }),
    features: z제목_설명().extend({
      features: z.array(z메뉴())
    }),
    steps: z제목_설명().extend({
      items: z.array(z메뉴().extend({
        image: z.object({
          light: z.string().editor({ input: 'media' }),
          dark: z.string().editor({ input: 'media' })
        }).optional()
      }))
    }),
    pricing: z제목_설명().extend({
      plans: z.array(
        z제목_설명().extend({
          price: z.string().nonempty(),
          button: z링크(),
          features: z.array(z.string().nonempty()),
          highlight: z.boolean().optional(),
          billing_period: z.string().nonempty(),
          billing_cycle: z.string().nonempty()
        })
      )
    }),
    the_reviews: z제목_설명().extend({
      items: z.array(
        z.object({
          quote: z.string().nonempty(),
          user: z.object({
            name: z.string().nonempty(),
            description: z.string().nonempty(),
            to: z.string().nonempty(),
            avatar: z.object({
              src: z.string().editor({ input: 'media' }),
              alt: z.string().optional()
            }),
            target: z나열(['_blank', '_self'])
          })
        }))
    }),
    cta: z제목_설명().extend({
      links: z.array(z링크())
    })
  })
}