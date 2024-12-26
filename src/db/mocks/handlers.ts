import { rest, PathParams } from 'msw';

export const handlers = [
  rest.get<PathParams>('/api/categories', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', name: 'Food', isPlaceholder: false },
        { id: '2', name: 'Cat', isPlaceholder: false },
      ])
    )
  })
];
