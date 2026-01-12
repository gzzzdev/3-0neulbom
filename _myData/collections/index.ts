import { z } from 'zod'


import landing from './landing'

import { z버튼, z이미지, z제목_설명, z저자, z참여자, z링크, z메뉴 } from './스키마s'
const _collections = {
  index: {
    type: 'page',
    source: 'index.yml',
    schema: z.object({
      hero: z.object({
        links: z.array(z버튼()),
        images: z.array(z이미지())
      }),
      about: z제목_설명(),
      experience: z제목_설명().extend({
        items: z.array(z.object({
          date: z.date(),
          position: z.string(),
          company: z.object({
            name: z.string(),
            url: z.string(),
            logo: z.string().editor({ input: 'icon' }),
            color: z.string()
          })
        }))
      }),
      the_reviews: z.array(z참여자()),
      blog: z제목_설명(),
      faq: z제목_설명().extend({
        categories: z.array(
          z.object({
            title: z.string().nonempty(),
            questions: z.array(
              z.object({
                label: z.string().nonempty(),
                content: z.string().nonempty()
              })
            )
          }))
      })
    })
  },
  landing: landing,
  projects: {
    type: 'data',
    source: 'projects/*.yml',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      image: z.string().nonempty().editor({ input: 'media' }),
      url: z.string().nonempty(),
      tags: z.array(z.string()),
      date: z.date()
    })
  },
  pages: {
    type: 'page',
    source: [
      // { include: 'projects.yml' },
      { include: 'trainings1/index.yml' },
      { include: 'trainings2/index.yml' },
      { include: 'blog.yml' }
    ],
    schema: z.object({
      links: z.array(z버튼())
    })
  },
  trainings1: {
    type: 'data',
    source: 'trainings1/list/*.yml',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      image: z.string().nonempty().editor({ input: 'media' }),
      url: z.string().nonempty(),
      tags: z.array(z.string()),
      date: z.date()
    })
  },
  trainings2: {
    type: 'data',
    source: 'trainings2/list/*.yml',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      image: z.string().nonempty().editor({ input: 'media' }),
      url: z.string().nonempty(),
      tags: z.array(z.string()),
      date: z.date()
    })
  },
  blog: {
    type: 'page',
    source: 'blog/*.md',
    schema: z.object({
      minRead: z.number(),
      date: z.date(),
      image: z.string().nonempty().editor({ input: 'media' }),
      author: z저자()
    })
  },
  
  speaking: {
    type: 'page',
    source: 'speaking.yml',
    schema: z.object({
      links: z.array(z버튼()),
      events: z.array(z.object({
        category: z.enum(['Live talk', 'Podcast', 'Conference']),
        title: z.string(),
        date: z.date(),
        location: z.string(),
        url: z.string().optional()
      }))
    })
  },
  about: {
    type: 'page',
    source: 'about.yml',
    schema: z.object({
      content: z.object({}),
      images: z.array(z이미지())
    })
  }
};
export default _collections