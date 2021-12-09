import { document } from "../utils/dynamodbClient"

interface ICreateTodo {
  title: string
  deadline: string
}

export const handle = async event => {
  const { user_id } = event.pathParameters
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo

  const newTodo = {
    id: "aaaddd",
    user_id,
    title,
    done: false,
    deadline,
  }

  await document
    .put({
      TableName: "users_todos",
      Item: newTodo,
    })
    .promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate created!",
      todo: newTodo,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }
}
