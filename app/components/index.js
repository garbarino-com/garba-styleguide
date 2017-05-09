// List components in this array
// `modifiers` is a list of BEM classes that modify the base component

import {
  Button,
  ActionButtons,
  Icons,
  ImageContainer,
  Label,
  Tag,
  Tooltip,
  Value
} from 'garba-ui';

const components = [
  {
    component: Button,
    name: 'Buttons',
    description: require('./docs/buttons.md'),
    props: {
      text: 'Button'
    },
    modifiers: [
      'button--main',
      'button--primary',
      'button--secondary',
      'button--link',
      'button--lg',
      'button--sm',
      'button--block',
      'button__is-fixed-to-bottom',
      'button__is-disabled',
      'button__is-loading',
      'button--lg button__is-loading',
      'button--sm button__is-loading',
      'button--block button__is-loading',
      'button__has-icon',
      'button__has-icon button--block button--facebook',
    ]
  },
  {
    component: ActionButtons,
    name: 'Button Actions',
    description: require('./docs/button-actions.md'),
    props: {
      text: 'Placeholder text',
      className: 'icon-action',
      content: 'Texto que describe la acción que realiza el botón',
    },
    modifiers: [
      'button--action__primary has-tooltip__on-top',
      'button--action__fav has-tooltip__on-top',
      'button--action__default has-tooltip__on-top',
      'button--action__facebook has-tooltip__on-top',
      'button--action__twitter has-tooltip__on-top'
    ]
  },
  {
    component: Label,
    name: 'Labels',
    description: require('./docs/labels.md'),
    props: {
      text: 'Texto del label',
      link: '/url-de-categoria-opcional/'
    },
    modifiers: [
      'label--primary',
      'label--main'
    ]
  },
  {
    component: Tag,
    name: 'Tags',
    description: require('./docs/tags.md'),
    props: {
      text: 'Tag de muestra',
      link: '/url-de-categoria-opcional/'
    }
  },
  {
    component: Tooltip,
    name: 'Tooltips',
    description: require('./docs/tooltips.md'),
    props: {
      text: 'Este es un elemento con tooltip.',
      content: 'Esto es un tooltip de muestra.'
    }
  },
  {
    component: ImageContainer,
    name: 'Imagen de producto',
    description: require('./docs/image-container.md'),
    props: {
      link: 'link-opcional',
      imageUrl: 'http://lorempixel.com/1200/400/sports/',
      altText: 'Ejemplo de texto alternativo para imagen.'
    },
    modifiers: [
      'img-container__is-loading'
    ]
  },
  {
    component: Value,
    name: 'Precio',
    description: require('./docs/value.md'),
    props: {
      note: 'Precio en 1 pago.',
      price: '119.99',
      availability: 'http://schema.org/InStock http://schema.org/OutOfStock http://schema.org/PreOrder',
    },
    modifiers: [
      'value-container--lg',
      'value-container--sm'
    ]
  },
  {
    component: Icons,
    name: 'Íconos',
    description: require('./docs/icons.md'),
    modifiers: [
      'icon-close',
      'icon-bag',
      'icon-bank',
      'icon-calendar',
      'icon-card',
      'icon-cart',
      'icon-checkmark',
      'icon-checkmark-circle',
      'icon-clock',
      'icon-cross',
      'icon-cross-circle',
      'icon-dashboard',
      'icon-dialog',
      'icon-double-thin-arrow-botom',
      'icon-double-thin-arrow-left',
      'icon-double-thin-arrow-right',
      'icon-double-thin-arrow-top',
      'icon-download',
      'icon-email',
      'icon-exclamation-mark-circle',
      'icon-exclamation-mark-triangle',
      'icon-facebook',
      'icon-filled-arrow-bottom',
      'icon-filled-arrow-left',
      'icon-filled-arrow-right',
      'icon-filled-arrow-top',
      'icon-filter',
      'icon-fire',
      'icon-gallery-view',
      'icon-games',
      'icon-garbarino-viajes',
      'icon-gift',
      'icon-gplus',
      'icon-heart',
      'icon-home',
      'icon-info-circle',
      'icon-instagram',
      'icon-key',
      'icon-list-view',
      'icon-marker',
      'icon-menu-hamburguer',
      'icon-music',
      'icon-notifications',
      'icon-pencil',
      'icon-percent-star',
      'icon-phone',
      'icon-photos',
      'icon-plane',
      'icon-play',
      'icon-preferences',
      'icon-question-mark-circle',
      'icon-search',
      'icon-shipping',
      'icon-shop',
      'icon-simple-bold-arrow-bottom',
      'icon-simple-bold-arrow-left',
      'icon-simple-bold-arrow-right',
      'icon-simple-bold-arrow-top',
      'icon-simple-thin-arrow-bottom',
      'icon-simple-thin-arrow-left',
      'icon-simple-thin-arrow-right',
      'icon-simple-thin-arrow-top',
      'icon-sort',
      'icon-star',
      'icon-star-half-left',
      'icon-star-half-right',
      'icon-tag',
      'icon-trash',
      'icon-twitter',
      'icon-user',
      'icon-users',
      'icon-video',
      'icon-whatsapp',
      'icon-youtube',
      'icon-two-card',
      'icon-shipping-2',
      'icon-cash',
      'icon-bag2',
      'icon-trash2',
      'icon-arrow-left'
    ]
  }
];

export default components;
