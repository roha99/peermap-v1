import { writable } from 'svelte/store';

import GUN from 'gun';
import 'gun/sea';

// init gun
const gun = GUN({
  peers : [
    'http://gun-manhattan.herokuapp.com/gun',
  ],
});

const user = gun.user(); // declare user

export const username = writable('');

export function sign_up (u,p) {
  user.create(u, p, (ack) => {
    // console.log(ack);
    if (ack.err) {
      alert(ack.err);
    } else {
      sign_in(u,p);
    }
  });
}

export function sign_in (u,p) {
  user.auth(u, p, async (ack) => {
    // console.log(ack);
    if (ack.err) {
      alert(ack.err);
    } else {
      const alias = await user.get('alias'); // username string
      username.set(alias);
    }
  });
}

export function sign_out () {
  user.leave();
  username.set('');
}