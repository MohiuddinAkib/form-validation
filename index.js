import "core-js/fn/map"; // sets up global Map
import "core-js/fn/promise"; // sets up global Promise
import Joi from "joi-browser";
import "bootstrap/dist/css/bootstrap.min.css";
import { form, username, password } from "./DOMElems";
import { showInvalidFeedback, removeInvalidFeedback } from "./utils";

// State
const account = {
  username: "",
  password: ""
};

const schema = Joi.object().keys({
  username: Joi.string()
    .min(2)
    .required()
    .label("Username"),
  password: Joi.string()
    .required()
    .label("Password")
});

username.addEventListener("input", onInputHandler);

password.addEventListener("input", onInputHandler);

form.addEventListener("submit", onSubmitHandler);

// Handles user input
function onInputHandler(e) {
  e.preventDefault();
  account[e.target.name] = e.target.value;
}

// Handles form submission
function onSubmitHandler(e) {
  e.preventDefault();
  const errors = validateInputs();

  if ("username" in errors) {
    showInvalidFeedback(username, errors.username);
  } else {
    removeInvalidFeedback(username);
  }

  if ("password" in errors) {
    showInvalidFeedback(password, errors.password);
  } else {
    removeInvalidFeedback(password);
  }
  if (Object.keys(errors).length === 0) {
    console.log(account);
  }
}

// Validates input fields
function validateInputs() {
  const { error } = Joi.validate(account, schema, { abortEarly: false });
  if (!error) return {};
  const { details } = error;
  //   for (const { path, message } of details) {
  //     const [field] = path;
  //     errors[field] = message;
  //   }

  return details.reduce((acc, { path: [field], message }) => {
    if (!(field in acc)) {
      acc[field] = message;
    }
    return acc;
  }, {});
}
