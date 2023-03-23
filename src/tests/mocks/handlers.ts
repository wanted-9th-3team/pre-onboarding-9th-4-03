import { rest } from 'msw'

const handlers = [
  rest.get('mock_data.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          transaction_time: '2023-03-08 17:39:50',
          status: true,
          customer_id: 15,
          customer_name: 'Holmes Howard',
          currency: '$5.61',
        },
        {
          id: '2',
          transaction_time: '2023-03-08 06:59:37',
          status: true,
          customer_id: 16,
          customer_name: 'Cynthia Terrell',
          currency: '$10.99',
        },
        {
          id: '3',
          transaction_time: '2023-03-08 06:59:40',
          status: false,
          customer_id: 15,
          customer_name: 'Ann Barron',
          currency: '$10.00',
        },
      ])
    )
  }),
]

export default handlers
