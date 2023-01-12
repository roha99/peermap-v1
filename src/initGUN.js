import 'gun/gun';
import 'gun/sea';
import 'gun/lib/webrtc';

// fetch relay peers for bootstrapping
// const res = await fetch('https://raw.githubusercontent.com/wiki/amark/gun/volunteer.dht.md');
// const data = await res.text();
// const urls = data.match(/\bhttps?:\/\/\S+/gi);

const urls = [
	'https://gun-manhattan.herokuapp.com/gun',
	'https://relay.129.153.59.37.nip.io/gun',
	'https://relay.peer.ooo/gun',
	'https://peer.wallie.io/gun',
];

const options = {
  peers : urls,
}

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

// init and export gun
export const gun = GUN(options);

// declare and export user
export const user = gun.user().recall({sessionStorage:true});