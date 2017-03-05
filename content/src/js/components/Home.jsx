import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';


@observer
export default class Home extends React.Component {

  @observable obj = {
    name: 'Espen',
  }

  render() {
    return <h2>Hello {this.obj.name}</h2>;
  }
}
