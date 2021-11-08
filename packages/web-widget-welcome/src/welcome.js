import React, { useState } from "react";
import "./welcome.css";

export default function Root(props) {
  const isUsingWebWidgetLayout = useState(() => {
    // Search the dom for a web-widget-router element
    // While this won't work for SSR, the goal of this app is to help
    // beginners, which likely won't use SSR before running their
    // first root-config.
    const templates = Array.from(document.querySelectorAll("template"));

    return templates.some((template) => {
      const hasWebWidgetRouter =
        !!template.content.querySelector("web-widget-router");
      return hasWebWidgetRouter;
    });
  })[0];

  return (
    <section id="web-widget-welcome">
      <div className="banner">
        <img
          className="logo"
          src="https://web-widget.js.org/img/logo-white-bgblue.svg"
          alt=""
        />
        <div>
          <h2 style={{ marginBottom: 0 }}>
            Welcome{" "}
            <span style={{ display: "block", fontSize: "1rem" }}>
              to your web-widget root config!{" "}
              <span role="img" aria-label="Congrats!">
                🥳
              </span>
            </span>
          </h2>
        </div>
      </div>
      <p>
        This page is being rendered by an example web-widget application that is
        being imported by your root config.
      </p>
      <h2 id="next-steps">Next steps</h2>
      <h3>1. Add shared dependencies</h3>
      <ul>
        <li>
          Locate the import map in <code>src/index.ejs</code>
        </li>
        <li>
          <p>
            Add an entry for modules that will be shared across your
            dependencies. For example, a React application generated with
            create-web-widget will need to add React and ReactDOM to the import
            map.
          </p>
          <pre>
            <code>{`"react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js",
"react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js"`}</code>
          </pre>
        </li>
      </ul>
      <p>
        Refer to the corresponding{" "}
        <a href="https://web-widget.js.org/docs/ecosystem/#help-for-frameworks">
          web-widget framework helpers
        </a>{" "}
        for more specific information.
      </p>
      <h3>2. Create your next web-widget application</h3>
      <ul>
        <li>
          Generate a web-widget application with create-web-widget and follow
          the prompts until it is running locally
        </li>
        <li>
          Return to the root-config and update the import map in{" "}
          <code>src/index.ejs</code> with your project's name
          <aside>
            It's recommended to use the application's package.json name field
          </aside>
        </li>
        {isUsingWebWidgetLayout ? (
          <>
            <li>
              Locate the{" "}
              <code>
                &lt;application
                name="@web-widget/welcome"&gt;&lt;/application&gt;
              </code>{" "}
              element and remove it
            </li>
            <li>
              Using the name of your new application, add your own{" "}
              <code>&lt;application name=""&gt;&lt;/application&gt;</code>{" "}
              element to the web-widget layout
            </li>
          </>
        ) : (
          <>
            <li>
              Open <code>src/root-config.js</code> and remove the code for
              registering this application
            </li>
            <li>
              Uncomment the <code>registerApplication</code> code and update it
              with your new application's name
            </li>
          </>
        )}
      </ul>
      <p>
        After this, you should no longer see this welcome page but should
        instead see your new application!
      </p>
      <h2 id="learn-more">Learn more</h2>
      <ul>
        <li>
          <a href="https://web-widget.js.org/docs/recommended-setup/#shared-dependencies">
            Shared dependencies documentation on web-widget.js.org
          </a>
        </li>
        <li>
          <a href="https://github.com/systemjs/systemjs/">SystemJS</a> and{" "}
          <a href="https://github.com/systemjs/systemjs/blob/master/docs/import-maps.md">
            Import Maps
          </a>
        </li>
        <li>
          <a href="https://web-widget.js.org/docs/ecosystem/">
            Single-spa ecosystem
          </a>
        </li>
      </ul>
      <h2 id="contribute">Contribute</h2>
      <ul>
        <li>
          <a href="https://opencollective.com/web-widget">
            Support web-widget by donating on OpenCollective!
          </a>
        </li>
        <li>
          Contribute to{" "}
          <a href="https://github.com/web-widget/web-widget">
            web-widget on GitHub
          </a>
          !
        </li>
        <li>
          Join the Slack group to engage in discussions and ask questions.
        </li>
        <li>
          Tweet <a href="https://twitter.com/Single_spa">@Single_spa</a> and
          show off the awesome work you've done!
        </li>
      </ul>
    </section>
  );
}
