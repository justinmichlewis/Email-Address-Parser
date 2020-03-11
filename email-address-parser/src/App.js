import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      people: [{ name: "", email: "" }],
      nameChecked: true,
      emailChecked: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = () => {
    console.log("HANDLE SUBMIT");
    if (this.state.input === "") {
      alert("Paste Unformatted Outlook Email Addresses into Textbox");
    } else if (!this.state.emailChecked && !this.state.nameChecked) {
      alert("Select at Least 1 Column to Display");
    } else {
      this.parsePeople(this.state.input);
    }
  };

  handleClick = e => {
    e.target.id === "name"
      ? this.setState({ nameChecked: !this.state.nameChecked })
      : this.setState({ emailChecked: !this.state.emailChecked });
  };

  parsePeople = emails => {
    const emailArr = emails.split(";");

    let output = [];
    console.log("PARSE EMAILS");

    for (let i = 0; i < emailArr.length; i++) {
      //Parse email looking at index of starting < and ending > and taking the substring
      /* console.log("PERSON");
      console.log("- UNFORMATTED: ", emailArr[i]);
      */
      let email = "";
      if (emailArr[i].indexOf("<") === -1) {
        email = emailArr[i];
      } else {
        email = emailArr[i].substring(
          emailArr[i].indexOf("<") + 1,
          emailArr[i].indexOf(">")
        );
      }

      //Parse name, need to account for 4 cases 1) Name is in format last, first 2) first last 3) email 4) blank
      //Take the left characters from < to strip away email
      let name = emailArr[i].substring(0, emailArr[i].indexOf("<"));

      //Check to see case 4, where no name is provided and only an email
      if (emailArr[i].indexOf("<") === -1) {
        name = "NOT AVAILABLE";
      }
      //If theres an index for char , then we know it falls into case 1
      else if (name.indexOf(",") > -1) {
        let fName = name.substring(name.indexOf(",") + 1, name.length).trim();
        let lName = name.substring(0, name.indexOf(",")).trim();

        name = fName.concat(" ", lName);
      } //If theres not an index then we know it falls into  the other 3 cases
      else if (name.indexOf(",") === -1) {
        //Check if the name is just a repeat of the email
        if (name.indexOf("@") > -1) {
          name = "NOT AVAILABLE";
        }
        //Else trim name and assign
        name = name.trim();
      } /*else {
        name = "NOT AVAILABLE";
      }*/
      console.log("- Name: ", name);
      console.log("-------------------");

      output.push({
        name: name,
        email: email
      });
    }
    this.setState({ people: output });
  };

  renderTableHeader = () => {
    if (this.state.emailChecked && this.state.nameChecked) {
      let header = Object.keys(this.state.people[0]);
      return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    } else if (this.state.emailChecked && !this.state.nameChecked) {
      return <th key="1">EMAIL</th>;
    } else if (!this.state.emailChecked && this.state.nameChecked) {
      return <th key="0">NAME</th>;
    } else if (!this.state.emailChecked && !this.state.nameChecked) {
      return;
    }
  };

  renderTableData = () => {
    if (this.state.emailChecked && this.state.nameChecked) {
      return this.state.people.map((person, index) => {
        const { name, email } = person; //destructuring
        return (
          <tr key={index}>
            <td>{name}</td>
            <td>{email}</td>
          </tr>
        );
      });
    } else if (this.state.emailChecked && !this.state.nameChecked) {
      return this.state.people.map((person, index) => {
        const { name, email } = person; //destructuring
        return (
          <tr key={index}>
            <td>{email}</td>
          </tr>
        );
      });
    } else if (!this.state.emailChecked && this.state.nameChecked) {
      return this.state.people.map((person, index) => {
        const { name, email } = person; //destructuring
        return (
          <tr key={index}>
            <td>{name}</td>
          </tr>
        );
      });
    } else if (!this.state.emailChecked && !this.state.nameChecked) {
      return;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Shitty Outlook Email Address Parser</h1>
          <div>
            <div>
              <textarea
                className="email-textarea"
                htmlFor="textarea"
                rows="10"
                cols="100"
                placeholder="Paste Unformatted Outlook Email Addresses Here"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div>
              <button className="myButton" onClick={this.handleSubmit}>
                Parse Emails
              </button>
            </div>
            <div>
              <input
                type="checkbox"
                id="name"
                name="name"
                value="name"
                checked={this.state.nameChecked}
                onClick={this.handleClick}
              />
              <label htmlFor="name">Name </label>
              <input
                type="checkbox"
                id="email"
                name="email"
                value="email"
                checked={this.state.emailChecked}
                onClick={this.handleClick}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <table id="students">
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
