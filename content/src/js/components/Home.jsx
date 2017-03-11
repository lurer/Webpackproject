import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';


const obj = observable({
  name: 'Espen',
});

const Home = observer(() => <h2>Hello {this.obj.name}</h2>);


export default Home;

