import GUN from 'gun';
import 'gun/sea';

// init and export gun
export const gun = GUN({
  peers : [
    'https://gun-manhattan.herokuapp.com/gun',
  ],
});

// declare and export user
export const user = gun.user();