import { put, post, get, del } from './request';

const URL = 'https://to-done-sr.firebaseio.com';
const NOTES_URL = `${URL}/notes`;

const getNoteUrl = key => `${NOTES_URL}/${key}.json`;

export const getNotes = () => {
  return get(`${NOTES_URL}.json`)
    .then(response => {
      return response
        ? Object.keys(response).map(key => {
          const each = response[key];
          each.key = key;
          return each; 
        }) 
        : [];
    });
};

export const addNote = note => {
  const url = `${NOTES_URL}.json`;
  return post(url, note)
    .then(response => {
      note.key = response.name;
      return note;
    });
};

export const updateNote = note => {
  const url = getNoteUrl(note.key);
  return put(url, note);
};

export const removeNote = id => {
  const url = getNoteUrl(id);
  return del(url);
};