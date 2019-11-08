const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, File, Color } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const { MEDIA_DIR, MEDIA_URL, PROJECT_NAME } = require('./config');
const SETUP = (process.env.SETUP === 'true');

const fileAdapter = new LocalFileAdapter({
  path: MEDIA_URL,
  src: '.' + MEDIA_DIR,
});

const keystone = new Keystone({
  name: PROJECT_NAME,
  secureCookies: false,
  adapter: new Adapter(),
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
  },
  access: {
    read: SETUP || access.userIsAdminOrOwner,
    update: SETUP || access.userIsAdminOrOwner,
    create: SETUP || access.userIsAdmin,
    delete: SETUP || access.userIsAdmin,
    auth: !SETUP,
  },
});

keystone.createList('Activity', {
  fields: {
    buttonLabel: { type: Text },
    pageTitle: { type: Text },
    mainColor: { type: Color },
    subColor: { type: Color },
    svgIcon: {
      type: File,
      adapter: fileAdapter,
    },
    description: {
      type: Wysiwyg,
      label: 'Description -- when inserting an image, set the source as ' + MEDIA_URL + '/[image-filename-found-in-the-Image-entry]',
    },
  },
  labelField: 'buttonLabel',
});

keystone.createList('Image', {
  fields: {
    name: { type: Text },
    file: {
      type: File,
      adapter: fileAdapter,
      isRequired: true,
    },
    caption: { type: Text },
  },
  labelField: 'name',
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy: !SETUP && authStrategy,
    }),
    new StaticApp({
      path: MEDIA_DIR,
      src: '.' + MEDIA_DIR,
    }),
  ],
};
