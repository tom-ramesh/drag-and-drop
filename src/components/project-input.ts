import Component from "./base-component";
import * as Validation from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputELement: HTMLInputElement;
  peopleInputELement: HTMLInputElement;
  descriptionInputELement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputELement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.peopleInputELement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.descriptionInputELement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.configure();
  }

  renderContent(): void {}

  private clearInputs() {
    this.titleInputELement.value = "";
    this.descriptionInputELement.value = "";
    this.peopleInputELement.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputELement.value;
    const enteredDescription = this.descriptionInputELement.value;
    const enteredPeople = this.peopleInputELement.value;

    if (
      !Validation.validate({ value: enteredTitle, required: true }) ||
      !Validation.validate({
        value: enteredDescription,
        required: true,
        minLength: 5,
      }) ||
      !Validation.validate({
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      })
    ) {
      alert("Invalid Input, try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
