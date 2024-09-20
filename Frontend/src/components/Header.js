import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Header.css";

const TabsContainer = () => {
  return (
    <Tabs className="tabs">
      <TabList>
        <Tab className="tab">React</Tab>
        <Tab className="tab">Angular</Tab>
        <Tab className="tab">Vuejs</Tab>
      </TabList>

      <TabPanel>
        <p>
          A JavaScript library for building user interfaces. React makes it
          painless to create interactive UIs. Design simple views for each state
          in your application, and React will efficiently update and render just
          the right components when your data changes.
        </p>
      </TabPanel>
      <TabPanel>
        <p>
          Angular is a TypeScript-based free and open-source web application
          framework led by the Angular Team at Google and by a community of
          individuals and corporations. Angular is a complete rewrite from the
          same team that built AngularJS.
        </p>
      </TabPanel>
      <TabPanel>
        <p>
          Vue.js is an open-source model–view–viewmodel front end JavaScript
          framework for building user interfaces and single-page applications.
          It was created by Evan You, and is maintained by him and the rest of
          the active core team members
        </p>
      </TabPanel>
    </Tabs>
  );
};

export default TabsContainer;
