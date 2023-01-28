export default async function postTask(title: string, description: string) {
  const postTask = await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      description: description,
      completePercentage: 0,
    })
  });

  return await postTask.json();
}