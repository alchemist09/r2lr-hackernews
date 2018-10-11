import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Search } from './index';

describe('Search', () => {

  const props = {
    onChange: () => {},
    onSubmit: () => {}
  }

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search { ...props }>Search</Search>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Search { ...props }>Search</Search>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})