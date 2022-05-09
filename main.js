// some fake data


// sample reply from docs

const sampleReply = {
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-curie-001",
  "choices": [
    {
      "text": "\n\nThis is a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ]
}
// add echo. Will have to guess at the key/name of it for testing, but it would be in "choices"


const submitButton = document.querySelector('#prompt_submit');
const input = document.querySelector('#prompt_input');

function handleSubmit(e) {
  e.preventDefault();
  const userQuery = e.target.form.prompt_input.value;
  console.log(userQuery);
}

submitButton.addEventListener('click', handleSubmit);
