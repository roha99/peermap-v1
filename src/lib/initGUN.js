import GUN from 'gun';
import 'gun/sea';

// init gun
const gun = GUN({
  peers : [
    'http://gun-manhattan.herokuapp.com/gun',
  ],
});

// declare and export user
export const user = gun.user();