
const input = document.querySelector('#prompt_input');
const submitButton = document.querySelector('#prompt_submit');
const output = document.querySelector('#prompt_output');


// let userQuery;
// static for testing
let userQuery = "I'm a little teapot";
let aiResponses = [];


// sample reply based on docs
const sampleReply = {
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-curie-001",
  "choices": [
    {
      "text": "Take me on",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ]
}

// this part works
// async function fetchReply(userQuery) {
//   const data = {
//     "prompt": `Provide the next line of a song lyric. ${userQuery}`,
//     "max_tokens": 42,
//     "temperature": 0.9,
//   }
//   const reply = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
//       // the above is most common but inside Vite it will probably be:
//       Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET}`,
//     },
//     body: JSON.stringify(data),
//   });
//   const aiResponse = await reply.json(); 
//   console.log(aiResponse);
//   displayResponses(aiResponse.choices, userQuery);
// }

// I need to add userQuery to the saved object
function displayResponses(aiResponse, userQuery) {
  aiResponses.unshift(aiResponse);
  const html = aiResponses.map(
    response => `<div class="prompt_and_response"><p class="prompt_label">Prompt:</p>
    <p>${userQuery}</p>
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
;

// example text reply I'm getting 
// "\n\nThat grows in the sun\n\nMy petals are soft\n\nAnd they're proudly"

displayResponses(sampleReply.choices, userQuery);
console.log(aiResponses);