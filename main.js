
const input = document.querySelector('#prompt_input');
const submitButton = document.querySelector('#prompt_submit');
const output = document.querySelector('#prompt_output');


let userQuery;
let aiResponses = [];


// sample reply
const sampleReply = {
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-curie-001",
  "choices": [
    {
      "text": "\n\nThat grows in the sun\n\nMy petals are soft\n\nAnd they're proudly",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ]
}

async function fetchReply(userQuery) {
  const data = {
    "prompt": `Provide the next line of a song lyric. ${userQuery}`,
    "max_tokens": 42,
    "temperature": 0.9,
  }
  const reply = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
      // the above is most common but inside Vite it will probably be:
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET}`,
    },
    body: JSON.stringify(data),
  });
  const aiResponse = await reply.json(); 
  aiResponse.choices.userQuery = userQuery;
  console.log(aiResponse);
  displayResponses(aiResponse.choices);
}

function displayResponses(aiResponse) {
  aiResponses.unshift(aiResponse);
  const html = aiResponses.map(
    response => `<div class="prompt_and_response"><p class="prompt_label">Prompt:</p>
    <p>${response.userQuery}</p>
    <p class="response_label">Response:</p>
    <p class="newline">${response[0].text}</p></div>`
  )
  output.innerHTML = html.join('');
}

function handleSubmit(e) {
  e.preventDefault();
  let userQuery = e.target.form.prompt_input.value;
  fetchReply(userQuery);
  e.target.form.reset();
}

submitButton.addEventListener('click', handleSubmit);


console.log(aiResponses);