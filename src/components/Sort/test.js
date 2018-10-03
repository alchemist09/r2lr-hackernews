import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Sort } from './index';

describe('Sort', () => {

  it('renders sort component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sort>Sort Column</Sort>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Sort>Sort Column</Sort>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});