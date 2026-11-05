// Only the Avatar of the game's ui.js (public/js/ui.js in the Disputt repo): the story of the rules draws the players with it.
import { AVATARS } from '../shared/avatars.mjs';
import { t } from './i18n/lang.js';
import { html } from './vendor/htm-preact.js';
import { asset } from './paths.js';

const cx = (...c) => c.filter(Boolean).join(' ');
export const avatarOf = (id) => AVATARS.find((a) => a.id === id);

export function Avatar({ id, size = 'md', alive = false, offline = false, crown = false, badge = null, label, class: cls, style }) {
  const a = avatarOf(id);
  return html`<span
    class=${cx('avatar', `avatar--${size}`, alive && 'avatar--alive', offline && 'avatar--offline', cls)}
    style=${style}
    role="img"
    aria-label=${label ?? (a ? t(a.name) : t('Avatar'))}
  >
    ${crown && html`<img class="avatar__crown" src=${asset('assets/art/crown.svg')} alt="" />`}
    ${a && html`<img src=${asset(`assets/avatars/${a.id}.svg`)} alt="" width="400" height="400" decoding="async" />`}
    ${badge !== null && html`<span class="avatar__badge">${badge}</span>`}
  </span>`;
}
