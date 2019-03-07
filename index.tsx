import { updateElement, h } from './lib';

// ---------------------------------------------------------------------

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const b = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);

const main = () => {
  const $root = document.getElementById('root');
  const $reload = document.getElementById('reload');

  if (!$root) {
    console.error('root not found');
    return;
  }
  updateElement($root, a);

  if (!$reload) {
    console.error('reload not found');
    return;
  }

  $reload.addEventListener('click', () => {
    updateElement($root, b, a);
  });
};

main();
