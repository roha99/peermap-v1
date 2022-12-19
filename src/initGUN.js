import 'gun/gun';
import 'gun/sea';
import 'gun/lib/webrtc';
import 'gun/lib/open';
import 'gun/lib/load';

// https://svelte.dev/tutorial/auto-subscriptions
GUN.chain.subscribe = function (publish) {
	let gun = this;
	let at = gun._;
	// check if map() has been called
	let is_map = !!(at.back || {}).each;
	if (is_map) {
		
    // create a temporary store for all values passed by map()
		let cache = new Map();
		publish(Array.from(cache));
		
		gun = gun.on((data, key, event) => {
			
			// let _key = GUN.node.soul(data) || event.via.soul || key;
			let _key = key;
			
			if (data === null) { // remove this if clause if you want to return null values
				cache.delete(_key)
			} else {
				cache.set(_key, data)
			}
			
			publish(Array.from(cache))
		})
		
	} else {
		gun = gun.on(publish);
	}
	// unsubscribe
	return () => gun.off();
};

const options = {
  peers : [
    'https://gun-manhattan.herokuapp.com/gun',
  ],
}

// init and export gun
export const gun = GUN(options);

// declare and export user
export const user = gun.user().recall({sessionStorage:true});