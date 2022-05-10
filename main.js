const input = document.querySelector('#prompt_input');
const submitButton = document.querySelector('#prompt_submit');
const output = document.querySelector('#prompt_output');

let userQuery;
let aiResponses = [];



// sample/working draft request
const data = {
  // more detailed instructions to the API would go here
  "prompt": "Take on me",
  "max_tokens": 20,
  "temperature": 0,
  "n": 1,
  "echo": true,
}


// sample reply based on docs
const sampleReply = {
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-curie-001",
  "choices": [
    {
      "prompt": "Take on me",
      "text": "Take me on",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ]
}
// adding echo, but I don't know the exact format until I test the API

// async function fetchReply(data) {
//   const reply = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
//   },
//   body: JSON.stringify(data),
//   });
//   const aiResponse = await reply.json(); 
//   addResponse(aiResponse);
// }


function displayResponses(aiResponse) {
  aiResponses.unshift(aiResponse);
  const html = aiResponses.map(
    response => `<div class="prompt_and_response"><p class="prompt_label">Prompt:</p>
    <p>${response[0].prompt}</p>
    <p class="response_label">Response:</p>
    <p>${response[0].text}</p></div>`
  )
  output.innerHTML = html.join('');
}

function handleSubmit(e) {
  e.preventDefault();
  let userQuery = e.target.form.prompt_input.value;
  console.log(userQuery);
}

submitButton.addEventListener('click', handleSubmit);

displayResponses(sampleReply.choices);
displayResponses(sampleReply.choices);
displayResponses(sampleReply.choices);

console.log(aiResponses);