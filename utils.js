// Shows the invalid feedback
export function showInvalidFeedback(inputField, errorMessage) {
  const parentNode = inputField.parentElement;
  // Create a div with invalid-feedback class
  const div = document.createElement("div");
  div.className = "invalid-feedback";
  // Create text of error
  const text = document.createTextNode(errorMessage);
  // Append the text inside that div
  div.appendChild(text);
  //   Add invalid class to the input field
  inputField.classList.add("is-invalid");
  // Append the invalid feedback to the input field's parent
  //   parentNode.appendChild(div);
  inputField.nextElementSibling.textContent = errorMessage;
}

// Removes invalid feedback
export function removeInvalidFeedback(inputField) {
  //   Remove invalid class to the input field
  inputField.classList.remove("is-invalid");
  inputField.nextElementSibling.textContent = "";
}
