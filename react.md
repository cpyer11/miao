# [React](https://react.dev/) · [![Github license](https://camo.githubusercontent.com/6581c31c16c1b13ddc2efb92e2ad69a93ddc4a92fd871ff15d401c4c6c9155a4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://camo.githubusercontent.com/9b33f253eb1c389ad196feb8b398d00d23fad5de7391fb9bb1f951fd405b62bd/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72656163742e7376673f7374796c653d666c6174)](https://www.npmjs.com/package/react) [![(Runtime)Build and Test](https://github.com/facebook/react/actions/workflows/runtime_build_and_test.yml/badge.svg)](https://github.com/facebook/react/actions/workflows/runtime_build_and_test.yml) [![(Compiler)TypeScript](https://github.com/facebook/react/actions/workflows/compiler_typescript.yml/badge.svg?branch=main)](https://github.com/facebook/react/actions/workflows/compiler_typescript.yml) [![PRs](https://camo.githubusercontent.com/d88d8d77fa79e828eea397f75a1ebd114d13488aeec4747477ffbd2274de95ed/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667)](https://legacy.reactjs.org/docs/how-to-contribute.html#your-first-pull-request)
---
React is a JavaScript library for building user interfaces.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep the state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using [<u>Node</u>](https://nodejs.org/en) and power mobile apps using [<u>React Native</u>](https://reactnative.dev/).

[<u>Learn how to use React in your Project</u>](https://react.dev/learn)

## Installation
---
React has been designed for gradual adoption from the start, and **you can use as little or as much React as you need:**

* Use [<u>Quick Start</u>](https://react.dev/learn) to get a taste of React.

* [<u>Add React to an Existing Project</u>](https://react.dev/learn/add-react-to-an-existing-project) to use as little or as much React as you need.
* [<u>Create a New React App</u>](https://react.dev/learn/start-a-new-react-project) if you're looking for a powerful JavaScript toolchain.
---
## Documentation

You can find the React documentation [<u>on the website.</u>](https://react.dev/)

Check out the [<u>Getting Started</u>](https://react.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [<u>Quick Start</u>](https://react.dev/learn)
* [<u>Tutorial</u>](https://react.dev/learn/tutorial-tic-tac-toe)
* [<u>Thinking in React</u>](https://react.dev/learn/thinking-in-react)
* [<u>Installation</u>](https://react.dev/learn/installation)
* [<u>Describing the UI</u>](https://react.dev/learn/describing-the-ui)
* [<u>Adding Interactivity</u>](https://react.dev/learn/adding-interactivity)
* [<u>Managing State</u>](https://react.dev/learn/managing-state)
* [<u>Advanced Guides</u>](https://react.dev/learn/escape-hatches)
* [<u>API Reference</u>](https://react.dev/reference/react)
* [<u>Where to Get Support</u>](https://react.dev/community)
* [<u>Contributing Guide</u>](https://legacy.reactjs.org/docs/how-to-contribute.html)
* You can improve it by sending pull requests to[<u> this repository.</u>](https://github.com/reactjs/react.dev)
---
## Examples
We have several examples [<u>on the website</u>](https://react.dev/). Here is the first one to get you started:

```
import { createRoot } from 'react-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
```
This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; we [<u>call it JSX</u>](https://react.dev/learn#writing-markup-with-jsx). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML.

---
## Contributing
The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [<u>Code of Conduct</u>](https://opensource.fb.com/code-of-conduct/)
Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [<u>the full text</u>](https://opensource.fb.com/code-of-conduct/) so that you can understand what actions will and will not be tolerated.
### [<u>Contributing Guide</u>](https://legacy.reactjs.org/docs/how-to-contribute.html)
Read our [<u>contributing guide</u>](https://legacy.reactjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.
### [<u>Good First Issues</u>](https://github.com/facebook/react/labels/good%20first%20issue)
To help you get your feet wet and get you familiar with our contribution process, we have a list of [<u>good first issues</u>](https://github.com/facebook/react/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License
React is [<u>MIT licensed</u>](https://github.com/facebook/react/blob/main/LICENSE).