// The Great Dreamer: React in a .jsx file (source.js.jsx)
import React, { Component, Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// One-line component
const Rune = (props) => <li className="rune">{props.glyph.name}</li>;

// Component with no logic outside JSX
const RuneList = ({ glyphs }) => (
  <ul className="rune-list">
    {glyphs.map((glyph) => (
      <Rune key={glyph.id} glyph={glyph} />
    ))}
  </ul>
);

// Hooks, conditional rendering and fragments
function Grimoire({ title, glyphs = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1 data-depth={47}>{title}</h1>
      <button type="button" onClick={() => setOpen(!open)} disabled={!glyphs.length}>
        {open ? 'Close the book' : 'Read aloud'}
      </button>
      {open && <RuneList glyphs={glyphs} />}
    </>
  );
}

Grimoire.propTypes = {
  title: PropTypes.string.isRequired,
  glyphs: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
};

// Class component
export default class Library extends Component {
  state = { total: 0, next: null };

  handleClick = (name) => {
    this.setState(({ total }) => ({ total: total + 1, next: name }));
  };

  render() {
    const { total, next } = this.state;
    return (
      <Fragment>
        <Grimoire title="Necronomicon" glyphs={[{ id: 1, name: 'Elder Sign' }]} />
        <p className="status">
          Read {total} times, next: {next || 'nothing'} &mdash; Miskatonic
        </p>
        <input value={next ?? ''} onChange={(e) => this.handleClick(e.target.value)} />
      </Fragment>
    );
  }
}
