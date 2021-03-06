import React from 'react';


const asyncComponent = getComponent => class AsyncComp extends React.Component {
    static Component = null

    state = { Component: AsyncComp.Component };

    componentWillMount = () => {
      const { Component: c } = this.state;
      if (!c) {
        getComponent().then(({ default: Component }) => {
          AsyncComp.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render = () => {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
};

export default asyncComponent;
