# Flame Bond

A Content management system that connects React with Firebase

`🔵 IN PROGRESS`

---

### How to install:

- Clone repository: `git clone https://github.com/david-sling/flame-bond.git`
- configure firebase credentials in `./config/firebase.js`
- `npm install`
- `npm start`

---

### Customization:

#### Logo

replace src/assets/logo.svg with your logo

#### Color

Change SCSS variables for

- $primary
- $blue
- $red
- $green

inside src/App.scss

#### Advanced Customization

Feel free to play around with the React components inside src/components & src/pages

---

### Actions:

```js
import{
  //SCHEMA
  getSchema,
  updateSchema,
  //COLLECTIONS
  getCollections,
  getCollection,
  createCollection,
  removeCollection,
  //ENTRY
  getEntry,
  createEntry,
  updateEntry,
  removeEntry,
} from './services/actions
```

---

### Usage:

###### SCHEMA

#### `getSchema()`

```js
const collectionId = "posts";
const [schema, setSchema] = useState(null);
getSchema(collectionId, setSchema);
// now `const schema` contains the schema of `post`
```

#### `updateSchema()`

```js
setSchema({ ...schema /*SOME CHANGES*/ });
updateSchema(collectionId, schema);
```

###### COLLECTIONS

#### `getCollections()`

```js
const [collections, setCollections] = useState([]);
getCollections(setCollections);
// now list of all collections is available in const `collections`
```

#### `createCollection()`

```jsx
const url = "posts";
const name = "Post";
const [redirect, setRedirect] = useState(null);

createCollection(url, name, setRedirect);

if (redirect) return <Redirect to={redirect} />;
// The user will be redirected to `/posts/edit` once the collection is created
```

#### `removeCollection()`

```js
removeCollection(collectionId);
```

###### ENTRY

### `getEntry()`

```js
const [entry, setEntry] = useState(null);
getEntry(collectionId, entryId, setEntry);
// now the entry data will be stored in const `entry`
```

### `createEntry()`

```js
const [id, setId] = useState(null);
getEntry(collectionId, entry, setId);
// now the id of the newy created entry will be stored in const `id`
```

### `updateEntry()`

```js
updateEntry(collection, id, updatedEntry);
// now the id of the newy created entry will be stored in const `id`
```

### `removeEntry()`

```jsx
const [deleted, setDeleted] = useState(false);
updateEntry(collection, id, setDeleted);
// const `deleted` will be set to true once the entry is deleted and can be used to redirect
if (deleted) return <Redirect to="/" />;
```
