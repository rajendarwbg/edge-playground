import { a, div, h2 } from '../../scripts/dom-helpers.js';

function applyCollapse(text, collapsibleText, readMoreLabel, readLessLabel) {
  text.classList.add('visible-text');
  collapsibleText.classList.add('collapse-text');

  // Check if collapsibleText has content
  const hasContent = collapsibleText && collapsibleText.textContent.trim().length > 0;

  // Hide the collapsible text and "Read Less" initially
  collapsibleText.style.display = 'none';

  // Make readMoreLabel an anchor (add undefined check)
  let readMoreAnchor;
  if (readMoreLabel) {
    readMoreAnchor = a(
      { href: '#', class: 'read-more-button' },
      readMoreLabel.textContent || 'Read More'
    );
    const p = readMoreLabel.querySelector('p');
    if (p) {
      p.replaceWith(readMoreAnchor);
    }
  }

  // Make readLessLabel an anchor (add undefined check)
  let readLessAnchor;
  if (readLessLabel) {
    readLessAnchor = a(
      { href: '#', class: 'read-less-button' },
      readLessLabel.textContent || 'Read Less'
    );
    readLessAnchor.style.display = 'none';
    const p2 = readLessLabel.querySelector('p');
    if (p2) {
      p2.replaceWith(readLessAnchor);
    }
  }

  // Toggle functionality
  if (readMoreAnchor && readLessAnchor) {
    readMoreAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      collapsibleText.style.display = '';
      readMoreAnchor.style.display = 'none';
      readLessAnchor.style.display = '';
    });

    readLessAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      collapsibleText.style.display = 'none';
      readMoreAnchor.style.display = '';
      readLessAnchor.style.display = 'none';
    });
  }

  // Hide read more if no collapsible content
  if (!hasContent && readMoreAnchor && readLessAnchor) {
    readMoreAnchor.style.display = 'none';
    readLessAnchor.style.display = 'none';
  }
}

export default function decorate(block) {
  const [title, text, collapsibleText, readMoreLabel, readLessLabel] = block.children;

  if (title.textContent.trim().length > 0) {
    const collapsibleTextTitle = h2({ class: 'collapsible-text-title' });
    collapsibleTextTitle.textContent = title.textContent?.trim();
    title.replaceWith(collapsibleTextTitle);
  }

  applyCollapse(text, collapsibleText, readMoreLabel, readLessLabel);
}