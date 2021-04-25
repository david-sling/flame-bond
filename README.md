<h1 align="center">Flame Bond</h1>
<p align="center">
  <img src="./src/assets/logo.svg" alt="angular-logo" width="120px" height="120px"/>
<br>
<br>
  A Content management system that will auto generate API endpoints for your data.
  <br><br>
  <img src="./src/assets/reactplusfirebase.svg" alt="reactplusfirebase" width="70px"/>
</p>

---

### What does flame-bond do?

- Flame-bond can be used if you are building a frontend focussed website with minimal backend requirements.
- We take care of the generic CRUD code that you will have to copy-paste for each new project.
- You can select which routes to make public. For example, you can say: "Make only GET & GET ONE routes of /posts public." All the other routes will then remain accesible only through the panel.

### Application Examples

- If you are building a personal blog, create a posts route and make the GET & GET ONE routes public. You can use the panel to add posts, and the API will reflect your changes.
- If you need a contact form on your website, make the POST route public and make the collection "read-only". This way, you'll be able to read the messages sent from your contact form.

### How to use?

- Go to <https://flamebond.davidsling.in>.
- Login with your google account.
- Click on `+` on the left panel to create a new collection.
- Enter a name for your collection and click next.
- Add some fields and select a data type.
- Click on the name of your collection on the left panel and click NEW.
- Enter your data and save.
- Click on the name of your collection on the left panel and click EDIT.
- Allow public access for GET and click on the API endpoint provided below.
- Congrats, you just created a CRUD REST API for your frontend project.

##### See README of [flame-bond-node](https://github.com/david-sling/flame-bond-node#readme) for API documentation.

### Future updates

- **Private API routes** that will require an api-token in the request-header.
- Pre-defined users collection to be used for **authenticated access**.
- Many to many **relational data-type**.

---

### Tech stack

- React js
- Node js
- Firebase

---

This project is open sourced. Feel free to clone the repository to modify and host your own CMS.
